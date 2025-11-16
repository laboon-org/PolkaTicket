# Setup Instructions

## Prerequisites
- Node.js 18+ 
- npm or yarn
- Polkadot.js browser extension

## Quick Start

### 1. Install Dependencies
```bash
cd projects/010-poka-ticket/3_dev/front
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Install Polkadot.js Extension
- Chrome: https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/

### 4. Get Shibuya Test Tokens
- Visit: https://portal.astar.network/shibuya-testnet/assets
- Connect wallet
- Faucet: Get free SBY tokens

## Current Status

### ✅ Completed
- Dependencies updated (React 18, Polkadot.js)
- Polkadot.js wallet integration
- Astar NFT service structure
- WalletConnect component

### 🚧 In Progress
- Purchase flow UI
- QR code generation
- IPFS integration

### 📝 Next Steps
1. Run `npm install` in frontend
2. Test wallet connection
3. Implement purchase flow
4. Add QR code features

## Tech Stack
- React 18.2.0
- TypeScript 5.3.3
- @polkadot/api 10.11.2
- TailwindCSS 3.3.6
- Astar Shibuya Testnet

## Troubleshooting

### Module not found errors
Run `npm install` to install all dependencies

### Wallet not connecting
1. Install Polkadot.js extension
2. Create/import account
3. Refresh page

### Network errors
Check Shibuya testnet status: https://astar.network/
