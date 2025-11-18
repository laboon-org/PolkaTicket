import { useState, useEffect, useCallback } from 'react';
import { getWeb3Service } from '../services/Web3Service';

export interface UseWeb3Return {
  account: string | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  mintTicket: (eventId: number, eventType: number, pathData: string) => Promise<{ hash: string; tokenId?: string }>;
  getTicketBalance: (address: string) => Promise<number>;
}

export function useWeb3(): UseWeb3Return {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const web3Service = getWeb3Service();

  // Connect to MetaMask
  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const address = await web3Service.connect();
      setAccount(address);

      // Get balance
      const bal = await web3Service.getBalance(address);
      setBalance(bal);

      console.log('Connected:', address);
    } catch (err: any) {
      console.error('Connection error:', err);
      setError(err.message || 'Failed to connect');
      setAccount(null);
      setBalance(null);
    } finally {
      setIsConnecting(false);
    }
  }, [web3Service]);

  // Disconnect
  const disconnect = useCallback(() => {
    web3Service.disconnect();
    setAccount(null);
    setBalance(null);
    setError(null);
  }, [web3Service]);

  // Mint ticket
  const mintTicket = useCallback(
    async (eventId: number, eventType: number, pathData: string) => {
      if (!account) {
        throw new Error('Please connect wallet first');
      }

      try {
        const result = await web3Service.mintTicket(eventId, eventType, pathData);
        
        // Update balance after minting
        const newBalance = await web3Service.getBalance(account);
        setBalance(newBalance);

        return result;
      } catch (err: any) {
        console.error('Minting error:', err);
        throw err;
      }
    },
    [account, web3Service]
  );

  // Get ticket balance
  const getTicketBalance = useCallback(
    async (address: string) => {
      return await web3Service.getTicketBalance(address);
    },
    [web3Service]
  );

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ethereum = (window as any).ethereum;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        disconnect();
      } else if (accounts[0] !== account) {
        // Account changed
        setAccount(accounts[0]);
        web3Service.getBalance(accounts[0]).then(setBalance);
      }
    };

    const handleChainChanged = () => {
      // Reload page on chain change
      window.location.reload();
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [account, disconnect, web3Service]);

  // Auto-connect if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window === 'undefined') return;

      const ethereum = (window as any).ethereum;
      if (!ethereum) return;

      try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          await connect();
        }
      } catch (err) {
        console.error('Auto-connect failed:', err);
      }
    };

    checkConnection();
  }, []);

  return {
    account,
    balance,
    isConnected: !!account,
    isConnecting,
    error,
    connect,
    disconnect,
    mintTicket,
    getTicketBalance,
  };
}

export default useWeb3;
