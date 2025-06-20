// import { createPublicClient, createWalletClient, http, parseAbi } from 'viem';
// import { hardhat } from 'viem/chains';
// import { ethers } from "hardhat";
// import { expect } from 'chai';

// describe("BridgeBase (with viem)", function () {
//   let publicClient: any, walletClient: any;
//   let tokenAddress: `0x${string}`, bridgeAddress: `0x${string}`;
//   let owner: any, user: any;

//   beforeEach(async function () {
//     [owner, user] = await ethers.getSigners();

//     const TokenFactory = await ethers.getContractFactory("WrappedToken");
//     const token = await TokenFactory.deploy();
//     await token.deployed();
//     tokenAddress = token.address as unknown as `0x${string}`;

//     const BridgeFactory = await ethers.getContractFactory("BridgeBase");
//     const bridge = await BridgeFactory.deploy();
//     await bridge.deployed();
//     bridgeAddress = bridge.address as unknown as `0x${string}`;

//     publicClient = createPublicClient({ chain: hardhat, transport: http() });
//   });

//   it("should confirm contracts deployed", async () => {
//     expect(tokenAddress).to.be.a("string");
//     expect(bridgeAddress).to.be.a("string");
//   });
// });


