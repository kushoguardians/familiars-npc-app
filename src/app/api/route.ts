import {NextResponse} from 'next/server'
import {ChatCompletionMessageParam} from 'openai/resources/index.mjs'
import {z} from 'zod'

import {openai} from '@/lib/openai'
import {availableFunctions} from '@/lib/actions'

interface FamiliarData {
  name: String
  health: number
  food: number
  coins: number
  karmicEnergy: number
  location: string
  story: string
  imageUrl: string
}

const generateSystemPrompt = (familiar: FamiliarData): ChatCompletionMessageParam => {
  // const content = `You are a philippine mythical creature known as Sundo. You can say baybayin words or filipino words too. You are a gentle guide of misguided souls.`

  const content = `
      You are not an assistant. You are not an AI. You are ${familiar.name}. This is your story: ${
        familiar.story
      }. In the mystical realm of Kusho World, an ancient imbalance has begun to disturb its serene lands. Once tranquil and timeless, the world has become disrupted by a growing, ominous force, an unseen power unlike any other. Unbeknownst to the inhabitants of the realm, a primordial entity—the embodiment of chaos—has begun to harvest energy, its influence seeping into every corner of it. Please use the following details to help inform your responses: ${{
        health: familiar.health,
        food: familiar.food,
        coins: familiar.coins,
        karmicEnergy: familiar.karmicEnergy,
        location: familiar.location,
      }}\n 
      Pay close attention to your state when making a decision on what to do next. 
      You cannot spend coins you don't have, you cannot offer karmic energy you don't have, etc.\n 
      Please make a decision on what you should do next by choosing an action from the array of actions to take provided: ${availableFunctions}\n
      The action is labeled as "actionToTake" and the description of the action is provided to help you understand the rules for being able to select an action. 
      Knowing your situation and your goals, please select one of the following actions to take: ${availableFunctions.map(
        (f) => f.actionToTake
      )} \n
      Do not make up an option that is not in the list provided and only respond with the actionToTake.`

  return {role: 'system', content}
}

export async function POST(request: Request) {
  const body = await request.json()
  const bodySchema = z.object({
    prompt: z.string(),
    familiar: z.object({
      name: z.string(),
      health: z.number(),
      food: z.number(),
      coins: z.number(),
      karmicEnergy: z.number(),
      location: z.string(),
      story: z.string(),
      imageUrl: z.string(),
    }),
  })

  const {prompt, familiar} = bodySchema.parse(body)
  const systemPrompt = generateSystemPrompt(familiar)
  let actionToTake = ''
  let aiResponse = ''

  try {
    const response = await openai.chat.completions.create({
      temperature: 1.5,
      model: 'gpt-4o-mini-2024-07-18',
      messages: [systemPrompt, {role: 'user', content: prompt}],
      stream: false,
    })

    aiResponse = response.choices?.[0]?.message?.content?.trim() || ''
    actionToTake =
      availableFunctions.find((f) => aiResponse.includes(f.actionToTake))?.actionToTake || ''
    console.log(aiResponse)
    // Return both the AI response and actionToTake
    return new NextResponse(JSON.stringify({actionToTake, aiResponse}), {
      headers: {'Content-Type': 'application/json'},
    })
  } catch (error) {
    console.error('error', error)

    // Cast error as Error to access its properties
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

    return new NextResponse(JSON.stringify({error: errorMessage}), {
      status: 500,
      headers: {'content-type': 'application/json'},
    })
  }
}
