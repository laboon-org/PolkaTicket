import React from 'react';
import { usePolkadot } from '../hooks/usePolkadot';

export const WalletConnect: React.FC = () => {
  const {
    accounts,
    selectedAccount,
    isConnected,
    isLoading,
    error,
    connectWallet,
    selectAccount,
    disconnectWallet,
  } = usePolkadot();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        <span>Connecting...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div>
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Connect Wallet
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {accounts.length > 1 && (
        <select
          value={selectedAccount?.address || ''}
          onChange={(e) => {
            const account = accounts.find(acc => acc.address === e.target.value);
            if (account) selectAccount(account);
          }}
          className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          {accounts.map((account) => (
            <option key={account.address} value={account.address}>
              {account.meta.name || 'Account'} ({account.address.slice(0, 6)}...{account.address.slice(-4)})
            </option>
          ))}
        </select>
      )}
      
      {selectedAccount && (
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{selectedAccount.meta.name || 'Account'}</span>
            <span className="text-xs text-gray-600">
              {selectedAccount.address.slice(0, 8)}...{selectedAccount.address.slice(-6)}
            </span>
          </div>
          <button
            onClick={disconnectWallet}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};
