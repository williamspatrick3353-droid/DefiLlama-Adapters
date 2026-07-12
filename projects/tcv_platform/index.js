const ADDRESSES = require('../helper/coreAssets.json')


const { sumTokens2 } = require('../helper/unwrapLPs');

async function tvl(api) {
  const tcvFactory = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
  const routerFarmingUniV3 = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";
  const autodca = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"
  const tokens = [
    // ARB
    ADDRESSES.arbitrum.ARB,
    // WETH
    ADDRESSES.arbitrum.WETH,
    // USDC
    ADDRESSES.arbitrum.USDC_CIRCLE,
    // WBTC
    ADDRESSES.arbitrum.WBTC
  ]
  const index = await api.call({ target: tcvFactory, abi: 'uint256:numVaults', });
  const vaults = await api.call({ target: tcvFactory, abi: 'function vaults(uint256,uint256) returns (address[])', params: ["0", String(index)], });
  await sumTokens2({ api, resolveUniV3: true, owners: vaults });
  await sumTokens2({ api, resolveUniV3: true, owner: routerFarmingUniV3 });
  for (const token of tokens) {
    api.add(token, await api.call({ target: autodca, abi: 'function getBalance(address) view returns (uint256)', params: [token] }))
  }
}

module.exports = {
  methodology: "Calculates total liquidity from TCV",
  start: '2025-09-15',
  arbitrum: {
    tvl,
  },
};
