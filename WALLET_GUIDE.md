# Wallet Testing Guide - Polka Ticket v1.1.0-stable

## 🎯 Recommended Wallet: Polkadot.js Extension

**Polka Ticket** is designed to work with **Polkadot.js Extension** for the best experience on Astar Network.

---

## 📦 Installation

### 1. Install Polkadot.js Extension

**Chrome/Brave:**
https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd

**Firefox:**
https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/

### 2. Create or Import Wallet

```
1. Click extension icon in browser
2. Click "+" to create new account
3. Save your 12-word seed phrase (IMPORTANT!)
4. Set account name (e.g., "Polka Ticket Test")
5. Set password
6. Click "Add the account"
```

---

## 🌐 Network Configuration

### Switch to Astar Shibuya Testnet

**Option A: Via Polkadot.js Apps**

1. Visit: https://polkadot.js.org/apps/
2. Click top-left network dropdown
3. Select "Test Networks" → "Shibuya (Astar Testnet)"
4. Click "Switch"

**Option B: Via Astar Portal**

1. Visit: https://portal.astar.network/
2. Click "Connect Wallet"
3. Select "Polkadot.js Extension"
4. Switch network to "Shibuya Testnet"

---

## 💰 Get Testnet Tokens (SBY)

### Method 1: Astar Portal Faucet

```
1. Visit: https://portal.astar.network/shibuya-testnet/assets
2. Connect your Polkadot.js wallet
3. Click "Faucet" button
4. Request tokens (you'll get ~1 SBY)
5. Wait 10-30 seconds for confirmation
```

### Method 2: Discord Faucet

```
1. Join Astar Discord: https://discord.gg/astarnetwork
2. Go to #shibuya-faucet channel
3. Type: /drip <your_wallet_address>
4. Bot will send you testnet tokens
```

### Method 3: Matrix Faucet

```
1. Join: https://matrix.to/#/#shibuya-faucet:matrix.org
2. Send message: !drip <your_wallet_address>
3. Wait for bot response
```

---

## 🔗 Connect to Polka Ticket

### Step 1: Open App

```
http://localhost:3000
```

### Step 2: Connect Wallet

```
1. App will auto-detect Polkadot.js Extension
2. Click "Connect Wallet" button
3. Extension popup will appear
4. Select your account
5. Click "Yes, allow this application access"
6. Done! You're connected
```

### Step 3: Verify Connection

```
✅ Wallet address should appear in header
✅ Account balance should show (in SBY)
✅ Network should show "Shibuya"
```

---

## 🎫 Test Core Features

### 1. Browse Events

```
- Homepage shows available events
- Click on any event to view details
- Check event metadata (date, location, price)
```

### 2. Purchase Ticket (Mint NFT)

```
1. Select an event
2. Click "Purchase Ticket"
3. Review transaction details
4. Click "Confirm"
5. Sign transaction in Polkadot.js popup
6. Wait for confirmation (~10-20 seconds)
7. Ticket NFT minted to your wallet!
```

### 3. View My Tickets

```
1. Navigate to "My Tickets" page
2. See all your purchased tickets
3. Each ticket is an NFT with unique ID
4. Click ticket to view details
```

### 4. Generate QR Code

```
1. Open a ticket
2. Click "Show QR Code"
3. QR code contains ticket ID + proof
4. Can be scanned for verification
```

### 5. Cross-Chain Transfer (XCM)

```
1. Select a ticket
2. Click "Transfer to Moonbeam"
3. Enter destination address (Moonbeam format)
4. Sign XCM transaction
5. Wait 1-2 minutes for cross-chain confirmation
6. Ticket transferred to Moonbeam!
```

### 6. Privacy Check-In

```
1. Open ticket details
2. Click "Generate Privacy Proof"
3. Zero-knowledge proof created
4. Use QR scanner to verify
5. Anonymous verification (no wallet address exposed)
```

### 7. Governance Voting

```
1. Navigate to "Governance" page
2. View active proposals
3. Click "Vote Yes/No/Abstain"
4. Sign transaction
5. Vote recorded on-chain
```

---

## 🔧 Troubleshooting

### Issue: Wallet Not Detected

**Solution:**
```
1. Ensure Polkadot.js Extension is installed
2. Refresh the page (Ctrl+R / Cmd+R)
3. Check extension is enabled for localhost
4. Try different browser (Chrome recommended)
```

