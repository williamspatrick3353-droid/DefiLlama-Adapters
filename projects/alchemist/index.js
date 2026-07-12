const { getLogs } = require('../helper/cache/getLogs')
const { sumTokens2 } = require('../helper/unwrapLPs')

const getAludelDataABI = "function getAludelData() view returns ((address stakingToken, address rewardToken, address rewardPool, (uint256 floor, uint256 ceiling, uint256 time) rewardScaling, uint256 rewardSharesOutstanding, uint256 totalStake, uint256 totalStakeUnits, uint256 lastUpdate, (uint256 duration, uint256 start, uint256 shares)[] rewardSchedules) aludel)"

async function tvl(api) {
  const logs = await getLogs({
    api,
    target: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    eventAbi: 'event InstanceAdded (address instance)',
    onlyArgs: true,
    fromBlock: 11881110,
  })
  const pools = logs.map(l => l.instance)
  const owners = await api.multiCall({ abi: 'address:owner', calls: pools })
  const data = await api.multiCall({ abi: getAludelDataABI, calls: owners })
  data.forEach(i => api.add(i.stakingToken, i.totalStake))
  await sumTokens2({ api, resolveLP: true, })
  api.removeTokenBalance('0x3211d27a1A1B8E40C7974F6951935303e6e56DBE')
  return api.getBalances()
}

module.exports = {
  ethereum: {
    tvl,
    pool2: () => ({}),
  }
}
