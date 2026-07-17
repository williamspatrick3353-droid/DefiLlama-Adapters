const sdk = require('@defillama/sdk')
const { uniV3Export } = require('../helper/uniswapV3')
const {getUniTVL} = require('../helper/unknownTokens')

const concentraledLiquidity = uniV3Export({
  fraxtal: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', fromBlock: 1352717, },
})

module.exports = {
  misrepresentedTokens: true,
  fraxtal:{
    tvl: sdk.util.sumChainTvls([
        concentraledLiquidity.fraxtal.tvl,
        getUniTVL({ factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', useDefaultCoreAssets: true,  hasStablePools: true, stablePoolSymbol: 'crAMM' }),
    ])
  },
}
