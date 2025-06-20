import { ethWalletClient } from '../../../utils/viemClient';
import  BridgeEthAbi  from '../../../contracts/BridgeEth.json';
import { NextResponse } from 'next/server';
import { sepolia } from 'viem/chains';

const BRIDGE_ETH_ADDRESS = process.env.NEXT_PUBLIC_BRIDGE_ETH_A as `0x${string}`;


export async function POST(req: Request) {
  if (req.method !== 'POST') return NextResponse.json({ error: 'Method not allowed' });

  try {
    const { user, amount } = await req.json();

    const hash = await ethWalletClient.writeContract({
      address: BRIDGE_ETH_ADDRESS,
      abi: BridgeEthAbi,
      functionName: 'mintTokens',
      args: [user, BigInt(amount)],
      account: process.env.NEXT_PUBLIC_OWNER_ADDRESS as `0x${string}`,
      chain: sepolia,
    });

    return NextResponse.json({ hash });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}


