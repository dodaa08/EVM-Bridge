import { baseWalletClient } from '../../../utils/viemClient';
import { BridgeBaseAbi } from '../../../contracts/BridgeBase';
import { NextResponse } from 'next/server';
import { baseSepolia } from '../../../utils/viemClient';

const BRIDGE_BASE_ADDRESS = process.env.BridgeBaseCA as `0x${string}`;

export async function POST(req: Request) {
  if (req.method !== 'POST') return NextResponse.json({ error: 'Method not allowed' });

  try {
    const { user, tokenAddress, amount } = await req.json();

    const hash = await baseWalletClient.writeContract({
      address: BRIDGE_BASE_ADDRESS,
      abi: BridgeBaseAbi,
      functionName: 'unlock',
      args: [user, tokenAddress, BigInt(amount)],
      account: process.env.OWNER_ADDRESS as `0x${string}`,
      chain: baseSepolia,
    });

    return NextResponse.json({ hash });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
