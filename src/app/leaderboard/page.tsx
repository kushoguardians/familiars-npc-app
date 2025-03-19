import Leaderboard from './components/leaderboard'

export default async function Page() {
  // Get the host from the environment or use a default
  const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  try {
    const data = await fetch(`${host}/api/multicall/npc-stats`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tokenIds: [1, 2, 3, 4]}),
    })

    const npcStats = await data.json()
    return <Leaderboard data={npcStats.data} />
  } catch (error) {
    console.error('Failed to fetch data:', error)
    // Return the component with empty data
    return <Leaderboard data={[]} />
  }
}
