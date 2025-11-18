import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePolkadot } from './PolkadotContext';
import { useWeb3 } from '../hooks/useWeb3';

type WalletType = 'polkadot' | 'metamask' | null;

interface WalletContextType {
  // Unified wallet state
  walletType: WalletType;
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  
  // Actions
  connectPolkadot: () => Promise<void>;
  connectMetaMask: () => Promise<void>;
  disconnect: () => void;
  switchWallet: (type: WalletType) => void;
  
  // Minting (unified interface)
  mintTicket: (eventId: number, eventType: number, pathData: string) => Promise<{ hash: string; tokenId?: string }>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletType, setWalletType] = useState<WalletType>(null);
  
  // Polkadot context
  const polkadot = usePolkadot();
  
  // Web3 (MetaMask) hook
  const web3 = useWeb3();

  // Unified state based on active wallet
  const address = walletType === 'metamask' 
    ? web3.account 
    : walletType === 'polkadot' 
      ? polkadot.selectedAccount?.address || null
      : null;

  const balance = walletType === 'metamask' 
    ? web3.balance 
    : null; // TODO: Add Polkadot balance

  const isConnected = walletType === 'metamask' 
    ? web3.isConnected 
    : walletType === 'polkadot' 
      ? polkadot.isConnected 
      : false;

  const isConnecting = walletType === 'metamask' 
    ? web3.isConnecting 
    : walletType === 'polkadot' 
      ? polkadot.isLoading 
      : false;

  const error = walletType === 'metamask' 
    ? web3.error 
    : walletType === 'polkadot' 
      ? polkadot.error 
      : null;

  // Connect to Polkadot
  const connectPolkadot = async () => {
    try {
      await polkadot.connectWallet();
      setWalletType('polkadot');
    } catch (err) {
      console.error('Polkadot connection failed:', err);
      throw err;
    }
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    try {
      await web3.connect();
      setWalletType('metamask');
    } catch (err) {
      console.error('MetaMask connection failed:', err);
      throw err;
    }
  };

  // Disconnect
  const disconnect = () => {
    if (walletType === 'metamask') {
      web3.disconnect();
    } else if (walletType === 'polkadot') {
      polkadot.disconnectWallet();
    }
    setWalletType(null);
  };

  // Switch wallet type
  const switchWallet = (type: WalletType) => {
    disconnect();
    setWalletType(type);
  };

  // Unified mint function
  const mintTicket = async (eventId: number, eventType: number, pathData: string) => {
    if (walletType === 'metamask') {
      // Use Web3 minting (EVM)
      return await web3.mintTicket(eventId, eventType, pathData);
    } else if (walletType === 'polkadot') {
      // TODO: Implement Polkadot/Substrate minting
      throw new Error('Polkadot minting not yet implemented. Please use MetaMask for now.');
    } else {
      throw new Error('No wallet connected');
    }
  };

  const value: WalletContextType = {
    walletType,
    address,
    balance,
    isConnected,
    isConnecting,
    error,
    connectPolkadot,
    connectMetaMask,
    disconnect,
    switchWallet,
    mintTicket,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
