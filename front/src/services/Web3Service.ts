import { ethers } from 'ethers';
import { MOONBASE_CONFIG, TICKET_NFT_ABI } from '../config/contracts';

export interface TicketData {
  tokenId: string;
  eventId: number;
  eventType: number;
  owner: string;
  pathData: string;
  isUsed: boolean;
}

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;

  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';
  }

  /**
   * Connect to MetaMask
   */
  async connect(): Promise<string> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const ethereum = (window as any).ethereum;
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      // Create provider and signer
      this.provider = new ethers.BrowserProvider(ethereum);
      this.signer = await this.provider.getSigner();

      // Check network
      const network = await this.provider.getNetwork();
      if (Number(network.chainId) !== MOONBASE_CONFIG.chainId) {
        await this.switchToMoonbase();
      }

      // Initialize contract
      this.contract = new ethers.Contract(
        MOONBASE_CONFIG.contracts.ticketNFT,
        TICKET_NFT_ABI,
        this.signer
      );

      return accounts[0];
    } catch (error: any) {
      console.error('Failed to connect:', error);
      throw new Error(error.message || 'Failed to connect to MetaMask');
    }
  }

  /**
   * Switch to Moonbase Alpha network
   */
  async switchToMoonbase(): Promise<void> {
    try {
      const ethereum = (window as any).ethereum;
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${MOONBASE_CONFIG.chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await this.addMoonbaseNetwork();
        } catch (addError) {
          throw new Error('Failed to add Moonbase Alpha network');
        }
      } else {
        throw switchError;
      }
    }
  }

  /**
   * Add Moonbase Alpha network to MetaMask
   */
  async addMoonbaseNetwork(): Promise<void> {
    const ethereum = (window as any).ethereum;
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${MOONBASE_CONFIG.chainId.toString(16)}`,
          chainName: 'Moonbase Alpha',
          nativeCurrency: {
            name: 'DEV',
            symbol: 'DEV',
            decimals: 18,
          },
          rpcUrls: [MOONBASE_CONFIG.rpcUrl],
          blockExplorerUrls: [MOONBASE_CONFIG.explorerUrl],
        },
      ],
    });
  }

  /**
   * Get current account
   */
  async getCurrentAccount(): Promise<string | null> {
    if (!this.provider) {
      return null;
    }
    const signer = await this.provider.getSigner();
    return await signer.getAddress();
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  /**
   * Mint a new ticket
   */
  async mintTicket(
    eventId: number,
    eventType: number,
    pathData: string
  ): Promise<{ hash: string; tokenId?: string }> {
    if (!this.contract || !this.signer) {
      throw new Error('Contract not initialized. Please connect first.');
    }

    try {
      const address = await this.signer.getAddress();
      
      // Call mint function
      const tx = await this.contract.mint(address, eventId, eventType, pathData);
      
      console.log('Transaction sent:', tx.hash);
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      console.log('Transaction confirmed:', receipt);
      
      // Try to get token ID from events (if available)
      let tokenId: string | undefined;
      if (receipt.logs && receipt.logs.length > 0) {
        // Parse Transfer event to get token ID
        try {
          const transferEvent = receipt.logs.find((log: any) => 
            log.topics[0] === ethers.id('Transfer(address,address,uint256)')
          );
          if (transferEvent) {
            tokenId = ethers.toBigInt(transferEvent.topics[3]).toString();
          }
        } catch (e) {
          console.warn('Could not parse token ID from events');
        }
      }

      return {
        hash: tx.hash,
        tokenId,
      };
    } catch (error: any) {
      console.error('Minting failed:', error);
      throw new Error(error.message || 'Failed to mint ticket');
    }
  }

  /**
   * Get ticket balance for an address
   */
  async getTicketBalance(address: string): Promise<number> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const balance = await this.contract.balanceOf(address);
      return Number(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }

  /**
   * Get ticket details
   */
  async getTicket(tokenId: string): Promise<TicketData | null> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const ticket = await this.contract.getTicket(tokenId);
      return {
        tokenId: ticket[0].toString(),
        eventId: Number(ticket[1]),
        eventType: Number(ticket[2]),
        owner: ticket[3],
        pathData: ticket[4],
        isUsed: ticket[5],
      };
    } catch (error) {
      console.error('Failed to get ticket:', error);
      return null;
    }
  }

  /**
   * Get owner of a token
   */
  async getOwner(tokenId: string): Promise<string | null> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.contract.ownerOf(tokenId);
    } catch (error) {
      console.error('Failed to get owner:', error);
      return null;
    }
  }

  /**
   * Disconnect
   */
  disconnect(): void {
    this.provider = null;
    this.signer = null;
    this.contract = null;
  }
}

// Singleton instance
let web3ServiceInstance: Web3Service | null = null;

export function getWeb3Service(): Web3Service {
  if (!web3ServiceInstance) {
    web3ServiceInstance = new Web3Service();
  }
  return web3ServiceInstance;
}

export default Web3Service;
