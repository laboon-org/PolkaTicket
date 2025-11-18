#!/usr/bin/env python3
"""
Simple deployment script using web3.py
Works with Python 3.7+
"""

import json
import os
import sys
from pathlib import Path
from web3 import Web3
from solcx import compile_source, install_solc

# Configuration
RPC_URL = "https://rpc.api.moonbase.moonbeam.network"
CHAIN_ID = 1287

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

def compile_contract(contract_path):
    """Compile Solidity contract"""
    print("📦 Compiling NTSTicket contract...\n")
    
    # Install solc 0.8.6
    install_solc('0.8.6')
    
    # Read contract source
    with open(contract_path, 'r') as f:
        source = f.read()
    
    # Compile
    compiled = compile_source(
        source,
        output_values=['abi', 'bin'],
        solc_version='0.8.6',
        optimize=True,
        optimize_runs=200
    )
    
    # Get contract interface
    contract_id = list(compiled.keys())[0]
    contract_interface = compiled[contract_id]
    
    print("✅ Contract compiled successfully!\n")
    return contract_interface['abi'], contract_interface['bin']

def deploy_contract():
    """Deploy contract to Moonbase Alpha"""
    print("🚀 Starting deployment to Moonbase Alpha...\n")
    
    # Load environment
    load_env()
    private_key = os.getenv('PRIVATE_KEY')
    if not private_key:
        print("❌ Error: PRIVATE_KEY not found in .env")
        sys.exit(1)
    
    # Remove 0x prefix if present
    if private_key.startswith('0x'):
        private_key = private_key[2:]
    
    # Connect to network
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    if not w3.is_connected():
        print("❌ Error: Cannot connect to Moonbase Alpha")
        sys.exit(1)
    
    # Get account
    account = w3.eth.account.from_key(private_key)
    print(f"📝 Deploying with account: {account.address}")
    
    # Check balance
    balance = w3.eth.get_balance(account.address)
    balance_eth = w3.from_wei(balance, 'ether')
    print(f"💰 Account balance: {balance_eth} DEV\n")
    
    if balance_eth < 0.1:
        print("⚠️  Warning: Low balance. Get more DEV from https://faucet.moonbeam.network/\n")
    
    # Compile contract
    contract_path = Path(__file__).parent / 'contract' / 'NTSTicket.sol'
    abi, bytecode = compile_contract(contract_path)
    
    # Create contract instance
    Contract = w3.eth.contract(abi=abi, bytecode=bytecode)
    
    print("📦 Deploying NTSTicket contract...")
    print("⏳ This may take 1-2 minutes...\n")
    
    # Build transaction
    nonce = w3.eth.get_transaction_count(account.address)
    
    # Estimate gas
    gas_estimate = Contract.constructor().estimate_gas({'from': account.address})
    gas_price = w3.eth.gas_price
    
    print(f"⛽ Estimated gas: {gas_estimate}")
    print(f"💸 Gas price: {w3.from_wei(gas_price, 'gwei')} Gwei\n")
    
    # Build deploy transaction
    transaction = Contract.constructor().build_transaction({
        'chainId': CHAIN_ID,
        'gas': int(gas_estimate * 1.2),  # Add 20% buffer
        'gasPrice': gas_price,
        'nonce': nonce,
        'from': account.address
    })
    
    # Sign transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
    
    # Send transaction
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"📤 Transaction sent: {tx_hash.hex()}")
    print("⏳ Waiting for confirmation...\n")
    
    # Wait for receipt
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=300)
    
    if tx_receipt['status'] == 1:
        contract_address = tx_receipt['contractAddress']
        print(f"✅ NTSTicket deployed successfully!")
        print(f"📍 Contract address: {contract_address}")
        print(f"🔍 View on Moonscan: https://moonbase.moonscan.io/address/{contract_address}\n")
        
        # Get contract info
        deployed_contract = w3.eth.contract(address=contract_address, abi=abi)
        name = deployed_contract.functions.name().call()
        symbol = deployed_contract.functions.symbol().call()
        owner = deployed_contract.functions.owner().call()
        
        print("📋 Contract Info:")
        print(f"   Name: {name}")
        print(f"   Symbol: {symbol}")
        print(f"   Owner: {owner}\n")
        
        # Save deployment info
        deployment_info = {
            "network": "moonbase-alpha",
            "chainId": CHAIN_ID,
            "rpc": RPC_URL,
            "explorer": "https://moonbase.moonscan.io",
            "contracts": {
                "NTSTicket": {
                    "address": contract_address,
                    "name": name,
                    "symbol": symbol,
                    "owner": owner,
                    "deployedAt": "",
                    "deployer": account.address,
                    "transactionHash": tx_hash.hex()
                }
            }
        }
        
        # Save to file
        info_path = Path(__file__).parent / 'deployment-info.json'
        with open(info_path, 'w') as f:
            json.dump(deployment_info, f, indent=2)
        print(f"💾 Deployment info saved to: {info_path}")
        
        # Save ABI
        abi_path = Path(__file__).parent / 'NTSTicket-abi.json'
        with open(abi_path, 'w') as f:
            json.dump(abi, f, indent=2)
        print(f"💾 ABI saved to: {abi_path}")
        
        print("\n🎉 Deployment completed successfully!")
        print("\n📝 Next steps:")
        print("1. Verify contract on Moonscan")
        print("2. Test minting from UI")
        print("3. Record demo video")
        print("4. Submit to Devpost\n")
        
    else:
        print("❌ Deployment failed!")
        print(f"Transaction receipt: {tx_receipt}")
        sys.exit(1)

if __name__ == "__main__":
    try:
        deploy_contract()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
