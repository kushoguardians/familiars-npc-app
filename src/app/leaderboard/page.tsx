import Leaderboard from './components/leaderboard'

export default async function Page() {
  const data = await fetch('http://localhost:3000/api/multicall/npc-stats', {
    method: 'post',
    body: JSON.stringify({tokenIds: [1, 2, 3, 4]}),
  })
  const npcStats = await data.json()

  return <Leaderboard data={npcStats.data} />
}
