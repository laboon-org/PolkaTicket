import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

export const UnifiedWalletConnect: React.FC = () => {
  const { 
    walletType, 
    address, 
    balance, 
    isConnected, 
    isConnecting,
    error,
    connectPolkadot, 
    connectMetaMask, 
    disconnect 
  } = useWallet();

  const [showOptions, setShowOptions] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string) => {
    return parseFloat(bal).toFixed(4);
  };

  const handleConnect = async (type: 'polkadot' | 'metamask') => {
    try {
      if (type === 'polkadot') {
        await connectPolkadot();
      } else {
        await connectMetaMask();
      }
      setShowOptions(false);
    } catch (err) {
      console.error('Connection error:', err);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500">
              {walletType === 'metamask' ? 'MetaMask (EVM)' : 'Polkadot.js'}
            </span>
          </div>
          <div className="font-mono text-sm font-semibold">{formatAddress(address)}</div>
          {balance && (
            <div className="text-xs text-gray-600">
              {formatBalance(balance)} {walletType === 'metamask' ? 'DEV' : 'ASTR'}
            </div>
          )}
        </div>
        <button
          onClick={disconnect}
          className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  if (showOptions) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Connect Wallet</h3>
          <button 
            onClick={() => setShowOptions(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-2">
          {/* MetaMask Option */}
          <button
            onClick={() => handleConnect('metamask')}
            disabled={isConnecting}
            className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              🦊
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">MetaMask</div>
              <div className="text-xs text-gray-500">Moonbase Alpha (EVM)</div>
            </div>
            <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
              Recommended
            </div>
          </button>

          {/* Polkadot.js Option */}
          <button
            onClick={() => handleConnect('polkadot')}
            disabled={isConnecting}
            className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              ⬤
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">Polkadot.js</div>
              <div className="text-xs text-gray-500">Astar Shibuya (Substrate)</div>
            </div>
            <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
              Coming Soon
            </div>
          </button>
        </div>

        {error && (
          <div className="mt-3 p-2 bg-red-50 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowOptions(true)}
      disabled={isConnecting}
      className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};

export default UnifiedWalletConnect;
