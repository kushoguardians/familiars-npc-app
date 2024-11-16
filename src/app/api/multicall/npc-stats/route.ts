import {Abi, Address, createPublicClient, http} from 'viem'
import {baseSepolia} from 'viem/chains'
import {NextResponse} from 'next/server'
import OperatorAbi from '@/artifacts/operator.abi.json'
import {OPERATOR_ADDRESS} from '@/constants'
import {NPCStats} from '@/shared/types'
import {serializeBigInt} from '@/lib/utils/serialized-bigint'

interface OperatorContractType {
  address: Address
  abi: Abi
}

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC),
})

const OperatorContract: OperatorContractType = {
  address: OPERATOR_ADDRESS,
  abi: OperatorAbi as Abi,
} as const

interface RequestBody {
  tokenIds: number[]
}

const getNPCName = (tokenId: number): string => {
  const names: {[key: number]: string} = {
    1: 'Sundo',
    2: 'Duwende',
    3: 'Diwata',
    4: 'Adarna',
  }
  return names[tokenId] || `Unknown NPC ${tokenId}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {tokenIds} = body

    if (!tokenIds?.length || !Array.isArray(tokenIds)) {
      return NextResponse.json({error: 'Invalid input parameters'}, {status: 400})
    }

    const multicallPayload = tokenIds.map((tokenId) => ({
      ...OperatorContract,
      functionName: 'getNPCStats',
      args: [tokenId],
    }))

    const results = await publicClient.multicall({
      contracts: multicallPayload,
    })

    // Type check and serialize the results
    const validResults = results
      .map((result, index) => {
        if (result.status === 'success') {
          let serializedStats = serializeBigInt(result.result as NPCStats)
          serializedStats = {
            health: serializedStats['0'],
            location: serializedStats['1'],
            coins: serializedStats['2'],
            karmic: serializedStats['3'],
            food: serializedStats['4'],
            equipments: serializedStats['5'],
          }

          return {
            ...serializedStats,
            name: getNPCName(tokenIds[index]),
            tokenId: tokenIds[index],
          }
        }
        return null
      })
      .filter((result) => result !== null)

    return NextResponse.json({data: validResults}, {status: 200})
  } catch (error) {
    console.error('Multicall error:', error)
    return NextResponse.json({error: 'Failed to execute multicall'}, {status: 500})
  }
}
