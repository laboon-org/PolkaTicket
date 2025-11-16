import { ApiPromise } from '@polkadot/api';
import { stringToU8a, u8aToHex } from '@polkadot/util';
import { blake2AsHex } from '@polkadot/util-crypto';

export interface PrivacyProof {
  commitment: string;
  nullifier: string;
  proof: string;
}

export interface VerificationResult {
  isValid: boolean;
  ticketId?: string;
  timestamp: number;
}

export class PrivacyService {
  private api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  /**
   * Generate privacy-preserving proof of ticket ownership
   * Uses commitment scheme to hide ticket details
   */
  async generateOwnershipProof(
    ticketId: string,
    ownerAddress: string,
    secret: string
  ): Promise<PrivacyProof> {
    try {
      // Create commitment: hash(ticketId + ownerAddress + secret)
      const commitmentInput = `${ticketId}${ownerAddress}${secret}`;
      const commitment = blake2AsHex(stringToU8a(commitmentInput));

      // Create nullifier: hash(ticketId + secret)
      const nullifierInput = `${ticketId}${secret}`;
      const nullifier = blake2AsHex(stringToU8a(nullifierInput));

      // Generate zero-knowledge proof (simplified)
      // In production, use zk-SNARKs library like snarkjs
      const proofInput = `${commitment}${nullifier}${Date.now()}`;
      const proof = blake2AsHex(stringToU8a(proofInput));

      return {
        commitment,
        nullifier,
        proof,
      };
    } catch (error) {
      console.error('Error generating privacy proof:', error);
      throw new Error('Failed to generate ownership proof');
    }
  }

  /**
   * Verify privacy-preserving proof without revealing identity
   */
  async verifyOwnershipProof(
    proof: PrivacyProof,
    ticketId: string
  ): Promise<VerificationResult> {
    try {
      // In production, verify zk-SNARK proof
      // For now, simplified verification

      // Check if nullifier has been used (prevent double-spending)
      const isNullifierUsed = await this.checkNullifier(proof.nullifier);
      
      if (isNullifierUsed) {
        return {
          isValid: false,
          timestamp: Date.now(),
        };
      }

      // Verify proof validity (simplified)
      const isProofValid = proof.proof.length === 66; // Valid hash length

      if (isProofValid) {
        // Mark nullifier as used
        await this.markNullifierUsed(proof.nullifier);
      }

      return {
        isValid: isProofValid,
        ticketId: isProofValid ? ticketId : undefined,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error verifying proof:', error);
      return {
        isValid: false,
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Generate anonymous check-in proof
   */
  async generateCheckInProof(
    ticketId: string,
    eventId: string,
    secret: string
  ): Promise<PrivacyProof> {
    try {
      // Create commitment for check-in
      const commitmentInput = `checkin:${ticketId}:${eventId}:${secret}`;
      const commitment = blake2AsHex(stringToU8a(commitmentInput));

      // Create unique nullifier for this check-in
      const nullifierInput = `checkin:${ticketId}:${eventId}:${secret}`;
      const nullifier = blake2AsHex(stringToU8a(nullifierInput));

      // Generate proof
      const proofInput = `${commitment}${nullifier}${Date.now()}`;
      const proof = blake2AsHex(stringToU8a(proofInput));

      return {
        commitment,
        nullifier,
        proof,
      };
    } catch (error) {
      console.error('Error generating check-in proof:', error);
      throw new Error('Failed to generate check-in proof');
    }
  }

  /**
   * Verify anonymous check-in
   */
  async verifyCheckIn(
    proof: PrivacyProof,
    eventId: string
  ): Promise<VerificationResult> {
    try {
      // Check if already checked in (nullifier used)
      const isAlreadyCheckedIn = await this.checkNullifier(proof.nullifier);
      
      if (isAlreadyCheckedIn) {
        return {
          isValid: false,
          timestamp: Date.now(),
        };
      }

      // Verify proof
      const isProofValid = proof.proof.length === 66;

      if (isProofValid) {
        await this.markNullifierUsed(proof.nullifier);
      }

      return {
        isValid: isProofValid,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error verifying check-in:', error);
      return {
        isValid: false,
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Check if nullifier has been used (prevent replay attacks)
   */
  private async checkNullifier(nullifier: string): Promise<boolean> {
    try {
      // In production, check on-chain storage
      // For now, use localStorage
      const usedNullifiers = this.getUsedNullifiers();
      return usedNullifiers.includes(nullifier);
    } catch (error) {
      console.error('Error checking nullifier:', error);
      return false;
    }
  }

  /**
   * Mark nullifier as used
   */
  private async markNullifierUsed(nullifier: string): Promise<void> {
    try {
      const usedNullifiers = this.getUsedNullifiers();
      usedNullifiers.push(nullifier);
      localStorage.setItem('usedNullifiers', JSON.stringify(usedNullifiers));
    } catch (error) {
      console.error('Error marking nullifier:', error);
    }
  }

  /**
   * Get list of used nullifiers from storage
   */
  private getUsedNullifiers(): string[] {
    try {
      const stored = localStorage.getItem('usedNullifiers');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Generate secret for privacy proofs
   */
  generateSecret(): string {
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    return u8aToHex(randomBytes);
  }

  /**
   * Hash sensitive data
   */
  hashData(data: string): string {
    return blake2AsHex(stringToU8a(data));
  }
}
