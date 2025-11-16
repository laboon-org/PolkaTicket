import React, { useState } from 'react';
import { usePolkadot } from '../hooks/usePolkadot';
import { XCMService } from '../services/XCMService';

interface CrossChainTransferProps {
  tokenId: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

export const CrossChainTransfer: React.FC<CrossChainTransferProps> = ({
  tokenId,
  onSuccess,
  onError,
}) => {
  const { api, selectedAccount } = usePolkadot();
  const [fromChain, setFromChain] = useState<'astar' | 'moonbeam'>('astar');
  const [toChain, setToChain] = useState<'astar' | 'moonbeam'>('moonbeam');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [txStatus, setTxStatus] = useState('');

  const handleTransfer = async () => {
    if (!api || !selectedAccount) {
      onError?.('Wallet not connected');
      return;
    }

    if (!destinationAddress) {
      onError?.('Please enter destination address');
      return;
    }

    try {
      setIsTransferring(true);
      setTxStatus('Initializing XCM transfer...');

      const xcmService = new XCMService(api);
      
      setTxStatus('Building XCM message...');
      const txHash = await xcmService.transferCrossChain(selectedAccount, {
        tokenId,
        fromChain,
        toChain,
        destinationAddress,
      });

      setTxStatus('Transfer successful!');
      setIsTransferring(false);
      onSuccess?.(txHash);
    } catch (error: any) {
      console.error('Transfer error:', error);
      setTxStatus('');
      setIsTransferring(false);
      onError?.(error.message || 'Transfer failed');
    }
  };

  const swapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Cross-Chain Transfer</h3>
      <p className="text-sm text-gray-600 mb-6">
        Transfer your ticket between Astar and Moonbeam networks using XCM
      </p>

      <div className="space-y-4">
        {/* Chain Selection */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">From Chain</label>
            <select
              value={fromChain}
              onChange={(e) => setFromChain(e.target.value as 'astar' | 'moonbeam')}
              disabled={isTransferring}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="astar">Astar (Shibuya)</option>
              <option value="moonbeam">Moonbeam (Moonbase)</option>
            </select>
          </div>

          <button
            onClick={swapChains}
            disabled={isTransferring}
            className="mt-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">To Chain</label>
            <select
              value={toChain}
              onChange={(e) => setToChain(e.target.value as 'astar' | 'moonbeam')}
              disabled={isTransferring}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="astar">Astar (Shibuya)</option>
              <option value="moonbeam">Moonbeam (Moonbase)</option>
            </select>
          </div>
        </div>

        {/* Destination Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination Address
          </label>
          <input
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            placeholder="0x... or 5..."
            disabled={isTransferring}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the recipient's address on the destination chain
          </p>
        </div>

        {/* Ticket Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Ticket ID:</p>
          <p className="font-mono text-sm font-medium">{tokenId}</p>
        </div>

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          disabled={isTransferring || !destinationAddress || fromChain === toChain}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            isTransferring || !destinationAddress || fromChain === toChain
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isTransferring ? 'Transferring...' : 'Transfer Cross-Chain'}
        </button>

        {/* Status */}
        {txStatus && (
          <div className={`p-3 rounded-lg ${
            txStatus.includes('successful') 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${
              txStatus.includes('successful') ? 'text-green-800' : 'text-blue-800'
            }`}>
              {txStatus}
            </p>
          </div>
        )}

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            ⚠️ Cross-chain transfers may take a few minutes to complete. Make sure you have enough tokens for gas fees on both chains.
          </p>
        </div>
      </div>
    </div>
  );
};
