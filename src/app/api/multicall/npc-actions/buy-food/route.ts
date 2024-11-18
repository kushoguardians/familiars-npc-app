import {NextResponse} from 'next/server'
import {ethers, formatEther, getBytes, solidityPackedKeccak256} from 'ethers'
import operatorAbi from '@/artifacts/operator.abi.json'
import {CHAIN_ID, OPERATOR_ADDRESS} from '@/constants'
import {Abi, createPublicClient, createWalletClient, http} from 'viem'
import {privateKeyToAccount} from 'viem/accounts'
import {baseSepolia} from 'viem/chains'
import {serializeBigInt} from '@/lib/utils/serialized-bigint'
import {NPCStats} from '@/shared/types'

const privateKey = process.env.PRIVATE_KEY || ''
const wallet = new ethers.Wallet(privateKey)
const account = privateKeyToAccount(wallet.privateKey as `0x${string}`)
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC),
})

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {tokenId, coinsAmt} = body

    // Validate input
    if (typeof tokenId !== 'number' || typeof coinsAmt !== 'number') {
      return NextResponse.json(
        {error: 'Invalid input. tokenId and locationId must be numbers.'},
        {status: 400}
      )
    }

    // Step 1: Fetch the current nonce for the NPC
    const nonce = await publicClient.readContract({
      abi: operatorAbi as Abi,
      address: OPERATOR_ADDRESS,
      functionName: 'nonce',
    })

    console.log(nonce)

    // Step 2: Create the message hash to be signed
    const message = solidityPackedKeccak256(
      ['uint256', 'uint256', 'address'],
      [nonce, CHAIN_ID, wallet.address]
    )
    console.log('Message hash:', message)

    // Step 3: Sign the message
    const signature = await wallet.signMessage(getBytes(message))
    console.log('Message signed:', signature)

    // Step 4: Write transaction to buy food
    const tx = await walletClient.writeContract({
      abi: operatorAbi as Abi,
      address: OPERATOR_ADDRESS,
      functionName: 'buyFoodToMarketplace',
      args: [tokenId, coinsAmt, signature],
    })
    const transaction = await publicClient.waitForTransactionReceipt({hash: tx})
    if (transaction) {
      const stats = await publicClient.readContract({
        abi: operatorAbi as Abi,
        address: OPERATOR_ADDRESS,
        functionName: 'getNPCStats',
        args: [tokenId],
      })

      let serializedStats = serializeBigInt(stats as NPCStats)
      serializedStats = {
        health: serializedStats['0'],
        location: serializedStats['1'],
        coins: formatEther(serializedStats['2']),
        karmic: serializedStats['3'],
        food: serializedStats['4'],
        equipments: serializedStats['5'],
      }

      return NextResponse.json(
        {
          data: {
            transactionId: tx,
            stats: serializedStats,
          },
        },
        {status: 200}
      )
    }
  } catch (error) {
    console.error('Error in buyFood API:', error)
    return NextResponse.json({error: 'Failed to execute buyFood.', details: error}, {status: 500})
  }
}
