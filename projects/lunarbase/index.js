
const CURVE_PMMS = {
  base: [
    "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
    "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
    "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
    "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"
  ],
  monad: [
    "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  ]
};

async function tvl(api) {
  const tokenXs = await api.multiCall({ abi: 'address:X', calls: CURVE_PMMS[api.chain] });
  const tokenYs = await api.multiCall({ abi: 'address:Y', calls: CURVE_PMMS[api.chain] });
  const ownerTokens = CURVE_PMMS[api.chain].map((pool, i) => [[tokenXs[i], tokenYs[i]].filter(Boolean), pool]).filter(([tokens]) => tokens.length);
  return api.sumTokens({ ownerTokens });
}

module.exports = {
  methodology:
    "TVL is the total value of tokens held across LunarBase CurvePMM pool contracts on Base.",
  ...Object.keys(CURVE_PMMS).reduce((acc, chain) => {
    acc[chain] = { tvl };
    return acc;
  }, {}),
}

