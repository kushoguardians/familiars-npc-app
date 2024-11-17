import {NextResponse} from 'next/server'
import {ethers} from 'ethers'
import operatorAbi from '@/artifacts/operator.abi.json'
import {OPERATOR_ADDRESS} from '@/constants'

const providerUrl = process.env.BASE_RPC || ''
const privateKey = process.env.PRIVATE_KEY || ''
const operatorContract = OPERATOR_ADDRESS || ''

// Initialize ethers.js provider and wallet
const provider = new ethers.JsonRpcProvider(providerUrl)
const wallet = new ethers.Wallet(privateKey, provider)

// Create a contract instance
const contract = new ethers.Contract(operatorContract, operatorAbi, wallet)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {tokenId, locationId} = body

    // Validate input
    if (typeof tokenId !== 'number' || typeof locationId !== 'number') {
      return NextResponse.json(
        {error: 'Invalid input. tokenId and locationId must be numbers.'},
        {status: 400}
      )
    }

    // Step 1: Fetch the current nonce for the NPC
    const nonce = await contract.nonce()
    console.log('Fetched nonce:', nonce.toString())

    // Step 2: Create the message hash to be signed
    const message = ethers.solidityPackedKeccak256(
      ['uint256', 'uint256', 'address'],
      [nonce, locationId, wallet.address]
    )
    console.log('Message hash:', message)

    // Step 3: Sign the message
    const signature = await wallet.signMessage(ethers.getBytes(message))
    console.log('Message signed:', signature)

    // Step 4: Write transaction to go to a location
    const tx = await contract.goToLocation(tokenId, locationId, signature)
    console.log('Transaction sent:', tx)

    // Wait for the transaction to be mined
    const receipt = await tx.wait()
    console.log('Transaction mined:', receipt)

    // Step 5: Fetch NPC stats
    const npcStats = await contract.getNPCStats(tokenId)
    console.log('NPC Stats:', npcStats)

    return NextResponse.json(
      {
        transaction: tx.hash,
        receipt,
        npcStats,
      },
      {status: 200}
    )
  } catch (error) {
    console.error('Error in goToLocation API:', error)
    return NextResponse.json(
      {error: 'Failed to execute goToLocation.', details: error},
      {status: 500}
    )
  }
}
