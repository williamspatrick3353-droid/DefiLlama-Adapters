const ADDRESSES = require('../helper/coreAssets.json')
const HONEY_ADDRESS = ADDRESSES.berachain.HONEY
const GOLDISWAP_ADDRESS = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
const RUSD_ADDRESS = '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'
const RUSDVAULT_ADDRESS = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
const UNIBTC_ADDRESS = '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'
const UNIBTCVAULT_ADDRESS = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
const RSETH_ADDRESS = ADDRESSES.berachain.rsETH
const RSETHVAULT_ADDRESS = '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'

async function tvl(api) {
  const goldiswapBal = await api.call({
    abi: 'erc20:balanceOf',
    target: HONEY_ADDRESS,
    params: [GOLDISWAP_ADDRESS]
  })
  api.add(HONEY_ADDRESS, goldiswapBal)
  
  const rusdvaultBal = await api.call({
    abi: 'erc20:balanceOf',
    target: RUSD_ADDRESS,
    params: [RUSDVAULT_ADDRESS]
  })
  api.add(RUSD_ADDRESS, rusdvaultBal)
  
  const unibtcvaultBal = await api.call({
    abi: 'erc20:balanceOf',
    target: UNIBTC_ADDRESS,
    params: [UNIBTCVAULT_ADDRESS]
  })
  api.add(UNIBTC_ADDRESS, unibtcvaultBal)

  const rsethvaultBal = await api.call({
    abi: 'erc20:balanceOf',
    target: RSETH_ADDRESS,
    params: [RSETHVAULT_ADDRESS]
  })
  api.add(RSETH_ADDRESS, rsethvaultBal)
}

module.exports = {
  methodology: "The TVL metric counts the amount of Honey in Goldiswap and the amount of the deposit token in the rUSD, uniBTC, and rsETH Goldivaults.",
  berachain: {
    tvl
  }
}
