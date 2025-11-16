import React, { useState } from 'react';
import { usePolkadot } from '../hooks/usePolkadot';
import { AstarNFTService, TicketMetadata } from '../services/AstarNFTService';

interface PurchaseTicketProps {
  eventId: string;
  eventName: string;
  eventDate: string;
  ticketType: string;
  price: string;
  onSuccess?: (tokenId: string) => void;
  onError?: (error: string) => void;
}

export const PurchaseTicket: React.FC<PurchaseTicketProps> = ({
  eventId,
  eventName,
  eventDate,
  ticketType,
  price,
  onSuccess,
  onError,
}) => {
  const { api, selectedAccount, isConnected } = usePolkadot();
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<string>('');

  const handlePurchase = async () => {
    if (!api || !selectedAccount || !isConnected) {
      onError?.('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setTxStatus('Preparing transaction...');

      const nftService = new AstarNFTService(api);

      const metadata: TicketMetadata = {
        eventId,
        eventName,
        eventDate,
        ticketType,
        price,
        image: `https://via.placeholder.com/400x200?text=${encodeURIComponent(eventName)}`,
      };

      setTxStatus('Minting NFT ticket...');
      const tokenId = await nftService.mintTicket(selectedAccount, metadata);

      setTxStatus('Transaction successful!');
      setIsLoading(false);

      onSuccess?.(tokenId);
    } catch (error: any) {
      console.error('Purchase error:', error);
      setTxStatus('');
      setIsLoading(false);
      onError?.(error.message || 'Failed to purchase ticket');
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Please connect your wallet to purchase tickets</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Purchase Ticket</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Event:</span>
            <span className="font-medium">{eventName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{eventDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ticket Type:</span>
            <span className="font-medium">{ticketType}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-gray-900 font-semibold">Total:</span>
            <span className="text-blue-600 font-bold text-lg">{price}</span>
          </div>
        </div>

        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? 'Processing...' : 'Purchase Ticket'}
        </button>

        {txStatus && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">{txStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};
