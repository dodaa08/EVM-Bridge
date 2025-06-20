import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const tokenAddress = "0xaa009ccB458a0440a102AD84759B1369e1a915D6";

  const BridgeBase = await ethers.getContractFactory("BridgeBase");
  const bridge = await BridgeBase.deploy(tokenAddress);

  await bridge.waitForDeployment(); // ✅ FIX: ethers v6 compatible

  console.log("BridgeBase deployed to:", await bridge.getAddress()); // ✅ FIX: ethers v6 compatible
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
