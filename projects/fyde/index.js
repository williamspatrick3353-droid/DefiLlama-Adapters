const ADDRESSES = require('../helper/coreAssets.json')

const FYDE_CONTRACT = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";
const RESTAKING_AGGREGATOR = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
const DEPOSIT_ESCROW = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
const ORACLE = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"
const WETH = ADDRESSES.ethereum.WETH;
const YIELDMANAGER = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"
const PTTOKENS = ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"]

async function tvl(api) {
  const tokens = await api.fetchList({ lengthAbi: 'getAssetsListLength', itemAbi: 'assetsList', target: FYDE_CONTRACT })
  const bals = await api.multiCall({  abi: 'function totalAssetAccounting(address) view returns (uint256)', calls: tokens, target: FYDE_CONTRACT })

  // add restaking aggregator TVL
  const amountStakedETH = await api.call({
    abi: 'erc20:totalSupply',
    target: RESTAKING_AGGREGATOR,
    params: [],
  });

  api.add(WETH, amountStakedETH)

  // add tokens deployed to yield module. Check which token from tokens is a yield-token, map to the underlying and 
  // add balances to TVL
  const response = await api.multiCall({
    target: ORACLE,
    calls: tokens,
    abi: 'function yieldTokenToToken(address) external view returns (address)',
  })
  const decimals = await api.multiCall({  abi: 'uint8:decimals', calls: tokens})

  for (let i = 0; i < tokens.length; i++) {
    if (response[i] !== ADDRESSES.null) {
      const balance = bals[i] / 10 ** (decimals[i] - 18)
      api.add(response[i], balance)
    } else 
      api.add(tokens[i], bals[i])
  }

  // add assets in the deposit escrow
  const tokensEscrow = await api.fetchList({ lengthAbi: 'getAssetListLength', itemAbi: 'assetList', target: DEPOSIT_ESCROW })
  return api.sumTokens({ ownerTokens: [
    [tokensEscrow, DEPOSIT_ESCROW],
    [PTTOKENS, YIELDMANAGER],
  ],})
}

module.exports = {
  methodology: 'Read out balances from internal accounting for each asset in Fyde, the YieldModule and the DepositEscrow. Add ETH staked in LRT Aggregator.',
  ethereum: {
    tvl
  }
};
