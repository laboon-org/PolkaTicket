import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

interface PolkadotContextType {
  api: ApiPromise | null;
  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  selectAccount: (account: InjectedAccountWithMeta) => void;
  disconnectWallet: () => void;
}

const PolkadotContext = createContext<PolkadotContextType | undefined>(undefined);

export const usePolkadot = () => {
  const context = useContext(PolkadotContext);
  if (!context) {
    throw new Error('usePolkadot must be used within PolkadotProvider');
  }
  return context;
};

interface PolkadotProviderProps {
  children: ReactNode;
}

export const PolkadotProvider: React.FC<PolkadotProviderProps> = ({ children }) => {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Connect to Astar Shibuya testnet
  useEffect(() => {
    const connectToChain = async () => {
      try {
        setIsLoading(true);
        // Shibuya testnet endpoint
        const wsProvider = new WsProvider('wss://rpc.shibuya.astar.network');
        const apiInstance = await ApiPromise.create({ provider: wsProvider });
        setApi(apiInstance);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to connect to Astar network');
        setIsLoading(false);
        console.error('Chain connection error:', err);
      }
    };

    connectToChain();

    return () => {
      if (api) {
        api.disconnect();
      }
    };
  }, []);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Enable Polkadot.js extension
      const extensions = await web3Enable('Poka Ticket');
      
      if (extensions.length === 0) {
        throw new Error('No extension found. Please install Polkadot.js extension.');
      }

      // Get all accounts
      const allAccounts = await web3Accounts();
      
      if (allAccounts.length === 0) {
        throw new Error('No accounts found. Please create an account in Polkadot.js extension.');
      }

      setAccounts(allAccounts);
      setSelectedAccount(allAccounts[0]); // Auto-select first account
      setIsConnected(true);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      setIsLoading(false);
      console.error('Wallet connection error:', err);
    }
  };

  const selectAccount = (account: InjectedAccountWithMeta) => {
    setSelectedAccount(account);
  };

  const disconnectWallet = () => {
    setAccounts([]);
    setSelectedAccount(null);
    setIsConnected(false);
  };

  const value: PolkadotContextType = {
    api,
    accounts,
    selectedAccount,
    isConnected,
    isLoading,
    error,
    connectWallet,
    selectAccount,
    disconnectWallet,
  };

  return (
    <PolkadotContext.Provider value={value}>
      {children}
    </PolkadotContext.Provider>
  );
};
