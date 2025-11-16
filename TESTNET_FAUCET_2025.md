# 💰 Testnet Faucet Guide 2025 - Get SBY Tokens

**Updated:** Nov 16, 2025  
**Network:** Shibuya Testnet (Astar)  
**Token:** SBY (Shibuya)

---

## 🎯 Quick Summary

**Need:** 1-5 SBY tokens for testing  
**Best Method:** Multiple faucets (try all if one fails)  
**Time:** 5-10 minutes total

---

## 🚀 Method 1: Astar Portal Faucet

### Option A: New Portal (2024+)
```
https://portal.astar.network/shibuya-testnet/assets
```

**Steps:**
1. Connect Polkadot.js wallet
2. Switch to Shibuya network
3. Click "Faucet" button
4. Confirm transaction
5. Wait 30 seconds → Get ~1 SBY

**Limit:** 1 request / 24 hours

---

### Option B: Direct Faucet URL
```
https://portal.astar.network/shibuya-testnet/faucet
```

Try this if the Assets page doesn't show faucet button.

---

## 💬 Method 2: Discord Faucet (RECOMMENDED)

### Step 1: Join Discord
```
https://discord.gg/astarnetwork
```

### Step 2: Find Channel
- Server: **Astar Network**
- Category: **TESTNET** or **DEVELOPER**
- Channel: **#shibuya-faucet**

### Step 3: Request Tokens
```
/drip YOUR_WALLET_ADDRESS
```

**Example:**
```
/drip 5FCwde1dukCfPCpe7WSUx7oRjazwaA8VfAPmLkWhtoZYk261
```

**Response Time:** 10-60 seconds  
**Amount:** ~1 SBY  
**Limit:** Once per 24 hours

---

## 🌐 Method 3: Matrix Faucet

### Step 1: Join Matrix
```
https://matrix.to/#/#shibuya-faucet:matrix.org
```

Or search for: `#shibuya-faucet:matrix.org`

### Step 2: Send Command
```
!drip YOUR_WALLET_ADDRESS
```

**Example:**
```
!drip 5FCwde1dukCfPCpe7WSUx7oRjazwaA8VfAPmLkWhtoZYk261
```

---

## 🔗 Method 4: Alternative Faucets

### Chainlist Faucet
```
https://faucets.chain.link/
```
- Search for "Shibuya"
- Connect wallet
- Request tokens

### Alchemy Faucet
```
https://www.alchemy.com/faucets/astar-shibuya
```
- May require account signup
- Higher limits sometimes

---

## 🆘 Method 5: Community Request

### If All Faucets Fail:

**Option A: Astar Discord - General Help**
- Channel: `#general` or `#support`
- Message: "Hi! I need testnet SBY tokens for development. All faucets are empty. Can someone send me 1-2 SBY? My address: [YOUR_ADDRESS]"
- Usually someone from community helps

**Option B: Astar Forum**
```
https://forum.astar.network/
```
- Create post in Developer category
- Explain your project
- Request testnet tokens

**Option C: Twitter/X**
- Tweet: "@AstarNetwork I need testnet SBY for development. Address: [YOUR_ADDRESS]"
- Tag: #AstarNetwork #Shibuya

---

## 📍 Your Wallet Address

**To get your address:**

### From Polkadot.js Extension:
1. Click extension icon
2. Click your account name
3. Address shows below (starts with `5...` or similar)
4. Click to copy

### From Astar Portal:
1. Connect wallet
2. Address shows in top right
3. Click to copy

**Example format:**
```
5FCwde1dukCfPCpe7WSUx7oRjazwaA8VfAPmLkWhtoZYk261
```

---

## ✅ Verify You Got Tokens

### Method 1: Astar Portal
1. Go to: https://portal.astar.network/
2. Switch to Shibuya
3. Check balance in top right
4. Should show: `X.XX SBY`

### Method 2: Subscan Explorer
```
https://shibuya.subscan.io/
```
1. Search your address
2. Check balance
3. View transaction history

### Method 3: Polkadot.js Apps
```
https://polkadot.js.org/apps/?rpc=wss://shibuya.public.blastapi.io#/accounts
```
1. Your address should show in list
2. Balance column shows SBY amount

---

## 💡 How Much Do You Need?

### For Basic Testing:
- **0.1 SBY** - A few transactions
- **1 SBY** - Comfortable testing
- **5 SBY** - Extensive testing

