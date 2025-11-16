import { ApiPromise } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

// PSP34 NFT Contract on Astar Shibuya
// This is a placeholder - will be replaced with actual deployed contract
const NFT_CONTRACT_ADDRESS = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

export interface TicketMetadata {
  eventId: string;
  eventName: string;
  eventDate: string;
  ticketType: string;
  seatNumber?: string;
  price: string;
  image: string;
}

export interface NFTTicket {
  tokenId: string;
  owner: string;
  metadata: TicketMetadata;
  mintedAt: number;
}

export class AstarNFTService {
  private api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  /**
   * Mint a new ticket NFT
   */
  async mintTicket(
    account: InjectedAccountWithMeta,
    metadata: TicketMetadata
  ): Promise<string> {
    try {
      const injector = await web3FromAddress(account.address);

      // In a real implementation, this would call the PSP34 contract's mint function
      // For now, we'll create a mock transaction
      const transfer = this.api.tx.balances.transfer(
        NFT_CONTRACT_ADDRESS,
        1000000000000 // 1 token (placeholder)
      );

      return new Promise((resolve, reject) => {
        transfer
          .signAndSend(account.address, { signer: injector.signer }, ({ status, events }) => {
            if (status.isInBlock) {
              console.log(`Transaction included in block hash: ${status.asInBlock}`);
            }

            if (status.isFinalized) {
              console.log(`Transaction finalized in block hash: ${status.asFinalized}`);
              
              // Generate mock token ID
              const tokenId = `TICKET-${Date.now()}`;
              resolve(tokenId);
            }

            // Check for errors
            events.forEach(({ event }) => {
              if (this.api.events.system.ExtrinsicFailed.is(event)) {
                reject(new Error('Transaction failed'));
              }
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.error('Error minting ticket:', error);
      throw error;
    }
  }

  /**
   * Get all tickets owned by an address
   */
  async getOwnedTickets(ownerAddress: string): Promise<NFTTicket[]> {
    try {
      // In a real implementation, this would query the PSP34 contract
      // For now, return mock data from localStorage
      const mockTickets = this.getMockTickets(ownerAddress);
      return mockTickets;
    } catch (error) {
      console.error('Error fetching owned tickets:', error);
      throw error;
    }
  }

  /**
   * Get ticket details by token ID
   */
  async getTicketById(tokenId: string): Promise<NFTTicket | null> {
    try {
      // Mock implementation
      const allTickets = this.getMockTickets('');
      return allTickets.find(ticket => ticket.tokenId === tokenId) || null;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }
  }

  /**
   * Transfer ticket to another address
   */
  async transferTicket(
    account: InjectedAccountWithMeta,
    tokenId: string,
    toAddress: string
  ): Promise<void> {
    try {
      const injector = await web3FromAddress(account.address);

      // Mock transfer transaction
      const transfer = this.api.tx.balances.transfer(
        toAddress,
        1 // Placeholder
      );

      return new Promise((resolve, reject) => {
        transfer
          .signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
            if (status.isFinalized) {
              console.log(`Ticket ${tokenId} transferred to ${toAddress}`);
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.error('Error transferring ticket:', error);
      throw error;
    }
  }

  /**
   * Verify ticket ownership
   */
  async verifyTicketOwnership(tokenId: string, ownerAddress: string): Promise<boolean> {
    try {
      const ticket = await this.getTicketById(tokenId);
      return ticket?.owner === ownerAddress;
    } catch (error) {
      console.error('Error verifying ticket:', error);
      return false;
    }
  }

  /**
   * Mock data helper (temporary - will be replaced with real contract calls)
   */
  private getMockTickets(ownerAddress: string): NFTTicket[] {
    const mockData = [
      {
        tokenId: 'TICKET-1',
        owner: ownerAddress,
        metadata: {
          eventId: 'EVT-001',
          eventName: 'Polkadot Summit 2025',
          eventDate: '2025-12-15',
          ticketType: 'VIP',
          seatNumber: 'A-12',
          price: '100 DOT',
          image: 'https://via.placeholder.com/400x200',
        },
        mintedAt: Date.now() - 86400000,
      },
      {
        tokenId: 'TICKET-2',
        owner: ownerAddress,
        metadata: {
          eventId: 'EVT-002',
          eventName: 'Web3 Conference',
          eventDate: '2025-11-20',
          ticketType: 'General',
          seatNumber: 'B-45',
          price: '50 DOT',
          image: 'https://via.placeholder.com/400x200',
        },
        mintedAt: Date.now() - 172800000,
      },
    ];

    return mockData;
  }

  /**
   * Save ticket to local storage (temporary mock)
   */
  saveTicketLocally(ticket: NFTTicket): void {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }

  /**
   * Get tickets from local storage (temporary mock)
   */
  getLocalTickets(): NFTTicket[] {
    return JSON.parse(localStorage.getItem('tickets') || '[]');
  }
}
