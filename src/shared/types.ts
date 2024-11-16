export type NPCEquipItems = {
  head: bigint
  mouth: bigint
}

export type NPCStats = {
  health: number
  location: string
  coins: bigint
  karmic: bigint
  food: bigint
  equipments: NPCEquipItems
}
