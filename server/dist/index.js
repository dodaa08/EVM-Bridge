"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const provider = new ethers_1.JsonRpcProvider("https://mainnet.infura.io/v3/508898ecaa0a478cacc55da14648d302");
function poolBlock(blockNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Starting to fetch logs for block: ${blockNumber}`);
        try {
            const logs = yield provider.getLogs({
                address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                fromBlock: blockNumber,
                toBlock: blockNumber,
                topics: [
                    (0, ethers_1.id)("Transfer(address, address, uint256)")
                ]
            });
            console.log(`Fetched ${logs.length} logs for the USDT Transactions in block ${blockNumber}.`);
            if (logs.length > 0) {
                console.log("Logs:", logs);
            }
            else {
                console.log("No logs found for this block.");
            }
        }
        catch (error) {
            console.error("Error fetching logs:", error);
        }
    });
}
poolBlock(22626956);
