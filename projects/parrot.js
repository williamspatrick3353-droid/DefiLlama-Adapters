
const { Program } = require("@project-serum/anchor");
const { getProvider, sumTokens2,  } = require("./helper/solana");

async function tvl() {
  const provider = getProvider()
  const idl = await Program.fetchIdl('0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', provider)
  const program = new Program(idl, '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', provider)
  const pools = await program.account.vaultType.all()
  return sumTokens2({ tokenAccounts: pools.map(i => i.account.collateralTokenHolder.toString()), blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], })
}

module.exports = {
  timetravel: false,
  solana: { tvl, staking: async () => sumTokens2({ tokenAccounts: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1)  },
}
