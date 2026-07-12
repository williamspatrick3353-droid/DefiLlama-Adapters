const ADDRESSES = require('../projects/helper/coreAssets.json')
const { aaveV2Export, aaveExports, methodology } = require('../projects/helper/aave')
const { buildProtocolExports } = require('./utils')

const chainExportKeys = new Set(['staking', 'pool2', 'borrowed', 'vesting'])

function aaveV2ExportFn(chainConfigs) {
  const result = {}
  Object.entries(chainConfigs).forEach(([chain, config]) => {
    if (typeof config === 'string') {
      result[chain] = aaveV2Export(config)
    } else {
      const { registry, ...options } = config
      for (const key of chainExportKeys) delete options[key]
      result[chain] = aaveV2Export(registry, options)
    }
  })
  return result
}

function aaveExportFn(chainConfigs) {
  const result = {}
  Object.entries(chainConfigs).forEach(([chain, config]) => {
    if (typeof config === 'string') {
      result[chain] = aaveExports(chain, config)
    } else {
      const { addressesProviderRegistry, dataHelpers, ...options } = config
      for (const key of chainExportKeys) delete options[key]
      result[chain] = aaveExports(chain, addressesProviderRegistry, undefined, dataHelpers, options)
    }
  })
  return result
}

// --- aaveV2Export based protocols ---
const aaveV2Configs = {
  'tokos-fi': {
    methodology,
    somnia: { registry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isAaveV3Fork: true },
  },
  'pholend': {
    methodology,
    crossfi: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hydration-lending': {
    methodology,
    hydradx: {
      registry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      abis: {
        getReserveData: "function getReserveData(address asset) view returns (((uint256 data) configuration, uint128 liquidityIndex, uint128 currentLiquidityRate, uint128 variableBorrowIndex, uint128 currentVariableBorrowRate, uint128 currentStableBorrowRate, uint40 lastUpdateTimestamp, uint16 id, address aTokenAddress, address stableDebtTokenAddress, address variableDebtTokenAddress, address interestRateStrategyAddress, uint128 accruedToTreasury, uint128 unbacked, uint128 isolationModeTotalDebt))",
      },
    },
  },
  'dorian': {
    methodology,
    core: {
      registry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      fromBlock: 15251455,
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'klaybank': {
    klaytn: {
      registry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'unleash': {
    methodology,
    sty: { registry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', isAaveV3Fork: true, isInsolvent: true },
  },
  'lendle': {
    mantle: {
      registry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      fromBlock: 56556,
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  // --- newly migrated aaveV2Export protocols ---
  'bonzo': {
    timetravel: false,
    methodology,
    hedera: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'takoTako': {
    methodology,
    taiko: {
      registry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      fromBlock: 381054,
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
}

// --- aaveExports based protocols ---
const aaveConfigs = {
  'the-granary': {
    methodology,
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    optimism: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    metis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'aave-arc': {
    ethereum: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'luckypeaches': {
    hemi: { dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    hyperliquid: { dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
  },
  'seamless': {
    methodology,
    base: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
  },
  'hyperlend': {
    hyperliquid: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
  },
  'radiant': {
    methodology,
    arbitrum: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'phiat': {
    methodology,
    pulse: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'sculptor-finance': {
    methodology,
    bsc: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'valas': {
    methodology,
    bsc: {
      addressesProviderRegistry: '0x99E41A7F2Dd197187C8637D1D151Dc396261Bc14',
      blacklistedTokens: [ADDRESSES.bsc.BUSD, ADDRESSES.bsc.BTUSD],
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      isInsolvent: true,
    },
  },
  'betterbank': {
    pulse: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      isInsolvent: true,
    },
  },
  'spark-fi': {
    ethereum: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
    xdai: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
  },
  // --- newly migrated aaveExports protocols ---
  'palomino-finance': {
    methodology,
    saga: {
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'haven1-hlend': {
    methodology: "Counts the tokens locked in Haven1 contracts that are used as collateral or to generate yield. Borrowed tokens are excluded, so only assets directly locked in the protocol are counted. This prevents inflating TVL through recursive lending.",
    haven1: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
  },
  'bitfire': {
    methodology,
    mezo: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      abis: {
        getAllATokens: "function getAllBTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
  },
  'betterlend': {
    pulse: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
  },
  'quokkalend': {
    morph: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'lendOS': {
    methodology,
    neon_evm: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
    hemi: {
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
  },
  'kinza': {
    methodology,
    bsc: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
    op_bnb: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
    mantle: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
    ethereum: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
  },
  'jolt': {
    methodology,
    optimism: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'hypurrfi': {
    methodology,
    hyperliquid: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
  },
  'harbor': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'extra-xlend': {
    optimism: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
    base: {
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
  },
  'dtrinity-dlend': {
    methodology,
    fraxtal: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
    sonic: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x614914B028A7D1fD4Fab1E5a53a3E2dF000bcB0e'],
    },
    ethereum: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0xb419ecdd222981e7e54cec316797ecb799c6afdc'],  // exclude dETH & dUSD
    },
  },
  'apebank': {
    apechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'yieldlend': {
    base: {
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'u235': {
    methodology,
    scroll: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
    },
  },
  'tropykus-zkevm': {
    methodology,
    polygon_zkevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'superlend': {
    methodology,
    etlk: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
  },
  'sio2': {
    methodology,
    astar: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      abis: {
        getAllATokens: "function getAllSTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
  },
  'seismic': {
    methodology,
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'roe': {
    ethereum: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
    polygon: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
    arbitrum: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'rhombus': {
    klaytn: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
  },
  'realtoken-rmm-v3': {
    methodology,
    xdai: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
  },
  'realtmarkets': {
    misrepresentedTokens: true,
    methodology,
    xdai: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      oracle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    },
  },
  'pu239': {
    methodology,
    map: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
  },
  'palmy': {
    methodology,
    oas: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      abis: {
        getAllATokens: "function getAllLTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
  },
  'mooncakefi': {
    linea: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    base: {
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'monolend': {
    methodology,
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'molend': {
    mode: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mahalend': {
    ethereum: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    arbitrum: {
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'lore': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'iolend': {
    methodology,
    iotaevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hana-finance': {
    taiko: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'hadouken-fi-lending': {
    godwoken_v1: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'glyph-fi': {
    fraxtal: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fathom-lending': {
    xdc: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      abis: {
        getAllATokens: "function getAllFmTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
  },
  'amply-finance': {
    methodology,
    cronos_zkevm: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
      v3: true,
    },
  },
  'magsinio': {
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'k613': {
    monad: {
      dataHelpers: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'meridian-lend': {
    telos: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      abis: {
        getAllATokens: "function getAllOTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
    meter: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      abis: {
        getAllATokens: "function getAllOTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
    fuse: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      abis: {
        getAllATokens: "function getAllOTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
    taiko: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      abis: {
        getAllATokens: "function getAllOTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
    tara: {
      addressesProviderRegistry: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      abis: {
        getAllATokens: "function getAllOTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
  },
  'blend-finance': {
    methodology,
    bevm: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      isInsolvent: true,
      abis: {
        getAllATokens: "function getAllBTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
    occ: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      isInsolvent: true,
      abis: {
        getAllATokens: "function getAllBTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
    arbitrum: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      isInsolvent: true,
      abis: {
        getAllATokens: "function getAllBTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
    base: {
      addressesProviderRegistry: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      dataHelpers: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      v3: true,
      isInsolvent: true,
      abis: {
        getAllATokens: "function getAllBTokens() view returns (tuple(string symbol, address tokenAddress)[])",
      },
    },
  },
}

module.exports = {
  ...buildProtocolExports(aaveV2Configs, aaveV2ExportFn),
  ...buildProtocolExports(aaveConfigs, aaveExportFn),
}