### Gas Costs (Approximate):
- Simple transfer: ~0.001 SBY
- NFT mint: ~0.01-0.05 SBY
- Smart contract deploy: ~0.1-0.5 SBY
- Contract interaction: ~0.005-0.02 SBY

### For Polka Ticket:
- **Deploy contracts:** ~0.5 SBY
- **Mint tickets:** ~0.1 SBY per ticket
- **XCM transfer:** ~0.05 SBY
- **Total recommended:** 2-3 SBY

---

## 🔄 Multiple Addresses Strategy

**If you need more tokens:**

1. Create 2-3 wallet addresses
2. Request from faucet for each address
3. Transfer all to main address
4. Total: 2-3 SBY (enough for testing)

**How to create new address:**
- Polkadot.js Extension → Click `+` → Create new account

---

## 🚨 Troubleshooting

### Faucet says "Already claimed"
- **Wait:** 24 hours cooldown
- **Try:** Different faucet method
- **Alternative:** Use different wallet address

### Faucet is empty/down
- **Try:** All 5 methods above
- **Discord:** Ask community for help
- **Wait:** Faucets refill periodically

### Tokens not arriving
- **Wait:** Can take up to 5 minutes
- **Check:** Correct network (Shibuya)
- **Verify:** Address is correct
- **Explorer:** Check on Subscan

### Wrong network
- **Astar Mainnet** ≠ **Shibuya Testnet**
- Make sure you're on **Shibuya**
- Portal URL should say "shibuya-testnet"

---

## 📚 Additional Resources

### Official Links:
- **Astar Portal:** https://portal.astar.network/
- **Astar Docs:** https://docs.astar.network/
- **Discord:** https://discord.gg/astarnetwork
- **Shibuya Explorer:** https://shibuya.subscan.io/

### RPC Endpoints:
```
wss://shibuya.public.blastapi.io
wss://shibuya-rpc.dwellir.com
wss://rpc.shibuya.astar.network
```

### Chain Info:
- **Network:** Shibuya Testnet
- **Type:** Parachain (Polkadot)
- **Chain ID:** 81
- **Token:** SBY
- **Decimals:** 18

---

## 🎯 Quick Start for Polka Ticket

### 1. Get Tokens (Choose one):
```bash
# Option A: Astar Portal
https://portal.astar.network/shibuya-testnet/assets → Faucet

# Option B: Discord
/drip YOUR_ADDRESS in #shibuya-faucet

# Option C: Matrix
!drip YOUR_ADDRESS in #shibuya-faucet:matrix.org
```

### 2. Verify Balance:
```bash
# Check on portal
https://portal.astar.network/ → Shibuya → Check balance
```

### 3. Start Testing:
```bash
# Connect wallet on Polka Ticket
https://polka-ticket-ii1x7sid7-hles-projects.vercel.app

# Test features:
- Mint NFT ticket
- Transfer ticket
- XCM cross-chain
- Marketplace
```

---

## 💪 Pro Tips

### Tip 1: Multiple Faucets
Don't rely on one faucet. Try all methods to maximize tokens.

### Tip 2: Community is Helpful
Astar community is very active. Don't hesitate to ask for help.

### Tip 3: Save Some Tokens
Keep 0.5 SBY as reserve for gas fees.

### Tip 4: Test Incrementally
Start with simple transactions before complex ones.

### Tip 5: Document Issues
If something fails, note the error for debugging.

---

## 📞 Need Help?

### Astar Discord:
- **General:** #general
- **Developer:** #dev-chat
- **Faucet:** #shibuya-faucet
- **Support:** #support

### Polka Ticket Team:
- **GitHub Issues:** Report problems
- **Documentation:** Check guides
- **Community:** Ask questions

---

## ✅ Checklist

Before starting development:

- [ ] Polkadot.js Extension installed
- [ ] Wallet created with address
- [ ] Joined Astar Discord
- [ ] Requested tokens from faucet
- [ ] Verified tokens received (check balance)
- [ ] Connected wallet to Astar Portal
- [ ] Switched to Shibuya network
- [ ] Ready to test Polka Ticket!

---

**Good luck getting your testnet tokens!** 🚀

**Remember:** Testnet tokens have NO value. They're free and for testing only.

**Questions?** Ask in Astar Discord or check documentation.
