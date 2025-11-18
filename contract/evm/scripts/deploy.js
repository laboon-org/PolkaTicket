const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("🚀 Starting deployment to Moonbase Alpha...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  const balance = await deployer.getBalance();
  console.log("💰 Account balance:", hre.ethers.utils.formatEther(balance), "DEV\n");

  if (balance.lt(hre.ethers.utils.parseEther("0.1"))) {
    console.warn("⚠️  Warning: Low balance. Get more DEV from https://faucet.moonbeam.network/\n");
  }

  // Deploy NTSTicket
  console.log("📦 Deploying NTSTicket contract...");
  const NTSTicket = await hre.ethers.getContractFactory("NTSTicket");
  const ticket = await NTSTicket.deploy();
  await ticket.deployed();
  
  console.log("✅ NTSTicket deployed to:", ticket.address);
  console.log("🔍 Verify on Moonscan:", `https://moonbase.moonscan.io/address/${ticket.address}\n`);

  // Wait for a few block confirmations
  console.log("⏳ Waiting for block confirmations...");
  await ticket.deployTransaction.wait(3);
  console.log("✅ Confirmed!\n");

  // Get contract info
  const name = await ticket.name();
  const symbol = await ticket.symbol();
  const owner = await ticket.owner();
  
  console.log("📋 Contract Info:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Owner:", owner);
  console.log("");

  // Save deployment info
  const deploymentInfo = {
    network: "moonbase-alpha",
    chainId: 1287,
    rpc: "https://rpc.api.moonbase.moonbeam.network",
    explorer: "https://moonbase.moonscan.io",
    contracts: {
      NTSTicket: {
        address: ticket.address,
        name: name,
        symbol: symbol,
        owner: owner,
        deployedAt: new Date().toISOString(),
        deployer: deployer.address,
        transactionHash: ticket.deployTransaction.hash
      }
    }
  };

  // Save to contract directory
  const contractInfoPath = path.join(__dirname, '../deployment-info.json');
  fs.writeFileSync(contractInfoPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", contractInfoPath);

  // Save to frontend config
  const frontendConfigPath = path.join(__dirname, '../../../front/src/config/contracts.json');
  const frontendConfig = {
    network: 'moonbase-alpha',
    chainId: 1287,
    rpc: 'https://rpc.api.moonbase.moonbeam.network',
    explorer: 'https://moonbase.moonscan.io',
    ticketNFT: ticket.address,
    deployedAt: new Date().toISOString()
  };
  
  try {
    fs.mkdirSync(path.dirname(frontendConfigPath), { recursive: true });
    fs.writeFileSync(frontendConfigPath, JSON.stringify(frontendConfig, null, 2));
    console.log("💾 Frontend config saved to:", frontendConfigPath);
  } catch (error) {
    console.warn("⚠️  Could not save frontend config:", error.message);
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📝 Next steps:");
  console.log("1. Verify contract on Moonscan");
  console.log("2. Update frontend with contract address");
  console.log("3. Test minting from UI");
  console.log("4. Record demo video\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
