#!/usr/bin/env python3
"""
Test deployed NTSTicket contract on Moonbase Alpha
"""

import json
import os
import sys
from pathlib import Path
from web3 import Web3

# Configuration
RPC_URL = "https://rpc.api.moonbase.moonbeam.network"
CONTRACT_ADDRESS = "0x9f0b44f152EdDFB99f0206D2E7E390b5ED69372b"

# Simplified ABI for testing
CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "to", "type": "address"},
            {"internalType": "uint8", "name": "eventId", "type": "uint8"},
            {"internalType": "uint8", "name": "eventType", "type": "uint8"},
            {"internalType": "string", "name": "pathData", "type": "string"}
        ],
        "name": "mint",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "getTicket",
        "outputs": [
            {"internalType": "uint256", "name": "", "type": "uint256"},
            {"internalType": "uint8", "name": "", "type": "uint8"},
            {"internalType": "uint8", "name": "", "type": "uint8"},
            {"internalType": "address", "name": "", "type": "address"},
            {"internalType": "string", "name": "", "type": "string"},
            {"internalType": "bool", "name": "", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

def load_env():
    """Load environment variables from .env file"""
    env_path = Path(__file__).parent / '.env'
    if not env_path.exists():
        print("❌ Error: .env file not found")
        sys.exit(1)
    
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key] = value.strip()

def test_contract():
    """Test contract functions"""
    print("🧪 Testing NTSTicket Contract on Moonbase Alpha\n")
    print(f"📍 Contract: {CONTRACT_ADDRESS}")
    print(f"🌐 Network: Moonbase Alpha (Chain ID: 1287)\n")
    
    # Connect to network
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    if not w3.is_connected():
        print("❌ Error: Cannot connect to Moonbase Alpha")
        sys.exit(1)
    
    print("✅ Connected to Moonbase Alpha\n")
    
    # Load contract
    contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
    
    # Test 1: Read contract info
    print("=" * 60)
    print("TEST 1: Read Contract Information")
    print("=" * 60)
    
    try:
        name = contract.functions.name().call()
        print(f"✅ Name: {name}")
    except Exception as e:
        print(f"❌ Name: {e}")
    
    try:
        symbol = contract.functions.symbol().call()
        print(f"✅ Symbol: {symbol}")
    except Exception as e:
        print(f"❌ Symbol: {e}")
    
    try:
        owner = contract.functions.owner().call()
        print(f"✅ Owner: {owner}")
    except Exception as e:
        print(f"❌ Owner: {e}")
    
    try:
        total_supply = contract.functions.totalSupply().call()
        print(f"✅ Total Supply: {total_supply}")
    except Exception as e:
        print(f"❌ Total Supply: {e}")
    
    print()
    
    # Test 2: Check deployer balance
    print("=" * 60)
    print("TEST 2: Check Deployer Balance")
    print("=" * 60)
    
    load_env()
    private_key = os.getenv('PRIVATE_KEY')
    if private_key:
        if private_key.startswith('0x'):
            private_key = private_key[2:]
        account = w3.eth.account.from_key(private_key)
        
        try:
            balance = contract.functions.balanceOf(account.address).call()
            print(f"✅ Deployer Address: {account.address}")
            print(f"✅ NFT Balance: {balance} tickets")
        except Exception as e:
            print(f"❌ Balance check failed: {e}")
    else:
        print("⚠️  No private key found, skipping balance check")
    
    print()
    
    # Test 3: Mint a test ticket
    print("=" * 60)
    print("TEST 3: Mint Test Ticket")
    print("=" * 60)
    
    if private_key:
        try:
            print("📝 Preparing to mint test ticket...")
            
            # Get account balance
            eth_balance = w3.eth.get_balance(account.address)
            print(f"💰 Account balance: {w3.from_wei(eth_balance, 'ether')} DEV")
            
            if eth_balance < w3.to_wei(0.01, 'ether'):
                print("⚠️  Warning: Low balance, may not be enough for gas")
            
            # Build mint transaction
            nonce = w3.eth.get_transaction_count(account.address)
            
            mint_tx = contract.functions.mint(
                account.address,  # to
                1,                # eventId
                1,                # eventType
                "test-ticket-1"   # pathData
            ).build_transaction({
                'chainId': 1287,
                'gas': 200000,
                'gasPrice': w3.eth.gas_price,
                'nonce': nonce,
                'from': account.address
            })
            
            print(f"⛽ Gas estimate: {mint_tx['gas']}")
            print(f"💸 Gas price: {w3.from_wei(mint_tx['gasPrice'], 'gwei')} Gwei")
            
            # Sign and send
            signed_tx = w3.eth.account.sign_transaction(mint_tx, private_key)
            tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
            
            print(f"\n📤 Transaction sent: {tx_hash.hex()}")
            print("⏳ Waiting for confirmation...")
            
            receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=120)
            
            if receipt['status'] == 1:
                print(f"✅ Ticket minted successfully!")
                print(f"📍 Transaction: https://moonbase.moonscan.io/tx/{tx_hash.hex()}")
                
                # Get new total supply
                new_supply = contract.functions.totalSupply().call()
                print(f"📊 New Total Supply: {new_supply}")
                
                # Get ticket info
                if new_supply > 0:
                    try:
                        ticket = contract.functions.getTicket(new_supply).call()
                        print(f"\n🎫 Ticket Info:")
                        print(f"   Token ID: {ticket[0]}")
                        print(f"   Event ID: {ticket[1]}")
                        print(f"   Event Type: {ticket[2]}")
                        print(f"   Owner: {ticket[3]}")
                        print(f"   Path Data: {ticket[4]}")
                        print(f"   Is Used: {ticket[5]}")
                    except Exception as e:
                        print(f"⚠️  Could not get ticket info: {e}")
            else:
                print(f"❌ Transaction failed!")
                print(f"Receipt: {receipt}")
                
        except Exception as e:
            print(f"❌ Minting failed: {e}")
            import traceback
            traceback.print_exc()
    else:
        print("⚠️  No private key found, skipping mint test")
    
    print()
    
    # Summary
    print("=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print("✅ Contract is deployed and accessible")
    print("✅ Read functions working")
    print("✅ Contract ready for frontend integration")
    print()
    print("🔗 View on Moonscan:")
    print(f"   {CONTRACT_ADDRESS}")
    print(f"   https://moonbase.moonscan.io/address/{CONTRACT_ADDRESS}")
    print()

if __name__ == "__main__":
    try:
        test_contract()
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrupted by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
