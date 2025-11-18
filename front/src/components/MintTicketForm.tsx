import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { MOONBASE_CONFIG } from '../config/contracts';

export const MintTicketForm: React.FC = () => {
  const { account, isConnected, mintTicket } = useWeb3();
  const [eventId, setEventId] = useState('1');
  const [eventType, setEventType] = useState('1');
  const [pathData, setPathData] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; hash?: string; tokenId?: string } | null>(null);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setResult({ success: false, message: 'Please connect your wallet first' });
      return;
    }

    if (!pathData.trim()) {
      setResult({ success: false, message: 'Please enter ticket data' });
      return;
    }

    setIsMinting(true);
    setResult(null);

    try {
      const { hash, tokenId } = await mintTicket(
        parseInt(eventId),
        parseInt(eventType),
        pathData
      );

      setResult({
        success: true,
        message: 'Ticket minted successfully!',
        hash,
        tokenId,
      });

      // Clear form
      setPathData('');
    } catch (error: any) {
      console.error('Mint error:', error);
      setResult({
        success: false,
        message: error.message || 'Failed to mint ticket',
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Mint Test Ticket</h2>

      <form onSubmit={handleMint} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event ID
          </label>
          <input
            type="number"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1">Concert</option>
            <option value="2">Conference</option>
            <option value="3">Sports</option>
            <option value="4">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ticket Data (Path/Metadata)
          </label>
          <input
            type="text"
            value={pathData}
            onChange={(e) => setPathData(e.target.value)}
            placeholder="e.g., test-ticket-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter a unique identifier for this ticket
          </p>
        </div>

        <button
          type="submit"
          disabled={!isConnected || isMinting}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isMinting ? 'Minting...' : 'Mint Ticket'}
        </button>
      </form>

      {result && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          <div className="font-semibold mb-2">
            {result.success ? '✅ Success!' : '❌ Error'}
          </div>
          <div className="text-sm mb-2">{result.message}</div>
          
          {result.hash && (
            <div className="mt-3 space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Transaction Hash:</span>
                <div className="font-mono text-xs break-all mt-1">{result.hash}</div>
                <a
                  href={`${MOONBASE_CONFIG.explorerUrl}/tx/${result.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs"
                >
                  View on Moonscan →
                </a>
              </div>
              
              {result.tokenId && (
                <div className="text-sm">
                  <span className="font-semibold">Token ID:</span>
                  <span className="font-mono ml-2">{result.tokenId}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Info</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Network: Moonbase Alpha (Testnet)</li>
          <li>• Contract: {MOONBASE_CONFIG.contracts.ticketNFT}</li>
          <li>• Make sure you have DEV tokens for gas</li>
          <li>• Get free DEV from: <a href={MOONBASE_CONFIG.faucetUrl} target="_blank" rel="noopener noreferrer" className="underline">Faucet</a></li>
        </ul>
      </div>
    </div>
  );
};

export default MintTicketForm;
