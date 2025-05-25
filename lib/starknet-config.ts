// Starknet and Dojo configuration
export const STARKNET_CONFIG = {
  network: "goerli-alpha", // or 'mainnet-alpha'
  rpcUrl: "https://starknet-goerli.g.alchemy.com/v2/your-api-key",
  chainId: "0x534e5f474f45524c49", // Starknet Goerli
}

export const DOJO_CONFIG = {
  worldAddress: "0x...", // Your Dojo world contract address
  gameContracts: {
    cleaningGame: "0x...", // Cleaning game contract
    babysittingGame: "0x...", // Babysitting game contract
    rankingSystem: "0x...", // Ranking system contract
    marketplace: "0x...", // Marketplace contract
    payment: "0x...", // Payment contract
  },
}

// Game scoring system
export const GAME_SCORING = {
  cleaningMaster: {
    basePoints: 100,
    timeBonus: 50,
    accuracyBonus: 25,
  },
  babysittingSim: {
    basePoints: 200,
    safetyBonus: 100,
    creativityBonus: 50,
  },
  kitchenWizard: {
    basePoints: 300,
    efficiencyBonus: 150,
    qualityBonus: 75,
  },
}

// Ranking tiers
export const RANKING_TIERS = {
  bronze: { min: 0, max: 999, color: "#CD7F32" },
  silver: { min: 1000, max: 1999, color: "#C0C0C0" },
  gold: { min: 2000, max: 2999, color: "#FFD700" },
  platinum: { min: 3000, max: 4999, color: "#E5E4E2" },
  diamond: { min: 5000, max: Number.POSITIVE_INFINITY, color: "#B9F2FF" },
}
