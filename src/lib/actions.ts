export const availableFunctions = [
  {
    actionToTake: 'goToGatheringArea',
    locationName: 'Gathering Area',
    description:
      'A socialization point where familiars can interact, develop personality, and learn what other familiars are up to. Reduces health by 2 but grants 0-1 karmic energy. Cannot visit if already at the Gathering Area.',
    arguments: [],
  },
  {
    actionToTake: 'goToHome',
    locationName: 'Home',
    description:
      "The place for familiars to rest and recuperate. Increases health by 2 but decreases food by 2. Familiars cannot choose to go here if they're already at Home.",
    arguments: [],
  },
  {
    actionToTake: 'goToKarmicTower',
    locationName: 'Karmic Tower',
    description:
      'A place to gather karmic energy, increasing it by 1-3 points per visit. Visiting the Karmic Tower reduces health by 1, encouraging familiars to rest afterward. Cannot visit if already at the Karmic Tower.',
    arguments: [],
  },
  {
    actionToTake: 'deposit5KarmicEnergy',
    locationName: 'Karmic Wellspring',
    description:
      'Allows familiars to exchange 5 karmic energy for 3 coins and 3 food. A place to trade karmic energy for resources. Cannot visit if already at the Karmic Wellspring.',
    arguments: [],
  },
  {
    actionToTake: 'deposit10KarmicEnergy',
    locationName: 'Karmic Wellspring',
    description:
      'Allows familiars to exchange 10 karmic energy for 9 coins and 9 food. Grants greater rewards than a 5-energy deposit. Cannot visit if already at the Karmic Wellspring.',
    arguments: [],
  },
  {
    actionToTake: 'deposit20KarmicEnergy',
    locationName: 'Karmic Wellspring',
    description:
      'Allows familiars to exchange 20 karmic energy for 19 coins and 19 food. Yields the highest rewards among deposits, enhancing the familiar’s resources significantly. Cannot visit if already at the Karmic Wellspring.',
    arguments: [],
  },
  {
    actionToTake: 'buyTreasureBox',
    locationName: 'Marketplace',
    description:
      'Familiars can buy a treasure box for 5 coins, which may contain 1-20 coins. This is a chance-based purchase that could result in more resources than initially spent. Cannot visit if already at the Marketplace.',
    arguments: [],
  },
  {
    actionToTake: 'buyFood',
    locationName: 'Marketplace',
    description:
      'Familiars can buy food at a 1:1 coin-to-food ratio. Helps replenish food resources as needed. Cannot visit if already at the Marketplace.',
    arguments: [],
  },
]

export const getHumanReadableAction = (actionToTake: string, aiResponse: string) => {
  const actionTemplates: any = {
    goToGatheringArea: "Okay. I'm going now to the gathering area to collect some karmic energies.",
    goToHome: "I'm heading back home to rest and recuperate.",
    goToKarmicTower: "I'm on my way to the Karmic Tower to gather some karmic energy.",
    deposit5KarmicEnergy:
      "I'm going to the Karmic Wellspring to exchange 5 karmic energy for 3 coins and 3 food.",
    deposit10KarmicEnergy:
      "I'm heading to the Karmic Wellspring to trade 10 karmic energy for 9 coins and 9 food.",
    deposit20KarmicEnergy:
      "I'm visiting the Karmic Wellspring to exchange 20 karmic energy for 19 coins and 19 food.",
    buyTreasureBox:
      "I'm off to the Marketplace to buy a treasure box for 5 coins. Let's see what I get!",
    buyFood: "I'm going to the Marketplace to buy some food to replenish my resources.",
  }

  // Fallback if the action is not explicitly mapped
  return actionTemplates[actionToTake] || aiResponse
}
