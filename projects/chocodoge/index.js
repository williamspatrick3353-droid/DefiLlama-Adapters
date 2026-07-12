const ADDRESSES = require('../helper/coreAssets.json')
const { unknownTombs, sumTokensExport, } = require('../helper/unknownTokens')

const chain = 'dogechain'
const uscdAddress = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
const cdAddress = '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'
const genesisPool = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
const masonry = '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' // Bank

const lps = ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' , // LP USCD/USDC
             '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', // LP CD/USDC
             '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', // LP USCD/DOGE
            ]

module.exports = unknownTombs({
  lps,
  token: cdAddress,
  shares: [uscdAddress],
  rewardPool: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', 
0x46531ea0E7cec64b14181d45F8C6798a1cE45da1              ],
  masonry: [uscdAddress, masonry],
  chain,
  useDefaultCoreAssets: true,
})

module.exports[chain].tvl = sumTokensExport({ chain, owner: genesisPool, tokens: [
  ADDRESSES.dogechain.DC,
  '0x68609eA0b8393258d0d7EF21401E1Cd3B00A714e',
  "0x765277eebeca2e31912c9946eae1021199b39c61",
  ADDRESSES.dogechain.WWDOGE,
], useDefaultCoreAssets: true, })
module.exports.misrepresentedTokens = true
