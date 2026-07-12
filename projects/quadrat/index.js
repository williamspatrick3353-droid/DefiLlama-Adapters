const { getLogs } = require('../helper/cache/getLogs')

module.exports = {
  doublecounted: true,
  methodology: 'Counts the tokens locked in Strategy Vaults in Uniswap v3 Pools.',
  start: '2022-10-31', // Mon Oct 31 2022 06:30:43 GMT+0000
};

const config = {
  ethereum: {
    factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    fromBlock: 15891335,
  },
  optimism: {
    factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    fromBlock: 33415677,
  },
  polygon: {
    factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    fromBlock: 35028277,
  },
  arbitrum: {
    factory: '0xb8d498f025c45a8a7a63277cb1cca36c2599bbd7',
    fromBlock: 34510988,
  },
  bsc: {
    factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    fromBlock: 26497758,
  },
}

Object.keys(config).forEach(chain => {
  const { factory, fromBlock, } = config[chain]
  module.exports[chain] = {
    tvl: async (api) => {
      const balances = {}

      const logs = await getLogs({
        api,
        target: factory,
        topics: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
        fromBlock,
        onlyArgs: true,
        eventAbi: 'event PoolCreated (address indexed uniPool, address indexed manager, address indexed pool)'
      })

      const calls = logs.map(i => i.pool)

      const [token0, token1, bals] = await Promise.all([
        api.multiCall({ abi: 'address:token0', calls }),
        api.multiCall({ abi: 'address:token1', calls }),
        api.multiCall({ abi: 'function getUnderlyingBalances() view returns (uint256 amount0, uint256 amount1)', calls, permitFailure: true }),
      ])

      bals.forEach((val, i) => {
        if (!val) return;
        const { amount0, amount1 } = val
        api.add(token0[i], amount0)
        api.add(token1[i], amount1)
      })
    }
  }
})
