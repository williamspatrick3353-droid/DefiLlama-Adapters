const {getUniTVL} = require("../helper/unknownTokens");
const {staking} = require('../helper/staking')
const { sumTokensExport } = require('../helper/unwrapLPs')

const IXS_POLYGON = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"
const IXS_BASE = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"
const STAKING_CONTRACTS = [
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", // stake bank
]


const FUNDS = [
  '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', // CKGP
]

module.exports = {
  polygon: {
    tvl: getUniTVL({factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: [IXS_POLYGON]}),
    staking: staking(STAKING_CONTRACTS, IXS_POLYGON),
  },
  base: {
    tvl: getUniTVL({factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'}),
    staking: 0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], IXS_BASE),
  },
  ethereum: {
    tvl: sumTokensExport({ owners: FUNDS, fetchCoValentTokens: true })
  }
}
