import {Abi, Address, createPublicClient, formatEther, http} from 'viem'
import {baseSepolia} from 'viem/chains'
import {NextResponse} from 'next/server'
import OperatorAbi from '@/artifacts/operator.abi.json'
import FamiliarsAbi from '@/artifacts/familiars.abi.json'
import {OPERATOR_ADDRESS, FAMILIARS_ADDRESS} from '@/constants'
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

const FamiliarsContract: OperatorContractType = {
  address: FAMILIARS_ADDRESS,
  abi: FamiliarsAbi as Abi,
} as const

// interface RequestBody {
//   tokenIds: number[]
// }

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

    const multicallPayload2 = tokenIds.map((tokenId) => ({
      ...OperatorContract,
      functionName: '_getTba',
      args: [tokenId],
    }))

    const multicallPayload3 = tokenIds.map((tokenId) => ({
      ...FamiliarsContract,
      functionName: 'tokenURI',
      args: [tokenId],
    }))

    const results = await publicClient.multicall({
      contracts: multicallPayload,
    })

    const tbaAddressesResults = await publicClient.multicall({
      contracts: multicallPayload2,
    })

    const metadataResults = await publicClient.multicall({
      contracts: multicallPayload3,
    })

    const metadataObjects = await Promise.all(
      metadataResults.map(async (metadataResult) => {
        if (metadataResult.status === 'success') {
          const metadataUrl = metadataResult.result as string
          try {
            const response = await fetch(metadataUrl)
            if (!response.ok) throw new Error(`Failed to fetch metadata: ${metadataUrl}`)
            return await response.json()
          } catch (error) {
            console.error(`Error fetching metadata: ${metadataUrl}`, error)
            return null
          }
        }
        return null
      })
    )

    // Type check and serialize the results
    const validResults = results
      .map((result, index) => {
        if (result.status === 'success') {
          let serializedStats = serializeBigInt(result.result as NPCStats)
          const tbaAddress = tbaAddressesResults[index].result as string
          const metadata = metadataObjects[index]
          serializedStats = {
            health: serializedStats['0'],
            location: serializedStats['1'],
            coins: formatEther(serializedStats['2']),
            karmic: serializedStats['3'],
            food: serializedStats['4'],
            equipments: serializedStats['5'],
          }

          return {
            ...serializedStats,
            name: getNPCName(tokenIds[index]),
            tokenId: tokenIds[index],
            address: tbaAddress,
            story: metadata.description,
            imageUrl: metadata.image,
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
