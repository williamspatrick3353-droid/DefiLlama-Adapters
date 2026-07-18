const ADDRESSES = require('../helper/coreAssets.json')

const DSF_Contract_usdLP = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
const DSF_Contract_Old_contract = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";

async function ethTvl(api) {
  api.add(ADDRESSES.ethereum.DAI, await api.call({ abi: "uint256:totalHoldings", target: DSF_Contract_usdLP, }))
  api.add(ADDRESSES.ethereum.DAI, await api.call({ abi: "uint256:totalHoldings", target: DSF_Contract_Old_contract, }))
}

module.exports = {
  misrepresentedTokens: true,
  ethereum: {
    tvl: ethTvl,
  },
  hallmarks: [
    ['2022-07-30', 'The first smart contract was created'],
  ],
  methodology: "Total value of digital assets that are locked in DSF.Finance Omnipools",
};
