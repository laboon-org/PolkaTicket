# Quick Start Guide - Poka Ticket

Hướng dẫn thiết lập và chạy dự án trong 10 phút.

## 📋 Prerequisites

### Required
- **Node.js:** v18+ ([Download](https://nodejs.org/))
- **Rust:** Latest stable ([Install](https://rustup.rs/))
- **Polkadot.js Extension:** ([Chrome](https://polkadot.js.org/extension/) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/))

### Optional
- **Docker:** For containerized deployment
- **PostgreSQL:** If using backend API
- **IPFS:** For decentralized storage

## 🚀 Quick Setup

### 1. Clone Repository

```bash
git clone https://github.com/[username]/poka-ticket
cd poka-ticket/3_dev
```

### 2. Install Dependencies

```bash
# Install Substrate dependencies
curl https://getsubstrate.io -sSf | bash -s -- --fast

# Install ink! CLI
cargo install cargo-contract --force

# Install frontend dependencies
cd src/frontend
npm install
```

### 3. Setup Environment

```bash
# Copy environment template
cp ../../.env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Run Local Node

```bash
# Terminal 1: Start Substrate node
cd 3_dev
./scripts/start-node.sh

# Wait for "Idle" status
```

### 5. Deploy Contracts

```bash
# Terminal 2: Deploy smart contracts
cd 3_dev/contracts
./deploy.sh
```

### 6. Start Frontend

```bash
# Terminal 3: Start React app
cd 3_dev/src/frontend
npm run dev
```

### 7. Open Browser

```
http://localhost:3000
```

## 🧪 Run Tests

```bash
# Test smart contracts
cd 3_dev/contracts
cargo test

# Test frontend
cd 3_dev/src/frontend
npm test

# E2E tests
npm run test:e2e
```

## 📚 Common Commands

### Development

```bash
# Start all services
npm run dev:all

# Watch mode (auto-reload)
npm run dev:watch

# Build for production
npm run build
```

### Smart Contracts

```bash
# Compile contracts
cargo contract build

# Run contract tests
cargo test

# Deploy to testnet
./scripts/deploy-testnet.sh
```

### Frontend

```bash
# Development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Network Configuration

Edit `3_dev/src/frontend/config/network.ts`:

```typescript
export const NETWORK_CONFIG = {
  // Local development
  local: {
    endpoint: 'ws://127.0.0.1:9944',
    chainId: 'local'
  },
  // Testnet
  testnet: {
    endpoint: 'wss://rococo-rpc.polkadot.io',
    chainId: 'rococo'
  }
}
```

### Contract Addresses

After deployment, update `3_dev/src/frontend/config/contracts.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  ticket: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  nft: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'
}
```

## 🐛 Troubleshooting

### Node won't start

```bash
# Clean and rebuild
cargo clean
cargo build --release
```

### Contract deployment fails

```bash
# Check account balance
polkadot-js-api query.system.account <YOUR_ADDRESS>

# Request testnet tokens
# Visit: https://faucet.polkadot.io/
```

### Frontend connection issues

```bash
# Check WebSocket connection
wscat -c ws://127.0.0.1:9944

# Verify Polkadot.js extension is installed
```

## 📖 Next Steps

1. **Read Documentation:** [4_delivery/docs/](4_delivery/docs/)
2. **Explore Code:** Start with `3_dev/src/frontend/App.tsx`
3. **Run Examples:** Check `3_dev/scripts/examples/`
4. **Join Discord:** Get help from community

## 🔗 Useful Links

- **Polkadot.js Apps:** https://polkadot.js.org/apps/
- **Substrate Docs:** https://docs.substrate.io/
- **ink! Playground:** https://ink-playground.substrate.io/
- **Project Discord:** [TBD]

---

**Need help?** Open an issue or ask in Discord!
