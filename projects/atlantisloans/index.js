const ADDRESSES = require('../helper/coreAssets.json')
const { staking } = require("../helper/staking");
const { pool2 } = require("../helper/pool2");
const { compoundExports } = require("../helper/compound");

const avaxComptroller = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"
const dcComptroller = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"

const vaultStakingContract_BNB = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
const ATL = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";

const lpVaultStakingContract_BNB = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";
const ALT_BUSD_CakeLP_BNB = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";

module.exports = {
  misrepresentedTokens: true,
      bsc: {
    pool2: pool2(lpVaultStakingContract_BNB, ALT_BUSD_CakeLP_BNB),
    staking: staking(vaultStakingContract_BNB, ATL),
    tvl: async () => ({}),
  },
  polygon: {
    tvl: async () => ({}),
  },
  avax: compoundExports(avaxComptroller,
    "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
    ADDRESSES.avax.WAVAX
  ),
  dogechain: compoundExports(dcComptroller,
    "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
    ADDRESSES.dogechain.WWDOGE
  ),
  hallmarks: [
    ['2023-04-01', 'Team stops all comms, stole funds (?)'],
    // ['2023-06-10', 'Governance Attack'],
  ],
  methodology:
    "TVL is comprised of tokens deposited to the protocol as collateral, similar to Compound Finance and other lending protocols the borrowed tokens are not counted as TVL.",
};
