import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

export const Web3ConnectButton: React.FC = () => {
  const { account, balance, isConnected, isConnecting, error, connect, disconnect } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (bal: string) => {
    return parseFloat(bal).toFixed(4);
  };

  if (isConnected && account) {
    return (
      <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
        <div className="flex-1">
          <div className="text-sm text-gray-600">Connected</div>
          <div className="font-mono font-semibold">{formatAddress(account)}</div>
          {balance && (
            <div className="text-sm text-gray-600">{formatBalance(balance)} DEV</div>
          )}
        </div>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button
        onClick={connect}
        disabled={isConnecting}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
      </button>
      {error && (
        <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default Web3ConnectButton;
