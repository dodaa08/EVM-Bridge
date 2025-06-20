import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("WrappedTokenBase", "WBASE");
  await token.waitForDeployment(); // ✅ FIX here

  console.log("Token deployed at:", await token.getAddress()); // ✅ ethers v6 uses getAddress()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
