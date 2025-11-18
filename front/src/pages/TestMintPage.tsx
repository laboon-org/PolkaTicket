import React from 'react';
import Web3ConnectButton from '../components/Web3ConnectButton';
import MintTicketForm from '../components/MintTicketForm';

export const TestMintPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎫 Polka Ticket - Test Minting
          </h1>
          <p className="text-gray-600">
            Test NFT ticket minting on Moonbase Alpha
          </p>
        </div>

        {/* Connect Wallet */}
        <div className="mb-8">
          <Web3ConnectButton />
        </div>

        {/* Mint Form */}
        <MintTicketForm />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Built for Polkadot Tinkerers Hackathon</p>
          <p className="mt-1">
            Contract deployed on Moonbase Alpha (Polkadot EVM)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestMintPage;
