import { JsonRpcProvider, id } from "ethers";

const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/508898ecaa0a478cacc55da14648d302");

async function poolBlock(blockNumber: number) {
    console.log(`Starting to fetch logs for block: ${blockNumber}`);
    try {
        const logs = await provider.getLogs({
            address : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            fromBlock : blockNumber,
            toBlock : blockNumber,
            topics : [
                id("Transfer(address, address, uint256)")
            ]
        });

        console.log(`Fetched ${logs.length} logs for the USDT Transactions in block ${blockNumber}.`);
        if (logs.length > 0) {
            console.log("Logs:", logs);
        } else {
            console.log("No logs found for this block.");
        }
    } catch (error) {
        console.error("Error fetching logs:", error);
    }
}

poolBlock(22626956);