import { ethWalletClient } from '../../../utils/viemClient';
import { TokenAbi } from '../../../contracts/Token';
import { NextResponse, NextRequest } from 'next/server';
import { sepolia } from 'viem/chains';

const TOKEN_ADDRESS = process.env.TokenCA as `0x${string}`;

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') return NextResponse.json({ error: 'Method not allowed' });

  try {
    const { to, amount } = await req.json();

    const hash = await ethWalletClient.writeContract({
      address: TOKEN_ADDRESS,
      abi: TokenAbi,
      functionName: 'mint',
      args: [to, BigInt(amount)],
      account: process.env.OWNER_ADDRESS as `0x${string}`,
      chain: sepolia,
    });

    return NextResponse.json({ hash });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
