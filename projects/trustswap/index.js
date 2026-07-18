const ADDRESSES = require('../helper/coreAssets.json')
const abi = {
  "token": "address:token",
  "currentTotalStake": "uint256:currentTotalStake"
}

const staking_contract = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";

const assets = [
  // other tokens which probably for some reason was sent to the contract accidentally
  ADDRESSES.ethereum.USDC,
  ADDRESSES.ethereum.USDT,
  ADDRESSES.ethereum.UNI,
];

const stakingTvl = async (api) => {
  const token = await api.call({  abi: abi.token, target: staking_contract})
  const bal = await api.call({  abi: abi.currentTotalStake, target: staking_contract})
  api.add(token, bal)
};

async function ethTvl(api) {
  return api.sumTokens({ owner: staking_contract, tokens: assets })
}


module.exports = {
  methodology: `Counts SWAP tokens locked int the staking contract(0x46531ea0E7cec64b14181d45F8C6798a1cE45da1). Regular TVL counts UNI, USDT, and USDC that are also in the staking contract(these tokens may have been sent to the contract by accident).`,
  ethereum: {
    tvl: ethTvl,
    staking: stakingTvl
  },
};