### Issue: No Testnet Tokens

**Solution:**
```
1. Check balance in Astar Portal
2. Request from faucet again (wait 24h between requests)
3. Try alternative faucet (Discord/Matrix)
4. Ask in Astar Discord #shibuya-faucet
```

### Issue: Transaction Fails

**Solution:**
```
1. Check you have enough SBY for gas
2. Verify network is Shibuya (not mainnet)
3. Try increasing gas limit
4. Check RPC endpoint is responsive
5. Wait a few seconds and retry
```

### Issue: Cross-Chain Transfer Stuck

**Solution:**
```
1. XCM can take 1-2 minutes (be patient)
2. Check both chains (Astar + Moonbeam)
3. Verify XCM channel is open
4. Check testnet status: https://status.astar.network/
```

### Issue: NFT Not Showing

**Solution:**
```
1. Wait 30 seconds after minting
2. Refresh "My Tickets" page
3. Check transaction on Subscan
4. Verify contract address is correct
```

---

## 🌟 Wallet Features Used

### Polkadot.js Extension Features:

1. **Account Management**
   - Create/import accounts
   - Multiple accounts support
   - Seed phrase backup

2. **Transaction Signing**
   - Sign NFT minting transactions
   - Sign XCM cross-chain transfers
   - Sign governance votes

3. **Network Switching**
   - Shibuya testnet
   - Moonbase Alpha testnet
   - Auto-detect network

4. **Balance Display**
   - SBY balance
   - Token balances
   - Transaction history

---

## 📊 Supported Wallets

### Primary (Recommended):
- ✅ **Polkadot.js Extension** - Full support, best experience

### Alternative (Partial Support):
- ⚠️ **Talisman** - Works but limited features
- ⚠️ **SubWallet** - Works but needs manual config
- ⚠️ **Nova Wallet** - Mobile only, limited testing

### Not Supported:
- ❌ MetaMask - Not compatible with Substrate chains
- ❌ WalletConnect - Not implemented yet
- ❌ Ledger - Hardware wallet support coming soon

---

## 🔐 Security Best Practices

### DO:
- ✅ Save seed phrase offline (paper backup)
- ✅ Use strong password for extension
- ✅ Verify transaction details before signing
- ✅ Test with small amounts first
- ✅ Keep extension updated

### DON'T:
- ❌ Share seed phrase with anyone
- ❌ Store seed phrase digitally (screenshots, cloud)
- ❌ Use same password as other accounts
- ❌ Sign transactions you don't understand
- ❌ Use mainnet wallet for testnet

---

## 🚀 Quick Start Checklist

- [ ] Install Polkadot.js Extension
- [ ] Create test wallet
- [ ] Save seed phrase (offline)
- [ ] Switch to Shibuya testnet
- [ ] Get SBY tokens from faucet
- [ ] Open Polka Ticket app
- [ ] Connect wallet
- [ ] Verify balance shows
- [ ] Purchase first ticket
- [ ] View ticket in "My Tickets"
- [ ] Generate QR code
- [ ] Test cross-chain transfer (optional)
- [ ] Vote on governance proposal (optional)

---

## 📞 Support

**Need Help?**

- **Polkadot.js Extension:** https://polkadot.js.org/docs/extension/
- **Astar Network:** https://docs.astar.network/
- **Discord:** https://discord.gg/astarnetwork
- **Polka Ticket Issues:** https://github.com/hieple7985/polka-ticket/issues

---

## 🎯 Testing Scenarios

### Scenario 1: Basic Flow (5 minutes)
```
1. Connect wallet
2. Browse events
3. Purchase 1 ticket
4. View in "My Tickets"
5. Generate QR code
```

### Scenario 2: Cross-Chain (10 minutes)
```
1. Purchase ticket on Astar
2. Transfer to Moonbeam via XCM
3. Verify on Moonbeam
4. Transfer back to Astar
```

### Scenario 3: Privacy (5 minutes)
```
1. Purchase ticket
2. Generate privacy proof
3. Scan QR code
4. Verify anonymously
```

### Scenario 4: Governance (5 minutes)
```
1. View proposals
2. Vote on proposal
3. Check vote recorded
4. View voting stats
```

---

**Version:** v1.1.0-stable  
**Last Updated:** Nov 16, 2025  
**Network:** Astar Shibuya Testnet  
**Recommended Wallet:** Polkadot.js Extension

🎫 **Happy Testing!**
