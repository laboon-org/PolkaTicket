# Moonbase Alpha Deployment Guide

## 🚀 Quick Start (30 minutes)

### Step 1: Get DEV Tokens (5 minutes)

1. **Install Polkadot.js Extension**
   - Chrome: https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/

2. **Create/Import Wallet**
   - Open Polkadot.js Extension
   - Create new account OR import existing
   - **IMPORTANT:** Save your mnemonic phrase securely!

3. **Get DEV Tokens**
   - Visit: https://faucet.moonbeam.network/
   - Connect your wallet
   - Select "Moonbase Alpha"
   - Click "Request DEV"
   - Wait 10 seconds
   - You should receive ~1 DEV

4. **Verify Balance**
   - Check on Moonscan: https://moonbase.moonscan.io/
   - Enter your address
   - Should show ~1 DEV balance

---

### Step 2: Setup Environment (10 minutes)

1. **Install Dependencies**
```bash
cd /Volumes/Extended\ HD/Work_Extended/opp_2025/devpost/hackathon/master_devpost/projects/010-polka-ticket/3_dev/contract/__archived/contract_evm

# Install Hardhat and dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Install other dependencies
npm install dotenv
```

2. **Export Your Mnemonic**
```bash
# In Polkadot.js Extension:
# 1. Click on your account
# 2. Click the 3 dots menu
# 3. Select "Export Account"
# 4. Enter password
# 5. Copy the mnemonic phrase (12 or 24 words)
```

3. **Create .env File**
```bash
# Copy example
cp .env.example .env

# Edit .env file
nano .env

# Add your mnemonic:
MNEMONIC="your twelve word mnemonic phrase here"

# Save and exit (Ctrl+X, Y, Enter)
```

4. **Verify Setup**
```bash
# Test Hardhat
npx hardhat --version

# Should show: Hardhat version 2.x.x
```

---

### Step 3: Deploy Contract (10 minutes)

1. **Compile Contracts**
```bash
npx hardhat compile

# Should see:
# Compiled 1 Solidity file successfully
```

2. **Deploy to Moonbase**
```bash
npx hardhat run scripts/deploy.js --network moonbase

# Expected output:
# 🚀 Starting deployment to Moonbase Alpha...
# 📝 Deploying contracts with account: 0x...
# 💰 Account balance: 1.0 DEV
# 📦 Deploying NTSTicket contract...
# ✅ NTSTicket deployed to: 0x...
# 🔍 Verify on Moonscan: https://moonbase.moonscan.io/address/0x...
```

3. **Save Contract Address**
```bash
# Contract address will be saved to:
# - deployment-info.json
# - ../../../front/src/config/contracts.json

# Copy the address for later use
```

4. **Verify on Moonscan**
```bash
# Visit the Moonscan URL from deployment output
# Should see:
# - Contract creation transaction
# - Contract code
# - Transaction history
```

---

### Step 4: Test Contract (5 minutes)

1. **Run Test Script**
```bash
npx hardhat run scripts/test-contract.js --network moonbase

# Expected output:
# 🧪 Testing NTSTicket contract...
# 📋 Test 1: Reading contract info...
#    Name: PolkaTicket
#    Symbol: PKT
#    ✅ Read operations successful
# 🎫 Test 2: Minting a test ticket...
#    ✅ Ticket minted successfully
# 💼 Test 3: Checking balance...
#    Balance: 1 tickets
#    ✅ Balance check successful
# 🎉 All tests completed!
```

2. **Verify on Moonscan**
```bash
# Check your address on Moonscan
# Should see:
# - Minting transaction
# - NFT balance: 1
```

---

## 📋 Troubleshooting

### Issue: "Insufficient funds"
**Solution:**
```bash
# Request more DEV from faucet
# Visit: https://faucet.moonbeam.network/
# Wait 24 hours if daily limit reached
```

### Issue: "Cannot find module 'hardhat'"
**Solution:**
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### Issue: "Invalid mnemonic"
**Solution:**
```bash
# Check .env file
# Mnemonic should be 12 or 24 words
# No extra spaces or quotes inside the string
# Format: MNEMONIC="word1 word2 word3 ..."
```

### Issue: "Network error"
**Solution:**
```bash
# Check internet connection
# Try alternative RPC:
# wss://wss.api.moonbase.moonbeam.network
```

### Issue: "Transaction failed"
**Solution:**
```bash
# Check gas limit in hardhat.config.js
# Increase gas: 5000000 -> 8000000
# Check balance: should have > 0.1 DEV
```

---

## 🎯 Success Checklist

- [ ] Polkadot.js Extension installed
- [ ] Wallet created and funded with DEV
- [ ] Hardhat installed
- [ ] .env file configured with mnemonic
- [ ] Contracts compiled successfully
- [ ] NTSTicket deployed to Moonbase
- [ ] Contract verified on Moonscan
- [ ] Test minting successful
- [ ] Contract address saved

---

## 📝 Next Steps

After successful deployment:

1. **Update Frontend**
   - Contract address already saved to `front/src/config/contracts.json`
   - Update RPC endpoint in frontend
   - Test minting from UI

2. **Record Demo**
   - Show contract on Moonscan
   - Demonstrate minting from UI
   - Show transaction confirmation
   - Display NFT in wallet

3. **Take Screenshots**
   - Contract on Moonscan
   - Successful transaction
   - Minted NFT
   - Frontend UI

4. **Submit to Devpost**
   - Upload demo video
   - Add screenshots
   - Include contract address
   - Link to Moonscan

---

## 🔗 Useful Links

- **Moonbase Faucet:** https://faucet.moonbeam.network/
- **Moonscan Explorer:** https://moonbase.moonscan.io/
- **Moonbeam Docs:** https://docs.moonbeam.network/
- **Hardhat Docs:** https://hardhat.org/docs
- **Polkadot.js Extension:** https://polkadot.js.org/extension/

---

## 💡 Tips

1. **Save your mnemonic securely** - Never share it or commit to git
2. **Keep some DEV** - Don't spend all on gas fees
3. **Test locally first** - Use Hardhat network for testing
4. **Verify transactions** - Always check on Moonscan
5. **Document everything** - Save contract addresses and transaction hashes

---

**Ready to deploy? Start with Step 1!** 🚀
