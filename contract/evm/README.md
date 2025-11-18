# EVM Smart Contracts - Polka Ticket

Solidity contracts for NFT ticketing on Moonbase Alpha (Polkadot EVM).

## 📦 Contracts

- **NTSTicket.sol** - Main NFT ticket contract (ERC-721 compatible)
- **NTSEvent.sol** - Event management contract

## 🚀 Quick Deploy

### Prerequisites
- Python 3.7+
- MetaMask with DEV tokens from https://faucet.moonbeam.network/

### Deploy Steps

```bash
# 1. Install dependencies
pip3 install -r requirements.txt

# 2. Configure .env
cp .env.example .env
# Add your PRIVATE_KEY from MetaMask

# 3. Deploy
python3 deploy.py
```

## 📋 Contract Features

### NTSTicket (Main Contract)
- ✅ Mint tickets with metadata
- ✅ Batch minting support
- ✅ Admin/Event management
- ✅ Ticket verification (isUsed flag)
- ✅ Transfer functionality
- ✅ Ticket checker role

### Methods
- `mint(address to, uint8 eventId, uint8 eventType, string pathData)`
- `createTickets(address to, uint8 eventId, uint8 eventType, string[] pathData)`
- `setTicketUsed(uint8 eventId, uint256 tokenId)`
- `getTicket(uint256 tokenId)`
- `balanceOf(address owner)`
- `ownerOf(uint256 tokenId)`

## 🌐 Network Info

- **Network:** Moonbase Alpha
- **Chain ID:** 1287
- **RPC:** https://rpc.api.moonbase.moonbeam.network
- **Explorer:** https://moonbase.moonscan.io
- **Faucet:** https://faucet.moonbeam.network/

## 📁 Structure

```
evm/
├── contract/           # Solidity contracts
│   ├── NTSTicket.sol
│   └── NTSEvent.sol
├── scripts/           # Deployment scripts
│   ├── deploy-hardhat.js
│   └── test-hardhat.js
├── deploy.py          # Python deployment (recommended)
├── .env              # Private key (gitignored)
├── .env.example      # Template
└── README.md         # This file
```

## 🔧 Alternative Deployment Methods

### Method 1: Python (Recommended - Works with Node 18)
```bash
python3 deploy.py
```

### Method 2: Remix IDE (No setup needed)
1. Visit https://remix.ethereum.org/
2. Upload `contract/NTSTicket.sol`
3. Compile with Solidity 0.8.6
4. Deploy via MetaMask

### Method 3: Hardhat (Requires Node 20+)
```bash
npx hardhat run scripts/deploy-hardhat.js --network moonbase
```

## ✅ After Deployment

1. **Save contract address** from deployment output
2. **Verify on Moonscan:** https://moonbase.moonscan.io/address/YOUR_ADDRESS
3. **Test functions** in Remix or via scripts
4. **Update frontend** with contract address

## 📝 Deployment Info

After successful deployment, check `deployment-info.json` for:
- Contract address
- Transaction hash
- Deployer address
- Deployment timestamp