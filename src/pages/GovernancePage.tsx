import React, { useState, useEffect } from 'react';
import { usePolkadot } from '../hooks/usePolkadot';
import { GovernanceService, Proposal } from '../services/GovernanceService';

export const GovernancePage: React.FC = () => {
  const { api, selectedAccount, isConnected } = usePolkadot();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'feature' as Proposal['category'],
  });

  useEffect(() => {
    if (api && isConnected) {
      loadProposals();
    }
  }, [api, isConnected]);

  const loadProposals = async () => {
    if (!api) return;
    
    setIsLoading(true);
    const governanceService = new GovernanceService(api);
    const activeProposals = await governanceService.getActiveProposals();
    setProposals(activeProposals);
    setIsLoading(false);
  };

  const handleVote = async (proposalId: string, choice: 'yes' | 'no' | 'abstain') => {
    if (!api || !selectedAccount) return;

    try {
      const governanceService = new GovernanceService(api);
      await governanceService.vote(selectedAccount, proposalId, choice);
      alert(`Vote cast: ${choice}`);
      loadProposals();
    } catch (error: any) {
      alert(error.message || 'Failed to vote');
    }
  };

  const handleCreateProposal = async () => {
    if (!api || !selectedAccount) return;

    try {
      const governanceService = new GovernanceService(api);
      await governanceService.createProposal(
        selectedAccount,
        newProposal.title,
        newProposal.description,
        newProposal.category
      );
      
      setShowCreateForm(false);
      setNewProposal({ title: '', description: '', category: 'feature' });
      loadProposals();
      alert('Proposal created successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to create proposal');
    }
  };

  const getVotePercentage = (proposal: Proposal) => {
    const total = proposal.votes.yes + proposal.votes.no;
    if (total === 0) return 0;
    return Math.round((proposal.votes.yes / total) * 100);
  };

  const getRemainingTime = (endsAt: number) => {
    const remaining = endsAt - Date.now();
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Wallet Not Connected</h2>
          <p className="text-yellow-700">Please connect your wallet to participate in governance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Governance</h1>
          <p className="text-gray-600">Vote on proposals and shape the platform's future</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {showCreateForm ? 'Cancel' : 'Create Proposal'}
        </button>
      </div>

      {/* Create Proposal Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Create New Proposal</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newProposal.title}
                onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Proposal title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newProposal.description}
                onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                rows={4}
                placeholder="Detailed description of the proposal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newProposal.category}
                onChange={(e) => setNewProposal({ ...newProposal, category: e.target.value as Proposal['category'] })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="feature">Feature</option>
                <option value="policy">Policy</option>
                <option value="treasury">Treasury</option>
                <option value="upgrade">Upgrade</option>
              </select>
            </div>
            <button
              onClick={handleCreateProposal}
              disabled={!newProposal.title || !newProposal.description}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
            >
              Submit Proposal
            </button>
          </div>
        </div>
      )}

      {/* Proposals List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : proposals.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">No active proposals</p>
        </div>
      ) : (
        <div className="space-y-6">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{proposal.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      proposal.category === 'feature' ? 'bg-blue-100 text-blue-800' :
                      proposal.category === 'policy' ? 'bg-purple-100 text-purple-800' :
                      proposal.category === 'treasury' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {proposal.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{proposal.description}</p>
                  <p className="text-sm text-gray-500">
                    Proposed by {proposal.proposer.slice(0, 8)}... • Ends in {getRemainingTime(proposal.votingEndsAt)}
                  </p>
                </div>
              </div>

              {/* Voting Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Yes: {proposal.votes.yes}</span>
                  <span className="font-medium">No: {proposal.votes.no}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${getVotePercentage(proposal)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {getVotePercentage(proposal)}% approval (threshold: {proposal.threshold}%)
                </p>
              </div>

              {/* Vote Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleVote(proposal.id, 'yes')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
                >
                  Vote Yes
                </button>
                <button
                  onClick={() => handleVote(proposal.id, 'no')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
                >
                  Vote No
                </button>
                <button
                  onClick={() => handleVote(proposal.id, 'abstain')}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg font-medium"
                >
                  Abstain
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
