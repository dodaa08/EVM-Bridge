// /pages/api/bridge/lock.ts
import { NextResponse } from 'next/server';
import { baseWalletClient } from '../../../utils/viemClient';
import BridgeBaseAbi from '../../../contracts/BridgeBase.json';
import { baseSepolia } from '../../../utils/viemClient';

const BRIDGE_BASE_ADDRESS = process.env.NEXT_PUBLIC_BRIDGE_BASE_A as `0x${string}`;

export async function POST(req: Request) {
  const { tokenAddress, amount, user } = await req.json();

  const hash = await baseWalletClient.writeContract({
    address: BRIDGE_BASE_ADDRESS,
    abi: BridgeBaseAbi,
    functionName: 'lock',
    args: [tokenAddress, BigInt(amount)],
    account: user,
    chain: baseSepolia,
  });

  return NextResponse.json({ hash });
}




