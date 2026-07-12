const { compoundExports2 } = require("../helper/compound");
const { staking } = require('../helper/staking')
const { mergeExports } = require("../helper/utils")
const { yieldHelper } = require("../helper/yieldHelper")

const token = '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'

const lend = compoundExports2({ comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x4B20dBdd4d5a7A762f788796DF5e0487007C6B36', })

const stakings = staking(
  ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
  token
)

const contract = '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'
const abis = {
  poolInfo: 'function poolInfo(uint256) view returns (address want, uint256 allocPoint, uint256 lastRewardTime, uint256 accSushiPerShare, uint256 amount, address strat)',
}
const zebra_vault = yieldHelper({
  project: 'ZebraDAO',
  chain: 'base',
  masterchef: contract,
  nativeToken: token,
  abis,
})

module.exports = mergeExports([
  { base: lend },
  { base: { staking: stakings } },
  zebra_vault,
])
