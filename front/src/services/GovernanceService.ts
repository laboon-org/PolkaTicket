import { ApiPromise } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  createdAt: number;
  votingEndsAt: number;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  category: 'feature' | 'policy' | 'treasury' | 'upgrade';
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  threshold: number;
  executed: boolean;
}

export interface Vote {
  proposalId: string;
  voter: string;
  choice: 'yes' | 'no' | 'abstain';
  weight: number;
  timestamp: number;
}

export class GovernanceService {
  private api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  /**
   * Create a new governance proposal
   */
  async createProposal(
    account: InjectedAccountWithMeta,
    title: string,
    description: string,
    category: Proposal['category'],
    votingDuration: number = 7 * 24 * 60 * 60 * 1000 // 7 days
  ): Promise<Proposal> {
    try {
      const proposal: Proposal = {
        id: `PROP-${Date.now()}`,
        title,
        description,
        proposer: account.address,
        createdAt: Date.now(),
        votingEndsAt: Date.now() + votingDuration,
        status: 'active',
        category,
        votes: {
          yes: 0,
          no: 0,
          abstain: 0,
        },
        threshold: 50, // 50% threshold
        executed: false,
      };

      // In production, submit to on-chain governance pallet
      // For now, store locally
      this.saveProposal(proposal);

      return proposal;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  }

  /**
   * Vote on a proposal
   */
  async vote(
    account: InjectedAccountWithMeta,
    proposalId: string,
    choice: Vote['choice']
  ): Promise<Vote> {
    try {
      // Check if already voted
      const hasVoted = await this.hasVoted(proposalId, account.address);
      if (hasVoted) {
        throw new Error('Already voted on this proposal');
      }

      // Calculate voting weight (could be based on tokens held, tickets owned, etc.)
      const weight = await this.calculateVotingWeight(account.address);

      const vote: Vote = {
        proposalId,
        voter: account.address,
        choice,
        weight,
        timestamp: Date.now(),
      };

      // Update proposal vote counts
      await this.updateProposalVotes(proposalId, choice, weight);

      // Save vote
      this.saveVote(vote);

      return vote;
    } catch (error) {
      console.error('Error voting:', error);
      throw error;
    }
  }

  /**
   * Get all active proposals
   */
  async getActiveProposals(): Promise<Proposal[]> {
    try {
      const allProposals = this.getAllProposals();
      const now = Date.now();

      return allProposals.filter(
        (p) => p.status === 'active' && p.votingEndsAt > now
      );
    } catch (error) {
      console.error('Error getting proposals:', error);
      return [];
    }
  }

  /**
   * Get proposal by ID
   */
  async getProposal(proposalId: string): Promise<Proposal | null> {
    try {
      const proposals = this.getAllProposals();
      return proposals.find((p) => p.id === proposalId) || null;
    } catch (error) {
      console.error('Error getting proposal:', error);
      return null;
    }
  }

  /**
   * Execute passed proposal
   */
  async executeProposal(
    account: InjectedAccountWithMeta,
    proposalId: string
  ): Promise<boolean> {
    try {
      const proposal = await this.getProposal(proposalId);
      
      if (!proposal) {
        throw new Error('Proposal not found');
      }

      if (proposal.executed) {
        throw new Error('Proposal already executed');
      }

      if (proposal.status !== 'passed') {
        throw new Error('Proposal has not passed');
      }

      // Execute proposal logic based on category
      // In production, this would trigger on-chain actions

      proposal.executed = true;
      this.updateProposal(proposal);

      return true;
    } catch (error) {
      console.error('Error executing proposal:', error);
      throw error;
    }
  }

  /**
   * Finalize voting and determine outcome
   */
  async finalizeVoting(proposalId: string): Promise<Proposal> {
    try {
      const proposal = await this.getProposal(proposalId);
      
      if (!proposal) {
        throw new Error('Proposal not found');
      }

      if (proposal.status !== 'active') {
        throw new Error('Proposal is not active');
      }

      const now = Date.now();
      if (proposal.votingEndsAt > now) {
        throw new Error('Voting period has not ended');
      }

      // Calculate result
      const totalVotes = proposal.votes.yes + proposal.votes.no;
      const yesPercentage = totalVotes > 0 ? (proposal.votes.yes / totalVotes) * 100 : 0;

      proposal.status = yesPercentage >= proposal.threshold ? 'passed' : 'rejected';
      
      this.updateProposal(proposal);

      return proposal;
    } catch (error) {
      console.error('Error finalizing voting:', error);
      throw error;
    }
  }

  /**
   * Calculate voting weight for an address
   */
  private async calculateVotingWeight(address: string): Promise<number> {
    try {
      // In production, calculate based on:
      // - Number of tickets owned
      // - Governance tokens held
      // - Reputation score
      // For now, return 1
      return 1;
    } catch (error) {
      return 1;
    }
  }

  /**
   * Check if address has voted on proposal
   */
  private async hasVoted(proposalId: string, address: string): Promise<boolean> {
    try {
      const votes = this.getVotes(proposalId);
      return votes.some((v) => v.voter === address);
    } catch (error) {
      return false;
    }
  }

  /**
   * Update proposal vote counts
   */
  private async updateProposalVotes(
    proposalId: string,
    choice: Vote['choice'],
    weight: number
  ): Promise<void> {
    try {
      const proposal = await this.getProposal(proposalId);
      if (!proposal) return;

      if (choice === 'yes') {
        proposal.votes.yes += weight;
      } else if (choice === 'no') {
        proposal.votes.no += weight;
      } else {
        proposal.votes.abstain += weight;
      }

      this.updateProposal(proposal);
    } catch (error) {
      console.error('Error updating votes:', error);
    }
  }

  /**
   * Get all proposals from storage
   */
  private getAllProposals(): Proposal[] {
    try {
      const stored = localStorage.getItem('governance_proposals');
      return stored ? JSON.parse(stored) : this.getMockProposals();
    } catch (error) {
      return this.getMockProposals();
    }
  }

  /**
   * Save proposal to storage
   */
  private saveProposal(proposal: Proposal): void {
    try {
      const proposals = this.getAllProposals();
      proposals.push(proposal);
      localStorage.setItem('governance_proposals', JSON.stringify(proposals));
    } catch (error) {
      console.error('Error saving proposal:', error);
    }
  }

  /**
   * Update existing proposal
   */
  private updateProposal(proposal: Proposal): void {
    try {
      const proposals = this.getAllProposals();
      const index = proposals.findIndex((p) => p.id === proposal.id);
      if (index !== -1) {
        proposals[index] = proposal;
        localStorage.setItem('governance_proposals', JSON.stringify(proposals));
      }
    } catch (error) {
      console.error('Error updating proposal:', error);
    }
  }

  /**
   * Get votes for a proposal
   */
  private getVotes(proposalId: string): Vote[] {
    try {
      const stored = localStorage.getItem(`votes_${proposalId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Save vote
   */
  private saveVote(vote: Vote): void {
    try {
      const votes = this.getVotes(vote.proposalId);
      votes.push(vote);
      localStorage.setItem(`votes_${vote.proposalId}`, JSON.stringify(votes));
    } catch (error) {
      console.error('Error saving vote:', error);
    }
  }

  /**
   * Get mock proposals for demo
   */
  private getMockProposals(): Proposal[] {
    return [
      {
        id: 'PROP-001',
        title: 'Reduce Platform Fees to 2%',
        description: 'Proposal to reduce platform fees from 5% to 2% to attract more event organizers.',
        proposer: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        votingEndsAt: Date.now() + 5 * 24 * 60 * 60 * 1000,
        status: 'active',
        category: 'policy',
        votes: {
          yes: 127,
          no: 43,
          abstain: 12,
        },
        threshold: 50,
        executed: false,
      },
      {
        id: 'PROP-002',
        title: 'Add Multi-Language Support',
        description: 'Implement support for Spanish, French, and German languages.',
        proposer: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        votingEndsAt: Date.now() + 6 * 24 * 60 * 60 * 1000,
        status: 'active',
        category: 'feature',
        votes: {
          yes: 89,
          no: 21,
          abstain: 8,
        },
        threshold: 50,
        executed: false,
      },
    ];
  }
}
