# Architecture Overview

## System Components

```
┌─────────────────────────────────────────────────┐
│                   Frontend                      │
│              (React + TypeScript)               │
│  - UI/UX Components                            │
│  - Polkadot.js Integration                     │
│  - State Management                            │
└─────────────────┬───────────────────────────────┘
                  │
                  ├─── Polkadot.js API
                  │
┌─────────────────┴───────────────────────────────┐
│              Blockchain Layer                   │
│  ┌──────────────┐      ┌──────────────┐        │
│  │    Astar     │ XCM  │   Moonbeam   │        │
│  │   (Primary)  │◄────►│ (Secondary)  │        │
│  └──────────────┘      └──────────────┘        │
│  - NFT Contracts (PSP34)                       │
│  - Marketplace                                 │
│  - Governance                                  │
└─────────────────────────────────────────────────┘
                  │
                  ├─── IPFS
                  │
┌─────────────────┴───────────────────────────────┐
│            Storage Layer                        │
│  - Metadata Storage (IPFS)                     │
│  - Image Hosting                               │
│  - Distributed Backup                          │
└─────────────────────────────────────────────────┘
```

## Key Services

### Frontend Services
- `AstarNFTService` - NFT operations
- `XCMService` - Cross-chain transfers
- `PrivacyService` - ZK proofs
- `GovernanceService` - DAO functionality
- `IPFSService` - Decentralized storage
- `DynamicNFTService` - NFT evolution

### Smart Contracts
- `TicketNFT` - PSP34 implementation
- `Marketplace` - Trading logic
- `Governance` - DAO contracts
- `Privacy` - ZK verifier

## Data Flow

1. User connects wallet (Polkadot.js)
2. Frontend calls service layer
3. Service interacts with blockchain
4. Metadata stored on IPFS
5. State updated in UI
