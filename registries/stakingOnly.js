const { buildProtocolExports } = require('./utils')

function stakingOnlyExportFn(chainConfigs) {
  const result = {}
  Object.entries(chainConfigs).forEach(([chain, config]) => {
    result[chain] = { tvl: () => ({}) }
  })
  return result
}

const configs = {
  // ============================================================
  // Simple staking/pool2-only adapters
  // ============================================================

  '2omb-finance': {
    fantom: {
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      pool2: [['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
  },
  'bombmoney': {
    bsc: {
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'grape-finance': {
    avax: {
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'nacho-finance': {
    methodology: "Pool2 deposits consist of NACHO/ETH, NSHARE/MATIC LP, ETH/MATIC LP, ETH/USDC LP and NBOND tokens deposits while the staking TVL consists of the NSHARE tokens locked within the Bowl contract.",
    polygon: {
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
  },
  'tempus': {
    ethereum: {
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    fantom: {},
  },
  'solvr': {
    methodology: 'TVL is calculated as the total SOLVR tokens staked in the SolvrStaking contract on Base.',
    base: { 
      staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"]
    }
  },
  'nickel': {
    methodology: 'TVL is NICKEL tokens held in GridMining (mined rewards) and Staking (user-staked NICKEL).',
    base: { 
      staking: { owners: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']}
    }
  },
  'bitchemical': {
    methodology: 'Counts BCHEM held by the Bitchemical staking contract on BNB Chain.',
    bsc: {
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']
    }
  },
  'mineloot': {
    methodology: 'TVL is LOOT tokens held in GridMining (mined rewards), Staking (user-staked LOOT), and Lock (user-locked LOOT).',
    base: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']}
    }
  },
  'cronos-gangsters': {
    methodology: 'TVL counts GANG tokens locked in Cronos Gangsters staking and competition contracts.',
    cronos: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']}
    }
  },
  'reppo': {
    methodology: 'TVL is the total REPPO tokens locked in the VeREPPO contract.',
    base: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']}
    }
  },
  'nara': {
    methodology: 'TVL is the total NARA locked in NARAEngineV2. Users lock NARA for a chosen duration and earn NARA + ETH rewards every 15-minute epoch.',
    base: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']}
    }
  },
  'venice-protocol': {
    methodology: 'Counts the total VVV tokens locked in the Venice Protocol staking contract (sVVV) on Base.',
    base: {
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'citrea-staking': {
    methodology: 'Sum of CTR locked by users in the xCTR (Staked CTR) staking contract on Citrea, which grants governance voting power.',
    citrea: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']},
    },
  },
  'tokamak-network': {
    methodology: 'TON staked through Tokamak Network seigniorage staking on Ethereum L1. Stakers delegate TON to operator (DAO candidate) contracts; the principal is custodied as WTON (27-decimal wrapped TON) in the DepositManager (0x0b58ca72b12f01fc05f8f252e226f3e2089bd00e). Reported staking value is the DepositManager WTON balance.',
    ethereum: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']},
    },
  },

  // ============================================================
  // Tomb forks (tombTvl, tokensOnCoingecko=true) - array staking + array pool2
  // ============================================================

  'snowyowl': {
    misrepresentedTokens: true,
    avax: {
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
  },
  'dibs-money': {
    bsc: {
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'gaur': {
    cronos: {
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'frozen-walrus': {
    avax: {
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'emp-money': {
    misrepresentedTokens: true,
    bsc: {
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
  },

  // ============================================================
  // Tomb forks (tombTvl, tokensOnCoingecko=false) - object staking + array pool2
  // ============================================================

  'draco-finance': {
    fantom: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'athena-money': {
    deadFrom: '2026-01-19',
    misrepresentedTokens: true,
    moonriver: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'snowtomb': {
    misrepresentedTokens: true,
    avax: {
      staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'ampere': {
    methodology: "Pool2 deposits consist of AMP/FUSE and CURRENT/FUSE LP tokens deposits while the staking TVL consists of the CURRENT tokens locked within the Masonry contract, priced using Fuse on Ethereum mainnet.",
    start: 1650700800,
    fuse: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'thermes-finance': {
    fantom: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'rubik-finance': {
    fantom: {
      staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0xf619d97e6ab59e0b51a2154ba244d2e8157223fe'], lps: ['0xCb2534b86fDc053FA312745c281E0838f210e869'], useDefaultCoreAssets: true },
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x9f4cbfa5B43252f3eD06f35C3f1A1D14C36bCeF0', '0xCb2534b86fDc053FA312745c281E0838f210e869']],
    },
  },
  'ripae': {
    misrepresentedTokens: true,
    fantom: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
    avax: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
    bsc: {
      staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
    polygon: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
    cronos: {
      staking: { owners: ['0xf5e49b0a960459799F1E9b3f313dFA81D2CE553c'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true },
      pool2: ['0x83EA9d8748A7AD9f2F12B2A2F7a45CE47A862ac9', ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
    arbitrum: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
    optimism: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'pulsemaxfinance': {
    misrepresentedTokens: true,
    pulse: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'polar-bear-finance': {
    avax: {
      staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true },
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
  },
  'platinum-finance': {
    misrepresentedTokens: true,
    fantom: {
      staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true },
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
  },
  'peakmetis': {
    misrepresentedTokens: true,
    metis: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'magik-finance': {
    misrepresentedTokens: true,
    fantom: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'icecream-finance': {
    avax: {
      staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true },
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']],
    },
  },
  'comet-finance': {
    fantom: {
      staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true },
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
  },
  'code7': {
    fantom: {
      staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true },
      pool2: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']],
    },
  },
  'amesdefi': {
    bsc: {
      staking: { owners: ['0xC183b26Ad8C660AFa7B388067Fd18c1Fb28f1bB4'], tokens: ['0xFa4b16b0f63F5A6D0651592620D585D308F749A4'], lps: ['0x91da56569559b0629f076dE73C05696e34Ee05c1'], useDefaultCoreAssets: true },
      pool2: ['0x1da194F8baf85175519D92322a06b46A2638A530', ['0x81722a6457e1825050B999548a35E30d9f11dB5c', '0x91da56569559b0629f076dE73C05696e34Ee05c1']],
    },
  },
  'droplit-money': {
    misrepresentedTokens: true,
    bsc: {
      staking: { owners: ['0x9D76Db596D281897F3ce842475b7BD6Ea2580b4b'], tokens: ['0x5Abf65C1d152244c6Bd4ad0a5eB92DB00e403BdB'], lps: ['0xa1E137dED898058af3a09caC599D50D1D3ac0ABc'], useDefaultCoreAssets: true },
      pool2: ['0x79D7c1a12c4dE91C487A87602478C5bc19b3aa7c', ['0xa1E137dED898058af3a09caC599D50D1D3ac0ABc', '0x4F8b3ee2421cac4743356e8207209eFf34B51ebe', '0x851b0a2514A56dD780480ab47268794E3d3D947D', '0x7661D626b4c588157960724528a8f3C4a1de5F36']],
    },
  },

  // ============================================================
  // Tomb forks (unknownTombs) - object staking + array pool2
  // ============================================================

  'empyreal': {
    misrepresentedTokens: true,
    arbitrum: {
      staking: { owners: ['0x71d2009460383c970c08b0e37cc8f029bce5bbcd'], tokens: ['0x368F6d735F3Fc8Aa0568D2B7aB275cB828B79709'], lps: ['0x87e65159edafae4bb1ccd0c94c7ec9427409b370', '0x06675843400F2267060ee886C9088fF498f7c8eC', '0x400ebc22c31bedcdab38a6b27963912df71840ed'], useDefaultCoreAssets: true },
      pool2: ['0x15084E92785027D4D4918CAbfa11281fC15bF9AC', ['0x87e65159edafae4bb1ccd0c94c7ec9427409b370', '0x06675843400F2267060ee886C9088fF498f7c8eC', '0x400ebc22c31bedcdab38a6b27963912df71840ed']],
    },
  },
  'subzero-plus': {
    misrepresentedTokens: true,
    avax: {
      staking: { owners: ['0xa252FfDB3A73Bd0F88Eea39658c7C00a281B3bB6'], tokens: ['0xF5b1A0d66856CBF5627b0105714a7E8a89977349'], lps: ['0xD1D0340d80bee3c6f90116467a78dC3718121100', '0xbfE8B1f30035262903927F5BfD65319ef09B48B5', '0x763513C7e639A21D0a7d4A5ec60a6e7314Ed00C8'], useDefaultCoreAssets: true },
      pool2: ['0xDAccfd92e37be54Ca1A8ff37A7922446614b4759', ['0xD1D0340d80bee3c6f90116467a78dC3718121100', '0xbfE8B1f30035262903927F5BfD65319ef09B48B5', '0x763513C7e639A21D0a7d4A5ec60a6e7314Ed00C8']],
    },
  },
  'gametheory': {
    misrepresentedTokens: true,
    fantom: {
      staking: { owners: ['0x83641aa58e362a4554e10ad1d120bf410e15ca90', '0x670433FB874d4B7b94CF1D16E95fa241474E6787'], tokens: ['0x56EbFC2F3873853d799C155AF9bE9Cb8506b7817', '0xFfF54fcdFc0E4357be9577D8BC2B4579ce9D5C88'], lps: ['0x168e509FE5aae456cDcAC39bEb6Fd56B6cb8912e', '0xF69FCB51A13D4Ca8A58d5a8D964e7ae5d9Ca8594'], useDefaultCoreAssets: true },
      pool2: ['0x820c3b6d408Cff08C8a31C9F1461869097ba047c', ['0x168e509FE5aae456cDcAC39bEb6Fd56B6cb8912e', '0xF69FCB51A13D4Ca8A58d5a8D964e7ae5d9Ca8594']],
    },
  },
  'dawn-star-finance': {
    misrepresentedTokens: true,
    polygon: {
      staking: { owners: ['0x00c8Ee42761C95B223676d6Ea59c6b7f6f643A6E'], tokens: ['0xf8Eed914a0BAcAF30C13420989bB7C81b75D833A'], lps: ['0xfc48B66b9119f1d5fD7C8e72E7e489a5D6C0EF55', '0xe1628A0e5250Fa17271Cef1ED4d892cb32D5ADd4'], useDefaultCoreAssets: true },
      pool2: ['0xfA9f91a340e2eFA47B67921f8809E98796d1f7F7', ['0xfc48B66b9119f1d5fD7C8e72E7e489a5D6C0EF55', '0xe1628A0e5250Fa17271Cef1ED4d892cb32D5ADd4']],
    },
  },
  'cowaii-cash': {
    misrepresentedTokens: true,
    dogechain: {
      staking: { owners: ['0x0eD8cFA5Bd631263CFAb290E12e2559af1252Ed6'], tokens: ['0xc90163b8d53F319AbE68dd1d8ecC025c72eB3f04'], lps: ['0x517ae0a15932A57D27cE26AE97f5F9Dbc6823907', '0x2b779C9Ed23bb315911EEE910bc3FfAbFfB776bB'], useDefaultCoreAssets: true },
      pool2: ['0xb015d1D4F846D44A699F5648071496D1eC99C4C5', ['0x517ae0a15932A57D27cE26AE97f5F9Dbc6823907', '0x2b779C9Ed23bb315911EEE910bc3FfAbFfB776bB']],
    },
  },
  'ora-finance': {
    misrepresentedTokens: true,
    methodology: "Pool2 deposits consist of ORA/AURORA and OSHARE/AURORA LP tokens deposits while the staking TVL consists of the OSHARES tokens locked within the Boardroom.",
    aurora: {
      staking: { owners: ['0xCF0c385aE8225EFF591bA4a7637cF688Bf012A16'], tokens: ['0xdcefBd8f92683541e428DD53Cd31356f38d69CaA'], lps: ['0x1203f76D98c103DFDa350C0b7F7323475Ee24aE3', '0x7939e155b222c804FCDd0d0297922BBEf6F64897'], useDefaultCoreAssets: true },
      pool2: ['0xa18d290144C684349b1Cc4fC8501707cd7724f74', ['0x1203f76D98c103DFDa350C0b7F7323475Ee24aE3', '0x7939e155b222c804FCDd0d0297922BBEf6F64897']],
    },
  },
  'akropolis': {
    ethereum: {
      staking: ['0x3501Ec11d205fa249f2C42f5470e137b529b35D0', '0x8Ab7404063Ec4DBcfd4598215992DC3F8EC853d7'],
    },
  },
  'orbs': {
    ethereum: {
      staking: ['0x01d59af68e2dcb44e04c50e05f62e7043f2656c3', '0xff56Cc6b1E6dEd347aA0B7676C85AB0B3D08B0FA'],
    },
  },
  'looks-rare': {
    methodology: 'TVL for LOOKS.RARE consists of the staking of LOOKS and pool2 of uni-v2 LOOKS-WETH.',
    ethereum: {
      staking: ['0x465a790b428268196865a3ae2648481ad7e0d3b1', '0xf4d2888d29D722226FafA5d9B24F9164c092421E'],
      pool2: ['0x2a70e7f51f6cd40c3e9956aa964137668cbfadc5', '0xdc00ba87cc2d99468f7f34bc04cbf72e111a32f7'],
    },
  },
  'thegraph': {
    methodology: 'TVL counts GRT tokens deposited on the Staking contracts.',
    start: '2023-06-25',
    ethereum: {
      staking: ['0xF55041E37E12cD407ad00CE2910B8269B01263b9', '0xc944E90C64B2c07662A292be6244BDf05Cda44a7'],
    },
    arbitrum: {
      staking: ['0x00669A4CF01450B64E8A2A20E9b1FCB71E61eF03', '0x9623063377AD1B27544C965cCd7342f7EA7e88C7'],
    },
  },
  'ethfi-stake': {
    ethereum: {
      staking: ['0x86B5780b606940Eb59A062aA85a07959518c0161', '0xFe0c30065B384F05761f15d0CC899D4F9F9Cc0eB'],
    },
    arbitrum: {
      staking: ['0x86B5780b606940Eb59A062aA85a07959518c0161', '0x7189fb5B6504bbfF6a852B13B7B82a3c118fDc27'],
    },
  },
  'epns': {
    methodology: 'TVL for PUSH consists of the staking of PUSH and pool2 of uni-v2 LP.',
    ethereum: {
      staking: ['0xb72ff1e675117bedeff05a7d0a472c3844cfec85', '0xf418588522d5dd018b425e472991e52ebbeeeeee'],
      pool2: ['0xb72ff1e675117bedeff05a7d0a472c3844cfec85', '0xaf31fd9c3b0350424bf96e551d2d1264d8466205'],
    },
  },
  'fees-wtf': {
    methodology: 'TVL for fees.wtf consists of the staking of WTF and pool2 of uni-v2 WTF-WETH.',
    ethereum: {
      staking: ['0x0bf0e1678eaa36cd2d705cab3ce8020de443056c', '0xA68Dd8cB83097765263AdAD881Af6eeD479c4a33'],
      pool2: ['0xf0c51dc9a85d00c1c1bebfbb2d1465a39f4702d8', '0xab293dce330b92aa52bc2a7cd3816edaa75f890b'],
    },
  },
  'gracy-staking': {
    ethereum: {
      staking: [[
        '0x76A2A3ebeCc73871cc24e4807C4cBA57D03b0b2c', '0xa0EE760C52b10d2A21E563526248CA389D9C47E6',
        '0xAb6aD663b42c7031b52737cbcBF9f70cb88fD9FC', '0x4f1043ABb51648E817b8e62EcABc157F91E61c52',
        '0x6e05d3a61f5026EEa67d0a82843d5E82eb3E2608', '0xE5ff1432DC7BE35CC73216A8cc468608398AD433',
        '0x908c41C339DAAaC0be4440ba2CFbA4fFb0093a4A', '0x2D5D48c72222DDdAE37317aa03a6BC5a5734f028',
      ], '0x7c95e7ad2b349dc2f82d0f1117a44b561fa2699a'],
    },
    base: {
      staking: [['0xE63F62Ba055003aEDB394Dc3e7056fAF49bf97b1'], '0xc5449Fafc8711B6fa68192586c9Aa9302503b939'],
    },
  },
  'heroes-of-mavia': {
    ethereum: {
      staking: ['0xF2f8D915a4F28Cdb52cbe8F56ecc0f8AE3def54A', '0x24fcFC492C1393274B6bcd568ac9e225BEc93584'],
    },
    base: {
      staking: [['0x21890f88fc8A8b0142025935415017adA358C8C0', '0xecc312CBDC0884C41FE1579ea33686DdAcc90c42'], '0x24fcFC492C1393274B6bcd568ac9e225BEc93584'],
    },
  },
}

module.exports = buildProtocolExports(configs, stakingOnlyExportFn)
