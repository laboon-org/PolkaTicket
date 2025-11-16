import React, { useEffect, useState } from 'react';
import { usePolkadot } from '../hooks/usePolkadot';
import { AstarNFTService, NFTTicket } from '../services/AstarNFTService';

interface MarketplaceListing {
  ticket: NFTTicket;
  price: string;
  seller: string;
  listedAt: number;
}

export const MarketplacePage: React.FC = () => {
  const { api, selectedAccount, isConnected } = usePolkadot();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'vip' | 'general'>('all');

  useEffect(() => {
    if (api && isConnected) {
      loadListings();
    }
  }, [api, isConnected, filter]);

  const loadListings = async () => {
    setIsLoading(true);
    // Mock marketplace listings
    const mockListings: MarketplaceListing[] = [
      {
        ticket: {
          tokenId: 'TICKET-MARKET-1',
          owner: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          metadata: {
            eventId: 'EVT-001',
            eventName: 'Polkadot Summit 2025',
            eventDate: '2025-12-15',
            ticketType: 'VIP',
            seatNumber: 'A-10',
            price: '100 DOT',
            image: 'https://via.placeholder.com/400x200',
          },
          mintedAt: Date.now() - 86400000,
        },
        price: '80 DOT',
        seller: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        listedAt: Date.now() - 3600000,
      },
      {
        ticket: {
          tokenId: 'TICKET-MARKET-2',
          owner: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          metadata: {
            eventId: 'EVT-002',
            eventName: 'Web3 Conference',
            eventDate: '2025-11-20',
            ticketType: 'General',
            seatNumber: 'B-25',
            price: '50 DOT',
            image: 'https://via.placeholder.com/400x200',
          },
          mintedAt: Date.now() - 172800000,
        },
        price: '40 DOT',
        seller: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        listedAt: Date.now() - 7200000,
      },
    ];

    const filtered = filter === 'all' 
      ? mockListings 
      : mockListings.filter(l => l.ticket.metadata.ticketType.toLowerCase() === filter);

    setListings(filtered);
    setIsLoading(false);
  };

  const handleBuy = async (listing: MarketplaceListing) => {
    if (!api || !selectedAccount) return;
    
    // TODO: Implement marketplace buy
    console.log('Buying ticket:', listing.ticket.tokenId);
    alert(`Buying ${listing.ticket.metadata.eventName} for ${listing.price}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ticket Marketplace</h1>
        <p className="text-gray-600">Buy and sell tickets on the secondary market</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Tickets
        </button>
        <button
          onClick={() => setFilter('vip')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'vip' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          VIP
        </button>
        <button
          onClick={() => setFilter('general')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'general' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          General
        </button>
      </div>

      {/* Listings */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">No tickets listed for sale</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.ticket.tokenId} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                  src={listing.ticket.metadata.image}
                  alt={listing.ticket.metadata.eventName}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-blue-600">
                    {listing.ticket.metadata.ticketType}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {listing.ticket.metadata.eventName}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {listing.ticket.metadata.eventDate}
                  </div>
                  
                  {listing.ticket.metadata.seatNumber && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Seat: {listing.ticket.metadata.seatNumber}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Original Price</p>
                      <p className="text-sm line-through text-gray-400">{listing.ticket.metadata.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Sale Price</p>
                      <p className="text-2xl font-bold text-green-600">{listing.price}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(listing)}
                  disabled={!isConnected}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isConnected
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-400 cursor-not-allowed text-white'
                  }`}
                >
                  {isConnected ? 'Buy Now' : 'Connect Wallet'}
                </button>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Listed {new Date(listing.listedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
