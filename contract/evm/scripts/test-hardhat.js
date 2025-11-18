const hre = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🧪 Testing NTSTicket contract...\n");

  // Get contract address from deployment info
  const deploymentInfo = JSON.parse(fs.readFileSync('./deployment-info.json', 'utf8'));
  const contractAddress = deploymentInfo.contracts.NTSTicket.address;

  console.log("📍 Contract address:", contractAddress);

  // Get contract instance
  const NTSTicket = await hre.ethers.getContractFactory("NTSTicket");
  const ticket = NTSTicket.attach(contractAddress);

  // Get signer
  const [signer] = await hre.ethers.getSigners();
  console.log("👤 Testing with account:", signer.address, "\n");

  // Test 1: Read contract info
  console.log("📋 Test 1: Reading contract info...");
  const name = await ticket.name();
  const symbol = await ticket.symbol();
  const owner = await ticket.owner();
  const totalSupply = await ticket.totalSupply();
  
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Owner:", owner);
  console.log("   Total Supply:", totalSupply.toString());
  console.log("   ✅ Read operations successful\n");

  // Test 2: Mint a ticket
  console.log("🎫 Test 2: Minting a test ticket...");
  try {
    const tx = await ticket.mint(
      signer.address,  // to
      1,               // eventId
      1,               // eventType
      "test-ticket-1"  // pathData
    );
    console.log("   Transaction hash:", tx.hash);
    console.log("   Waiting for confirmation...");
    await tx.wait();
    console.log("   ✅ Ticket minted successfully\n");

    // Check new total supply
    const newSupply = await ticket.totalSupply();
    console.log("   New Total Supply:", newSupply.toString());
    
    // Get ticket info
    const ticketInfo = await ticket.getTicket(newSupply);
    console.log("   Ticket Info:");
    console.log("     Token ID:", ticketInfo[0].toString());
    console.log("     Event ID:", ticketInfo[1]);
    console.log("     Event Type:", ticketInfo[2]);
    console.log("     Owner:", ticketInfo[3]);
    console.log("     Path Data:", ticketInfo[4]);
    console.log("     Is Used:", ticketInfo[5]);
    console.log("");
  } catch (error) {
    console.error("   ❌ Minting failed:", error.message, "\n");
  }

  // Test 3: Check balance
  console.log("💼 Test 3: Checking balance...");
  const balance = await ticket.balanceOf(signer.address);
  console.log("   Balance:", balance.toString(), "tickets");
  console.log("   ✅ Balance check successful\n");

  console.log("🎉 All tests completed!");
  console.log("\n📝 Contract is ready for frontend integration!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Testing failed:", error);
    process.exit(1);
  });
