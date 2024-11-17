import {NextResponse} from 'next/server'
import {
  Abi,
  Address,
  createPublicClient,
  createWalletClient,
  http,
  toHex,
  concatHex,
  keccak256 as solidityPackedKeccak256,
} from 'viem'
import {privateKeyToAccount} from 'viem/accounts'
import {baseSepolia} from 'viem/chains'
import {OPERATOR_ADDRESS} from '@/constants'
import OperatorAbi from '@/artifacts/operator.abi.json'

interface OperatorContractType {
  address: Address
  abi: Abi
}

// Initialize public client
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC || ''),
})

// Initialize wallet client
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC || ''),
})

// Operator contract instance
const OperatorContract: OperatorContractType = {
  address: OPERATOR_ADDRESS,
  abi: OperatorAbi as Abi,
} as const

// Handler function for the API route
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {tokenId, locationId} = body

    if (typeof tokenId !== 'number' || typeof locationId !== 'number') {
      return NextResponse.json(
        {error: 'Invalid input. tokenId and locationId must be numbers.'},
        {status: 400}
      )
    }

    console.log('Initiating goToLocation...')

    // Step 1: Fetch the current nonce for the NPC
    const nonce: string = (await publicClient.readContract({
      address: OperatorContract.address,
      abi: OperatorContract.abi,
      functionName: 'nonce',
    })) as unknown as string

    console.log('Fetched nonce:', nonce)

    // Step 2: Create the message hash to be signed
    const message = solidityPackedKeccak256(
      concatHex([toHex(nonce), toHex(locationId), toHex(account.address)])
    )

    console.log('Message hash:', message)

    // Step 3: Sign the message
    const signature = await walletClient.signMessage({message})

    console.log('Message signed:', signature)

    // Step 4: Write transaction to go to a location
    const tx = await walletClient.writeContract({
      address: OperatorContract.address,
      abi: OperatorContract.abi,
      functionName: 'goToLocation',
      account,
      args: [tokenId, locationId, signature], // Pass tokenId, locationId, and the signature
    })

    console.log('Transaction sent:', tx)

    return NextResponse.json({transaction: tx}, {status: 200})
  } catch (error) {
    console.error('Error calling goToLocationNPC:', error)
    return NextResponse.json(
      {error: 'Failed to execute goToLocationNPC', details: error},
      {status: 500}
    )
  }
}
