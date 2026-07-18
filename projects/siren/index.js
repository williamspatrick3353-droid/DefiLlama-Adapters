const { getLogs, getAddress } = require('../helper/cache/getLogs');

const config = {
  arbitrum: { hedgePools: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  polygon: { fromBlock: 17842705, factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', vault: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', },
  ethereum: { fromBlock: 11272343, factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', vault: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', },
}

Object.keys(config).forEach(chain => {
  const { factory, fromBlock, vault, hedgePools } = config[chain]
  module.exports[chain] = {
    tvl: async (api) => {
      const tokensAndOwners = []
      if (hedgePools) {
        const tokens = await api.multiCall({ abi: 'address:collateralToken', calls: hedgePools })
        tokensAndOwners.push(...tokens.map((v, i) => [v, hedgePools[i]]))
      }

      if (factory) {
        const logs = await getLogs({
          api,
          target: factory,
          topics: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
          fromBlock,
        })
        const pools = logs.map(i => getAddress(i.data))
        const tokens = await api.multiCall({ abi: 'address:collateralToken', calls: pools })
        const toa = tokens.map((v, i) => [[v, pools[i]], [v, vault]]).flat()
        tokensAndOwners.push(...toa)
      }

      return api.sumTokens({ tokensAndOwners })
    }
  }
});
