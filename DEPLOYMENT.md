# Deployment Guide - Polka Ticket on Polkadot Cloud

## Overview

This guide covers deploying Polka Ticket to **polka-ticket.polkadot.cloud** using Polkadot Cloud's resilient hosting infrastructure.

---

## What is Polkadot Cloud?

**Polkadot Cloud** is a decentralized Web3 infrastructure platform that provides:

- **Resilient Hosting** - Censorship-resistant dApp deployment
- **Data Availability** - Distributed storage layer
- **Cloud Execution** - Scalable compute resources
- **Settlement Finality** - Cross-chain transaction finality
- **Global Network** - 125M+ validators worldwide

**Website:** https://polkadot.cloud/  
**Apps Portal:** https://polkadot.cloud/apps

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│         polka-ticket.polkadot.cloud (Frontend)              │
│                  Hosted on Polkadot Cloud                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ├─── Polkadot.js API
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   Blockchain Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Astar Network (Shibuya Testnet)             │  │
│  │  - PSP34 NFT Contracts                              │  │
│  │  - Ticket Minting & Transfers                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│                    XCM Bridge                               │
│                         │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        Moonbeam Network (Moonbase Alpha)            │  │
│  │  - Cross-chain NFT Support                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   Storage Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ IPFS         │  │ On-chain     │  │ Browser      │     │
│  │ (Metadata)   │  │ (State)      │  │ (Cache)      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

### 1. Development Environment
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### 2. Accounts & Credentials
- Polkadot.js Extension installed
- Astar Shibuya testnet wallet with SBY tokens
- IPFS credentials (Infura or Pinata)
- GitHub account (for CI/CD)

### 3. Environment Variables

Create `.env` file in `3_dev/front/`:

```bash
# IPFS Configuration
VITE_IPFS_PROJECT_ID=your_infura_project_id
VITE_IPFS_PROJECT_SECRET=your_infura_secret
VITE_IPFS_GATEWAY=https://ipfs.infura.io:5001

# Blockchain Configuration
VITE_ASTAR_RPC=wss://shibuya-rpc.dwellir.com
VITE_MOONBEAM_RPC=wss://wss.api.moonbase.moonbeam.network

# Contract Addresses (deploy your own or use testnet defaults)
VITE_TICKET_CONTRACT_ADDRESS=0x...
VITE_MARKETPLACE_CONTRACT_ADDRESS=0x...

# Polkadot Cloud
VITE_APP_URL=https://polka-ticket.polkadot.cloud
```

---

## Step 1: Build Production Bundle

```bash
cd 3_dev/front

# Install dependencies
npm install

# Run tests (optional)
npm run test

# Build for production
npm run build

# Output will be in dist/ folder
```

**Build Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── [static files]
```

---

## Step 2: Deploy to Polkadot Cloud

### Option A: Via Polkadot Cloud Portal (Recommended)

1. **Visit Deployment Portal:**
   ```
   https://polkadot.cloud/apps
   ```

2. **Click "Deploy your app"**

3. **Configure Deployment:**
   - **App Name:** `polka-ticket`
   - **Subdomain:** `polka-ticket.polkadot.cloud`
   - **Source:** Upload `dist/` folder or connect GitHub repo
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:** Add from `.env`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build & deployment (2-5 minutes)
   - Verify at `https://polka-ticket.polkadot.cloud`

### Option B: Via CLI (Advanced)

```bash
# Install Polkadot Cloud CLI (if available)
npm install -g @polkadot/cloud-cli

# Login
polkadot-cloud login

# Deploy
polkadot-cloud deploy \
  --name polka-ticket \
  --subdomain polka-ticket \
  --source ./dist \
  --env-file .env

# Monitor deployment
polkadot-cloud logs polka-ticket
```

### Option C: Via GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Polkadot Cloud

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd 3_dev/front
          npm ci
      
      - name: Build
        run: |
          cd 3_dev/front
          npm run build
        env:
          VITE_IPFS_PROJECT_ID: ${{ secrets.IPFS_PROJECT_ID }}
          VITE_IPFS_PROJECT_SECRET: ${{ secrets.IPFS_PROJECT_SECRET }}
          VITE_ASTAR_RPC: ${{ secrets.ASTAR_RPC }}
      
      - name: Deploy to Polkadot Cloud
        run: |
          # Use Polkadot Cloud deployment action
          # (Replace with actual deployment method)
          npx polkadot-cloud deploy ./3_dev/front/dist
        env:
          POLKADOT_CLOUD_TOKEN: ${{ secrets.POLKADOT_CLOUD_TOKEN }}
```

---

## Step 3: Configure DNS & SSL

**Automatic (via Polkadot Cloud):**
- SSL certificate auto-provisioned
- DNS configured automatically
- CDN enabled globally

**Custom Domain (Optional):**
```bash
# Add CNAME record
polka-ticket.yourdomain.com -> polka-ticket.polkadot.cloud

