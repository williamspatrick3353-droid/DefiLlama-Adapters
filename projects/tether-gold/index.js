const ADDRESSES = require('../helper/coreAssets.json')
const XAUt = {
  ethereum: "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  monad: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  polygon: ADDRESSES.flow.stgUSDC,
  plasma: "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  avax: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  celo: "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  ink: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  arbitrum: "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
};

module.exports = {
  methodology: "TVL corresponds to the total amount of XAUt minted",
  ...Object.fromEntries(
    Object.entries(XAUt).map(([chain, address]) => [
      chain,
      {
        tvl: async (api) => {
          const totalSupply = await api.call({
            target: address,
            abi: "erc20:totalSupply",
            chain,
          });
          api.add(address, totalSupply);
        },
      },
    ])
  ),
};
