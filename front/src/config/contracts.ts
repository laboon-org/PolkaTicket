/**
 * Smart Contract Configuration
 * Moonbase Alpha (Polkadot EVM) Deployment
 */

export const MOONBASE_CONFIG = {
  network: 'moonbase-alpha',
  chainId: 1287,
  rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
  explorerUrl: 'https://moonbase.moonscan.io',
  faucetUrl: 'https://faucet.moonbeam.network/',
  
  // Deployed Contracts
  contracts: {
    ticketNFT: '0x9f0b44f152EdDFB99f0206D2E7E390b5ED69372b',
  },
  
  // Contract Details
  deployment: {
    date: '2025-11-18',
    deployer: '0x0bb37A89207bf524b9d482624971B8A5EE08Da85',
    transactionHash: '0x54a6447b2ce577d9d90261b9b334d329799cd59036b13c935286390765ede1f4',
  }
};

// Contract ABI (simplified - add full ABI when needed)
export const TICKET_NFT_ABI = [
  // Read functions
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function getTicket(uint256 tokenId) view returns (uint256, uint8, uint8, address, string, bool)',
  
  // Write functions
  'function mint(address to, uint8 eventId, uint8 eventType, string memory pathData) returns (uint256)',
  'function createTickets(address to, uint8 eventId, uint8 eventType, string[] memory pathData)',
  'function setTicketUsed(uint8 eventId, uint256 tokenId)',
  'function transfer(address to, uint256 tokenId)',
  
  // Events
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event TicketMinted(address indexed to, uint256 indexed tokenId, uint8 eventId)',
];

// Network configuration for MetaMask
export const MOONBASE_NETWORK_PARAMS = {
  chainId: '0x507', // 1287 in hex
  chainName: 'Moonbase Alpha',
  nativeCurrency: {
    name: 'DEV',
    symbol: 'DEV',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
  blockExplorerUrls: ['https://moonbase.moonscan.io/'],
};

export default MOONBASE_CONFIG;
