# Local Setup Guide - Polka Ticket

## Quick Start (5 minutes)

### 1. Prerequisites

```bash
# Check versions
node --version  # Should be 18+
npm --version   # Should be 9+
```

**Required:**
- Node.js 18+
- npm 9+
- Polkadot.js Extension (browser)

### 2. Clone & Install

```bash
# Clone repository
git clone https://github.com/hieple7985/polka-ticket.git
cd polka-ticket/3_dev/front

# Install dependencies
npm install
```

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env (optional - app works with defaults)
nano .env
```

**Default configuration works out of the box!** You only need to add IPFS credentials if you want to upload metadata.

### 4. Start Development Server

```bash
npm run dev
```

**App will open at:** http://localhost:5173

---

## Testing the App Locally

### Step 1: Install Polkadot.js Extension

1. Install from: https://polkadot.js.org/extension/
2. Create or import a wallet
3. Switch to **Shibuya** network

### Step 2: Get Testnet Tokens

```bash
# Get SBY tokens from faucet
# Visit: https://portal.astar.network/shibuya-testnet/assets
# Click "Faucet" and request tokens
```

### Step 3: Connect Wallet

1. Open http://localhost:5173
2. Click "Connect Wallet"
3. Approve Polkadot.js Extension
4. Select your account

### Step 4: Test Core Features

#### A. Purchase Ticket
```
1. Browse events on homepage
2. Click "Purchase Ticket"
3. Sign transaction
4. Wait for confirmation
5. Verify NFT minted
```

#### B. View My Tickets
```
1. Navigate to "My Tickets"
2. See your purchased tickets
3. Click on a ticket to view details
4. Check QR code generation
```

#### C. Cross-Chain Transfer
```
1. Select a ticket
2. Click "Transfer to Moonbeam"
3. Enter destination address
4. Sign XCM transaction
5. Wait for cross-chain confirmation
```

#### D. Privacy Check-In
```
1. Go to ticket details
2. Click "Generate Privacy Proof"
3. Copy proof
4. Use QR scanner to verify
5. Check anonymous verification
```

#### E. Governance Voting
```
1. Navigate to "Governance"
2. View active proposals
3. Click "Vote Yes/No/Abstain"
4. Sign transaction
5. See vote recorded
```

---

## Development Workflow

### File Structure

```
3_dev/front/
├── src/
│   ├── components/          # UI components
│   │   ├── TicketCard.tsx
│   │   ├── QRScanner.tsx
│   │   ├── CrossChainTransfer.tsx
│   │   └── MetricsDashboard.tsx
│   ├── pages/               # Page components
│   │   ├── MyTicketsPage.tsx
│   │   ├── MarketplacePage.tsx
│   │   ├── OrganizerDashboard.tsx
│   │   └── GovernancePage.tsx
│   ├── services/            # Blockchain services
│   │   ├── AstarNFTService.ts
│   │   ├── XCMService.ts
│   │   ├── PrivacyService.ts
│   │   ├── DynamicNFTService.ts
│   │   ├── GovernanceService.ts
│   │   └── IPFSService.ts
│   ├── hooks/               # React hooks
│   │   └── usePolkadot.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

### Hot Reload

The app uses Vite for instant hot reload. Changes to any file will automatically refresh the browser.

### Linting

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix
```

---

## Troubleshooting

### Issue: "Cannot find module '@polkadot/api'"

**Solution:**
```bash
cd 3_dev/front
npm install
```

### Issue: "Wallet not connecting"

**Solution:**
1. Ensure Polkadot.js Extension is installed
2. Refresh the page
3. Check browser console for errors
4. Try different browser (Chrome/Firefox)

### Issue: "Transaction fails"

**Solution:**
1. Check you have SBY tokens
2. Verify network is Shibuya
3. Check RPC endpoint is working
4. Try again with higher gas limit

### Issue: "IPFS upload fails"

**Solution:**
1. Check IPFS credentials in `.env`
2. Verify Infura project is active
3. Check network connectivity
4. Use default mock data (app works without IPFS)

### Issue: "Cross-chain transfer stuck"

**Solution:**
1. XCM can take 1-2 minutes
2. Check both chains (Astar + Moonbeam)
3. Verify XCM channel is open
4. Check testnet status

---

## Testing Checklist

### ✅ Core Features
- [ ] Wallet connection works
- [ ] Can view events
- [ ] Can purchase ticket (NFT minting)
- [ ] Ticket appears in "My Tickets"
- [ ] QR code generates correctly
- [ ] Can scan QR code (camera or manual)

### ✅ Advanced Features
- [ ] Cross-chain transfer works
- [ ] Privacy proof generates
- [ ] Privacy verification works
- [ ] Dynamic NFT metadata updates
- [ ] Governance voting works
- [ ] Marketplace displays listings

### ✅ UI/UX
- [ ] Responsive on desktop
- [ ] Responsive on mobile
- [ ] Loading states show
- [ ] Error messages display
- [ ] Success notifications work
- [ ] Navigation is intuitive

### ✅ Performance
- [ ] Page loads < 2 seconds
- [ ] Transactions confirm < 30 seconds
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth animations

---

## Build for Production

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

**Output:** `dist/` folder ready for deployment

---

## Environment Variables Explained

```bash
# IPFS (Optional - for metadata upload)
VITE_IPFS_PROJECT_ID=...        # Get from infura.io
VITE_IPFS_PROJECT_SECRET=...    # Get from infura.io
VITE_IPFS_GATEWAY=...           # Default: Infura gateway

# Blockchain (Required)
VITE_ASTAR_RPC=...              # Shibuya testnet RPC
VITE_MOONBEAM_RPC=...           # Moonbase Alpha RPC

# Contracts (Optional - uses defaults)
VITE_TICKET_CONTRACT_ADDRESS=...
VITE_MARKETPLACE_CONTRACT_ADDRESS=...

# App (Optional)
VITE_APP_URL=...                # Default: localhost:5173
VITE_APP_NAME=...               # Default: Polka Ticket

# Features (Optional - all enabled by default)
VITE_ENABLE_PRIVACY=true
VITE_ENABLE_GOVERNANCE=true
VITE_ENABLE_CROSS_CHAIN=true
```

---

## Mock Data vs Real Data

**The app works with mock data by default** for quick testing:

- ✅ Events: Mock event list
- ✅ Tickets: Mock NFT data
- ✅ Governance: Mock proposals
- ✅ Marketplace: Mock listings

**To use real blockchain data:**
1. Deploy contracts to Shibuya
2. Update contract addresses in `.env`
3. Mint real NFTs
4. Upload metadata to IPFS

---

## Performance Tips

### 1. Faster Development
```bash
# Use local RPC node (optional)
VITE_ASTAR_RPC=ws://localhost:9944
```

### 2. Reduce Bundle Size
```bash
# Analyze bundle
npm run build -- --analyze
```

### 3. Cache Optimization
```bash
# Clear node_modules cache
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

1. **Test locally** - Follow testing checklist above
2. **Fix bugs** - Check console for errors
3. **Add tests** - Write unit tests for services
4. **Deploy** - Deploy to Polkadot Cloud or Vercel

---

## Support

**Issues?** Check:
1. Browser console (F12)
2. Network tab (check RPC calls)
3. Polkadot.js Extension (check connection)
4. GitHub Issues: https://github.com/hieple7985/polka-ticket/issues

**Need help?**
- Discord: Polkadot hackathon server
- Email: hieple7985@gmail.com

---

**Ready to test!** 🚀

Start with: `npm install && npm run dev`
