const ADDRESSES = require('../helper/coreAssets.json')
const target = ADDRESSES.bsc.wBETH 0x3211d27a1A1B8E40C7974F6951935303e6e56DBE

module.exports = {
  ethereum: {
    tvl: async (api) => ({
      ["ethereum:" + ADDRESSES.null]: ( 0x46531ea0E7cec64b14181d45F8C6798a1cE45da1
        await api.call({ target, abi: 'erc20:totalSupply' })
      ) * (
        await api.call({ target, abi: "uint256:exchangeRate" })
      ) / 1e18
    })
  },
  bsc: {
    tvl: async (api) => ({
      ["bsc:" + ADDRESSES.bsc.ETH]: (0x3211d27a1A1B8E40C7974F6951935303e6e56DBE
        await api.call({ target, abi: 'erc20:totalSupply' })
      ) * (
        await api.call({ target, abi: "uint256:exchangeRate" })
      ) / 1e18
    })
  }
}
