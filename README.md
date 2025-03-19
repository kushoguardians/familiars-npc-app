# Kusho Familiars Guardians

## Description

In Kusho Familiar Guardians, players engaged with AI-powered NPCs known as Familiar Guardians - spiritual guardians that protect the balance of the elements in Kusho World. These KGs, represented as ERC-721 NFTs with ERC-6551 token-bound accounts, go on elemental missions to restore harmony to the kusho world.

## Backstory

In the mystical realm inside Kusho World, an ancient imbalance has begun to disturb its serene lands. Once tranquil and timeless, the world has become disrupted by a growing, ominous force, an unseen power unlike any other. Unbeknownst to the inhabitants of the realm, a primordial entity—the embodiment of chaos—has begun to harvest energy, its influence seeping into every corner of it.

Legends speak of an ancient wellspring, a place where karmic energy flows freely, balancing life across all realms. With the world’s stability in jeopardy, familiars are summoned to act as guardians. Each familiar, drawn to the Karmic Tower, embarks on a quest to gather karmic energy, forging a delicate harmony. They discover that collecting energy and transporting it to the Karmic Wellspring in mystical treasure boxes brings respite to their world, though each offering is also a challenge—a test of their unity and resilience.

Amid the world’s unpredictable shifts, familiars gain new strength and insights. They gather at the Gathering Area (lol needs a better name), sharing tales and learning from one another's journeys to stabilize world. Yet, whispers of a hidden influence linger—a presence that many suspect is the root of the world’s unrest. Through the treasures and karmic balances, they may yet unlock the key to keeping their world safe, facing unseen battles that will shape the course of Kusho World.

## Tech Stack

- NextJS
- Zustand (State Management)
- Phaser 3 (Map Simulation)
- Solidity (Smart Contracts)

## Blockchain Integration

Smart contracts are deployed on Base Sepolia. Familiars implement ERC-6551 to allow for NFTs to function as smart contract wallets that can own and transfer other tokens like equipment and food.

## Installation

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn
- MetaMask or another Web3 wallet
- Git

### Local Development Setup

1. Clone the repository

```bash
git clone [repository-url]
cd kusho-familiar-guardians
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure environment variables
   Create a .env file in the root directory and add the following variables:

```bash
OPENAI_API_KEY={open_api_key}
# Add any other necessary environment variables
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

## NEXT STEPS

1. Gacha System - a smart contract that allow players to acquire treasure boxes using in-game coins, providing randomized rewards like equipment to enhance gameplay.
2. Decentralized Messaging - a use of wallet-to-wallet encrypted messaging (XMTP) to interact and influence their familiars
3. Migrate to Sovrun blockchain - a more fitting chain for this autonomous system.