# Update environment
VITE_APP_URL=https://polka-ticket.yourdomain.com
```

---

## Step 4: Verify Deployment

### Health Checks

```bash
# Check frontend
curl https://polka-ticket.polkadot.cloud

# Check API connectivity
curl https://polka-ticket.polkadot.cloud/api/health

# Test blockchain connection
# (Open browser console and check Polkadot.js API connection)
```

### Functional Tests

1. **Connect Wallet:**
   - Visit https://polka-ticket.polkadot.cloud
   - Click "Connect Wallet"
   - Approve Polkadot.js Extension

2. **Purchase Ticket:**
   - Browse events
   - Click "Purchase Ticket"
   - Sign transaction
   - Verify NFT minted

3. **View Tickets:**
   - Navigate to "My Tickets"
   - Verify ticket appears
   - Check QR code generation

4. **Cross-Chain Transfer:**
   - Select ticket
   - Click "Transfer to Moonbeam"
   - Sign XCM transaction
   - Verify on destination chain

---

## Step 5: Monitor & Maintain

### Monitoring Tools

```bash
# Polkadot Cloud Dashboard
https://polkadot.cloud/dashboard/polka-ticket

# Metrics to track:
- Uptime (target: 99.9%)
- Response time (target: <200ms)
- Error rate (target: <0.1%)
- Active users
- Transaction volume
```

### Logs

```bash
# View application logs
polkadot-cloud logs polka-ticket --follow

# View blockchain events
# (Use Subscan or Polkadot.js Apps)
```

### Updates

```bash
# Update deployment
cd 3_dev/front
npm run build
polkadot-cloud deploy --update

# Rollback if needed
polkadot-cloud rollback polka-ticket --version previous
```

---

## Resilience Features

### What Makes This Deployment Resilient?

1. **Decentralized Hosting**
   - No single server/datacenter
   - Distributed across Polkadot Cloud network
   - Immune to regional outages

2. **Censorship Resistance**
   - Cannot be taken down by single authority
   - IPFS-backed content delivery
   - Blockchain-verified state

3. **High Availability**
   - 99.9%+ uptime guarantee
   - Auto-scaling compute
   - Global CDN distribution

4. **Data Integrity**
   - Immutable IPFS storage
   - On-chain state verification
   - Cryptographic proofs

5. **Cross-Chain Resilience**
   - Multi-chain deployment (Astar + Moonbeam)
   - XCM fallback mechanisms
   - Chain-agnostic frontend

---

## Troubleshooting

### Issue: Deployment Fails

```bash
# Check build logs
npm run build -- --verbose

# Verify environment variables
cat .env

# Test locally first
npm run preview
```

### Issue: Wallet Connection Fails

```bash
# Verify RPC endpoints
curl -X POST https://shibuya-rpc.dwellir.com \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"system_health","params":[],"id":1}'

# Check Polkadot.js Extension
# - Ensure extension is installed
# - Allow site access
# - Switch to correct network
```

### Issue: IPFS Upload Fails

```bash
# Test IPFS connection
curl -X POST "https://ipfs.infura.io:5001/api/v0/version" \
  -u "PROJECT_ID:PROJECT_SECRET"

# Verify credentials in .env
# Check IPFS quota/limits
```

---

## Cost Estimation

### Polkadot Cloud Hosting
- **Free Tier:** Up to 10K requests/month
- **Pro Tier:** $29/month (100K requests)
- **Enterprise:** Custom pricing

### Blockchain Costs
- **Astar Shibuya:** FREE (testnet)
- **Astar Mainnet:** ~$0.01 per transaction
- **IPFS Storage:** ~$0.15/GB/month (Pinata)

### Total Monthly Cost (Mainnet)
```
Hosting:        $29
IPFS (10GB):    $1.50
Gas fees:       ~$50 (5K transactions)
---
Total:          ~$80/month
```

---

## Security Checklist

- [ ] Environment variables secured (not in git)
- [ ] SSL/TLS enabled (HTTPS)
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] XSS protection enabled
- [ ] Smart contracts audited
- [ ] Private keys never exposed
- [ ] Regular security updates
- [ ] Monitoring & alerts configured

---

## Next Steps

1. **Deploy to Mainnet:**
   - Switch RPC endpoints to mainnet
   - Deploy contracts to Astar mainnet
   - Update IPFS to production gateway

2. **Custom Domain:**
   - Register domain
   - Configure DNS
   - Update branding

3. **Analytics:**
   - Add Google Analytics
   - Set up Mixpanel
   - Track user behavior

4. **Performance:**
   - Enable CDN caching
   - Optimize images
   - Implement service worker

---

## Support

**Polkadot Cloud:**
- Docs: https://docs.polkadot.cloud
- Discord: https://discord.gg/polkadot
- Support: support@polkadot.cloud

**Polka Ticket:**
- GitHub Issues: https://github.com/hieple7985/polka-ticket/issues
- Email: hieple7985@gmail.com

---

**Deployment Status:** 🔄 In Progress  
**Target URL:** https://polka-ticket.polkadot.cloud  
**Expected Completion:** Within 24 hours
