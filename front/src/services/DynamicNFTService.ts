import { ApiPromise } from '@polkadot/api';
import { ipfsService } from './IPFSService';

export interface AttendanceBadge {
  eventId: string;
  eventName: string;
  checkInTime: number;
  badgeType: 'attendee' | 'vip' | 'speaker' | 'organizer';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface TicketHistory {
  action: 'minted' | 'transferred' | 'checked_in' | 'upgraded';
  timestamp: number;
  from?: string;
  to?: string;
  details?: string;
}

export interface DynamicMetadata {
  baseMetadata: any;
  badges: AttendanceBadge[];
  history: TicketHistory[];
  stats: {
    eventsAttended: number;
    totalCheckIns: number;
    firstEventDate: number;
    lastActivityDate: number;
  };
  collectibleTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  evolutionStage: number;
}

export class DynamicNFTService {
  private api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  /**
   * Update NFT metadata after check-in
   */
  async updateAfterCheckIn(
    tokenId: string,
    eventId: string,
    eventName: string
  ): Promise<DynamicMetadata> {
    try {
      // Get current metadata
      const currentMetadata = await this.getMetadata(tokenId);

      // Add attendance badge
      const badge: AttendanceBadge = {
        eventId,
        eventName,
        checkInTime: Date.now(),
        badgeType: 'attendee',
        rarity: this.calculateBadgeRarity(currentMetadata.badges.length),
      };

      currentMetadata.badges.push(badge);

      // Add history entry
      const historyEntry: TicketHistory = {
        action: 'checked_in',
        timestamp: Date.now(),
        details: `Checked in to ${eventName}`,
      };

      currentMetadata.history.push(historyEntry);

      // Update stats
      currentMetadata.stats.eventsAttended += 1;
      currentMetadata.stats.totalCheckIns += 1;
      currentMetadata.stats.lastActivityDate = Date.now();

      // Update collectible tier
      currentMetadata.collectibleTier = this.calculateTier(
        currentMetadata.stats.eventsAttended
      );

      // Update evolution stage
      currentMetadata.evolutionStage = this.calculateEvolution(
        currentMetadata.stats.totalCheckIns
      );

      // Upload updated metadata to IPFS
      const ipfsResult = await ipfsService.uploadJSON(currentMetadata);

      // Update on-chain metadata pointer (in production)
      // await this.updateOnChainMetadata(tokenId, ipfsResult.cid);

      return currentMetadata;
    } catch (error) {
      console.error('Error updating metadata:', error);
      throw error;
    }
  }

  /**
   * Add badge to ticket
   */
  async addBadge(
    tokenId: string,
    badge: AttendanceBadge
  ): Promise<DynamicMetadata> {
    try {
      const metadata = await this.getMetadata(tokenId);
      metadata.badges.push(badge);

      // Update stats
      metadata.stats.lastActivityDate = Date.now();

      const ipfsResult = await ipfsService.uploadJSON(metadata);
      return metadata;
    } catch (error) {
      console.error('Error adding badge:', error);
      throw error;
    }
  }

  /**
   * Record ticket transfer
   */
  async recordTransfer(
    tokenId: string,
    from: string,
    to: string
  ): Promise<DynamicMetadata> {
    try {
      const metadata = await this.getMetadata(tokenId);

      const historyEntry: TicketHistory = {
        action: 'transferred',
        timestamp: Date.now(),
        from,
        to,
        details: `Transferred from ${from.slice(0, 8)}... to ${to.slice(0, 8)}...`,
      };

      metadata.history.push(historyEntry);
      metadata.stats.lastActivityDate = Date.now();

      const ipfsResult = await ipfsService.uploadJSON(metadata);
      return metadata;
    } catch (error) {
      console.error('Error recording transfer:', error);
      throw error;
    }
  }

  /**
   * Upgrade ticket tier
   */
  async upgradeTicket(
    tokenId: string,
    newTier: 'bronze' | 'silver' | 'gold' | 'platinum'
  ): Promise<DynamicMetadata> {
    try {
      const metadata = await this.getMetadata(tokenId);

      metadata.collectibleTier = newTier;

      const historyEntry: TicketHistory = {
        action: 'upgraded',
        timestamp: Date.now(),
        details: `Upgraded to ${newTier} tier`,
      };

      metadata.history.push(historyEntry);
      metadata.stats.lastActivityDate = Date.now();

      const ipfsResult = await ipfsService.uploadJSON(metadata);
      return metadata;
    } catch (error) {
      console.error('Error upgrading ticket:', error);
      throw error;
    }
  }

  /**
   * Get current metadata
   */
  async getMetadata(tokenId: string): Promise<DynamicMetadata> {
    try {
      // In production, fetch from IPFS using on-chain CID
      // For now, use localStorage
      const stored = localStorage.getItem(`metadata_${tokenId}`);
      
      if (stored) {
        return JSON.parse(stored);
      }

      // Return default metadata
      return this.createDefaultMetadata();
    } catch (error) {
      console.error('Error getting metadata:', error);
      return this.createDefaultMetadata();
    }
  }

  /**
   * Calculate badge rarity based on collection size
   */
  private calculateBadgeRarity(badgeCount: number): AttendanceBadge['rarity'] {
    if (badgeCount >= 20) return 'legendary';
    if (badgeCount >= 10) return 'epic';
    if (badgeCount >= 5) return 'rare';
    return 'common';
  }

  /**
   * Calculate collectible tier based on events attended
   */
  private calculateTier(eventsAttended: number): DynamicMetadata['collectibleTier'] {
    if (eventsAttended >= 20) return 'platinum';
    if (eventsAttended >= 10) return 'gold';
    if (eventsAttended >= 5) return 'silver';
    return 'bronze';
  }

  /**
   * Calculate evolution stage based on total check-ins
   */
  private calculateEvolution(totalCheckIns: number): number {
    return Math.min(Math.floor(totalCheckIns / 5), 10);
  }

  /**
   * Create default metadata for new tickets
   */
  private createDefaultMetadata(): DynamicMetadata {
    return {
      baseMetadata: {},
      badges: [],
      history: [
        {
          action: 'minted',
          timestamp: Date.now(),
          details: 'Ticket minted',
        },
      ],
      stats: {
        eventsAttended: 0,
        totalCheckIns: 0,
        firstEventDate: Date.now(),
        lastActivityDate: Date.now(),
      },
      collectibleTier: 'bronze',
      evolutionStage: 0,
    };
  }

  /**
   * Get collectible value based on tier and evolution
   */
  getCollectibleValue(metadata: DynamicMetadata): number {
    const tierValues = {
      bronze: 1,
      silver: 2,
      gold: 5,
      platinum: 10,
    };

    const baseValue = tierValues[metadata.collectibleTier];
    const evolutionBonus = metadata.evolutionStage * 0.5;
    const badgeBonus = metadata.badges.length * 0.2;

    return baseValue + evolutionBonus + badgeBonus;
  }

  /**
   * Check if ticket can evolve
   */
  canEvolve(metadata: DynamicMetadata): boolean {
    const nextStage = metadata.evolutionStage + 1;
    const requiredCheckIns = nextStage * 5;
    return metadata.stats.totalCheckIns >= requiredCheckIns;
  }
}
