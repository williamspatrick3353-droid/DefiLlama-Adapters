const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokens2, nullAddress } = require('../helper/unwrapLPs')

const uno = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
const uno_rollux = '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'

const config = {
  ethereum: {
    uToken: uno, // UNO token for staking only
    tokensAndOwners: [
      [nullAddress, '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], // ETH SSIP
      [ADDRESSES.ethereum.USDT, '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], // USDT SSIP
      [ADDRESSES.ethereum.USDC, '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], // USDC SSIP
    ],
    pools: [
      '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', // UNO SSRP
      '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',  // UNO SSIP
      '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', // USDT SSIP
      '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', // USDC SSIP
      '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' // ETH SSIP
    ]
  },
  bsc: {
    uToken: uno, // UNO token for staking only
    tokensAndOwners: [
      [ADDRESSES.bsc.USDC, '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], // Zeus V2
    ],
    pools: [
      '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', // Zeus V2 
      '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'  // Ares V2
    ]
  },
  rollux: {
    uToken: uno_rollux, // UNO Rollux token for staking only
    tokensAndOwners: [
      [ADDRESSES.optimism.WETH_1, '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], // Plutus
    ],
    pools: [
      '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', // Athena
      '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' // Plutus
    ]
  }
}

module.exports = {
  start: '2021-07-12',  // Sep-20-2021 07:27:47 AM +UTC
  kava: { tvl: async () => ({})},
};

Object.keys(config).forEach(chain => {
  const { pools, uToken, tokensAndOwners } = config[chain]

  // TVL (Total Value Locked) - Excludes UNO token
  module.exports[chain] = {
    tvl: async (api) => sumTokens2({ api, tokensAndOwners })
  }
  
  // Staking - Includes only UNO token and its pools
  if (uToken) {
    module.exports[chain].staking = async (api) => sumTokens2({
      api,
      tokens: [uToken],
      owners: pools
    })
  }
})
