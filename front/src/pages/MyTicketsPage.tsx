import React, { useEffect, useState } from 'react';
import { usePolkadot } from '../hooks/usePolkadot';
import { AstarNFTService, NFTTicket } from '../services/AstarNFTService';
import { TicketCard } from '../components/TicketCard';

export const MyTicketsPage: React.FC = () => {
  const { api, selectedAccount, isConnected } = usePolkadot();
  const [tickets, setTickets] = useState<NFTTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (api && selectedAccount && isConnected) {
      loadTickets();
    }
  }, [api, selectedAccount, isConnected]);

  const loadTickets = async () => {
    if (!api || !selectedAccount) return;

    try {
      setIsLoading(true);
      setError(null);

      const nftService = new AstarNFTService(api);
      const userTickets = await nftService.getOwnedTickets(selectedAccount.address);
      
      setTickets(userTickets);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Error loading tickets:', err);
      setError(err.message || 'Failed to load tickets');
      setIsLoading(false);
    }
  };

  const handleTransfer = (tokenId: string) => {
    // TODO: Implement transfer modal
    console.log('Transfer ticket:', tokenId);
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Wallet Not Connected</h2>
          <p className="text-yellow-700">Please connect your wallet to view your tickets</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-4 text-lg text-gray-600">Loading your tickets...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={loadTickets}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tickets</h1>
        <p className="text-gray-600">
          You have {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets Yet</h3>
          <p className="text-gray-500 mb-4">
            You haven't purchased any tickets yet. Browse events to get started!
          </p>
          <a
            href="/events"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Browse Events
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.tokenId}
              ticket={ticket}
              showQR={false}
              onTransfer={handleTransfer}
            />
          ))}
        </div>
      )}
    </div>
  );
};
