# Polka Ticket

> Decentralized NFT ticketing platform powered by Polkadot

**Live Demo:** https://polka-ticket-ii1x7sid7-hles-projects.vercel.app

## Overview

Polka Ticket is a production-ready NFT ticketing platform built on Astar Network with cross-chain capabilities, privacy features, and dynamic NFTs.

## Key Features

- 🎫 **NFT Ticketing** - PSP34 standard on Astar
- 🌉 **Cross-Chain** - XCM transfers (Astar ↔ Moonbeam)
- 🔐 **Privacy** - Zero-knowledge proofs
- 🎨 **Dynamic NFTs** - Evolving metadata
- 🗳️ **Governance** - DAO proposals & voting
- 🏪 **Marketplace** - Secondary ticket market

## Quick Start

```bash
# Frontend
cd front
npm install --legacy-peer-deps
npm start
```

Visit http://localhost:3000

## Documentation

- [Setup Guide](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Features](docs/FEATURES.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Testnet Guide](docs/TESTNET.md)

## Project Structure

```
├── front/          # React frontend
├── back/           # Backend API
├── contract/       # Smart contracts
└── docs/           # Documentation
```

## Tech Stack

**Frontend:** React 18, TypeScript, TailwindCSS, Material-UI  
**Blockchain:** Polkadot.js, Astar Network, Moonbeam  
**Storage:** IPFS  
**Services:** XCM, Privacy (ZK), Governance, Dynamic NFT

## Status

- ✅ Production deployment on Vercel
- ✅ 81% features working with mock data
- ⏳ Testnet integration pending tokens

## Team

- Team Leader: Hiep Le
- Business Analyst: Hien Nguyen
- Frontend: Nghi Nguyen, Duy Le, Tu Nguyen
- Backend: Duy Nguyen, Dat Nguyen
- Blockchain: Hiep Le, Son Lam

## License

MIT
