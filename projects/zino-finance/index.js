const POOLINFO = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1';

async function tvl(api) {
  const res = await api.call({ target: POOLINFO, abi:  "function getTotalValueLockedList() view returns ((address token, uint8 decimals, uint256 amount)[])"})
  res.forEach(i => api.add(i.token, i.amount))
}

module.exports = {
  start: 1741132619,
  arbitrum: {
    tvl
  }
}
