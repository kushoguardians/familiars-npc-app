import {Abi, createPublicClient, http} from 'viem'
import {baseSepolia} from 'viem/chains'
import {NextResponse} from 'next/server'
import FamiliarsItemsAbi from '@/artifacts/familiars-items.abi.json'
import {FAMILIARS_ITEMS_ADDRESS} from '@/constants'
import {serializeBigInt} from '@/lib/utils/serialized-bigint'

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {account, id} = body

    const balance = await publicClient.readContract({
      abi: FamiliarsItemsAbi as Abi,
      address: FAMILIARS_ITEMS_ADDRESS,
      functionName: 'balanceOf',
      args: [account, id],
    })

    const serializedBalance = serializeBigInt(balance)

    return NextResponse.json({data: serializedBalance}, {status: 200})
  } catch (error) {
    console.error('Multicall error:', error)
    return NextResponse.json({error: 'Failed to execute multicall'}, {status: 500})
  }
}
