import { ApiPromise } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface XCMTransferParams {
  tokenId: string;
  fromChain: 'astar' | 'moonbeam';
  toChain: 'astar' | 'moonbeam';
  destinationAddress: string;
}

export class XCMService {
  private astarApi: ApiPromise;
  private moonbeamApi: ApiPromise | null = null;

  constructor(astarApi: ApiPromise) {
    this.astarApi = astarApi;
  }

  /**
   * Initialize Moonbeam API connection
   */
  async initMoonbeam(): Promise<void> {
    if (this.moonbeamApi) return;

    try {
      const { ApiPromise, WsProvider } = await import('@polkadot/api');
      const wsProvider = new WsProvider('wss://wss.api.moonbase.moonbeam.network');
      this.moonbeamApi = await ApiPromise.create({ provider: wsProvider });
    } catch (error) {
      console.error('Failed to connect to Moonbeam:', error);
      throw new Error('Moonbeam connection failed');
    }
  }

  /**
   * Transfer NFT ticket cross-chain using XCM
   */
  async transferCrossChain(
    account: InjectedAccountWithMeta,
    params: XCMTransferParams
  ): Promise<string> {
    try {
      const { fromChain, toChain, destinationAddress, tokenId } = params;

      // Ensure Moonbeam is initialized if needed
      if (fromChain === 'moonbeam' || toChain === 'moonbeam') {
        await this.initMoonbeam();
      }

      const sourceApi = fromChain === 'astar' ? this.astarApi : this.moonbeamApi!;
      const injector = await web3FromAddress(account.address);

      // Build XCM message
      const dest = this.buildDestination(toChain);
      const beneficiary = this.buildBeneficiary(destinationAddress);
      const assets = this.buildAssets(tokenId);

      // Execute XCM transfer
      const tx = sourceApi.tx.polkadotXcm.limitedReserveTransferAssets(
        dest,
        beneficiary,
        assets,
        0, // fee asset index
        'Unlimited' // weight limit
      );

      return new Promise((resolve, reject) => {
        tx.signAndSend(account.address, { signer: injector.signer }, ({ status, events }) => {
          if (status.isInBlock) {
            console.log(`XCM transfer in block: ${status.asInBlock}`);
          }

          if (status.isFinalized) {
            console.log(`XCM transfer finalized: ${status.asFinalized}`);
            resolve(status.asFinalized.toString());
          }

          events.forEach(({ event }) => {
            if (sourceApi.events.system.ExtrinsicFailed.is(event)) {
              reject(new Error('XCM transfer failed'));
            }
          });
        }).catch(reject);
      });
    } catch (error) {
      console.error('XCM transfer error:', error);
      throw error;
    }
  }

  /**
   * Build XCM destination
   */
  private buildDestination(chain: 'astar' | 'moonbeam'): any {
    const parachainId = chain === 'astar' ? 2006 : 1000; // Shibuya: 2006, Moonbase: 1000
    
    return {
      V3: {
        parents: 1,
        interior: {
          X1: {
            Parachain: parachainId
          }
        }
      }
    };
  }

  /**
   * Build XCM beneficiary
   */
  private buildBeneficiary(address: string): any {
    return {
      V3: {
        parents: 0,
        interior: {
          X1: {
            AccountId32: {
              network: null,
              id: address
            }
          }
        }
      }
    };
  }

  /**
   * Build XCM assets (for NFT transfer)
   */
  private buildAssets(tokenId: string): any {
    // This is a simplified version
    // In production, you'd need to properly encode the NFT asset
    return {
      V3: [
        {
          id: {
            Concrete: {
              parents: 0,
              interior: {
                X2: [
                  { PalletInstance: 50 }, // NFT pallet
                  { GeneralIndex: parseInt(tokenId.replace(/\D/g, '')) }
                ]
              }
            }
          },
          fun: {
            NonFungible: {
              Index: parseInt(tokenId.replace(/\D/g, ''))
            }
          }
        }
      ]
    };
  }

  /**
   * Get chain info
   */
  async getChainInfo(chain: 'astar' | 'moonbeam'): Promise<any> {
    const api = chain === 'astar' ? this.astarApi : this.moonbeamApi;
    
    if (!api) {
      throw new Error(`${chain} API not initialized`);
    }

    const [chainName, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);

    return {
      chain: chainName.toString(),
      nodeName: nodeName.toString(),
      nodeVersion: nodeVersion.toString()
    };
  }

  /**
   * Check if XCM channel is open
   */
  async isChannelOpen(fromChain: 'astar' | 'moonbeam', toChain: 'astar' | 'moonbeam'): Promise<boolean> {
    try {
      const sourceApi = fromChain === 'astar' ? this.astarApi : this.moonbeamApi;
      if (!sourceApi) return false;

      // Check if XCM pallet exists
      const hasXcm = sourceApi.tx.polkadotXcm !== undefined;
      return hasXcm;
    } catch (error) {
      console.error('Channel check error:', error);
      return false;
    }
  }

  /**
   * Disconnect Moonbeam API
   */
  async disconnect(): Promise<void> {
    if (this.moonbeamApi) {
      await this.moonbeamApi.disconnect();
      this.moonbeamApi = null;
    }
  }
}
