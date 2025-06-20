import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const tokenAddress = "0xaa009ccB458a0440a102AD84759B1369e1a915D6"; // ✅ token on Polygon

  const Bridge = await ethers.getContractFactory("BridgeEth");
  const bridge = await Bridge.deploy(tokenAddress);
  
  await bridge.waitForDeployment(); // ✅ Best way → handles errors, ensures deployment finished
  console.log(`Eth Bridge deployed to: ${await bridge.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

