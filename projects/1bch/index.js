const ADDRESSES = require('../helper/coreAssets.json')
const sdk = require('@defillama/sdk');
const { getUniTVL } = require('../helper/unknownTokens')
const { stakingPriceLP } = require('../helper/staking')

const WBCH = ADDRESSES.smartbch.WBCH;
const rBCH = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
const FACTORY = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";
const MASTERBREEDER = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
const rBCH_WBCH_LP = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";
const COREASSETNAME = "bitcoin-cash";

async function bchMasterChef(api) {
    return api.sumTokens({ owner: MASTERBREEDER, tokens: [WBCH]})
}

const bchDexTvl = getUniTVL({ factory: FACTORY, useDefaultCoreAssets: true, })

module.exports = {
    misrepresentedTokens: true,
    methodology: "Factory address (" + FACTORY + ") is used to find the LP pairs on smartBCH. TVL is equal to AMMs liquidity plus the extra staking balance and masterchef pools.",
    smartbch: {
        tvl: sdk.util.sumChainTvls([bchDexTvl, bchMasterChef]),
        // masterchef: bchMasterChef,
        staking: stakingPriceLP(MASTERBREEDER, rBCH, rBCH_WBCH_LP),
    },
}
