const ADDRESSES = require('../projects/helper/coreAssets.json')
const { compoundExports2, methodology } = require('../projects/helper/compound')
const { mergeExports } = require('../projects/helper/utils')
const { buildProtocolExports } = require('./utils')
const { nullAddress } = require('../projects/helper/tokenMapping')

const chainExportKeys = new Set(['staking', 'pool2', 'borrowed', 'vesting'])

function compoundExportFn(chainConfigs) {
  const result = {}
  Object.entries(chainConfigs).forEach(([chain, config]) => {
    if (typeof config === 'string') {
      result[chain] = compoundExports2({ comptroller: config })
    } else if (Array.isArray(config)) {
      // Multiple comptrollers on the same chain - merge their exports
      const exports = config.map(c => {
        const compoundConfig = { ...c }
        for (const key of chainExportKeys) delete compoundConfig[key]
        return { [chain]: compoundExports2(compoundConfig) }
      })
      result[chain] = mergeExports(exports)[chain]
    } else {
      const compoundConfig = { ...config }
      for (const key of chainExportKeys) delete compoundConfig[key]
      result[chain] = compoundExports2(compoundConfig)
    }
  })
  return result
}

const configs = {
  'bencu': {
    metis: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'rho-markets': {
    methodology,
    scroll: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'quantus': {
    methodology: "Counts the tokens locked in the contracts to be used as collateral to borrow or to earn yield. Borrowed coins are not counted towards the TVL, so only the coins actually locked in the contracts are counted. There's multiple reasons behind this but one of the main ones is to avoid inflating the TVL through cycled lending.",
    monad: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
    megaeth: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'takara': {
    methodology,
    sei: {
      comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      blacklistedTokens: [
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      ],
    },
  },
  'peridot': {
    methodology: 'TVL is calculated by summing the underlying token balances of all markets in the Peridot lending protocol. Borrowed balances are also tracked separately.',
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    monad: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedMarkets: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'hover': {
    kava: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'enzo': {
    btr: { cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cetheEquivalent: ADDRESSES.btr.WBTC },
  },
  'jax-protocol': {
    taiko: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'capyfi': {
    lac: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    wc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'elara': {
    methodology,
    zircuit: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'basic': {
    iotex: { cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', comptroller: '0x47D7B83947Aa12fEb95f5f55527Dc9B32E4ec009', cetheEquivalent: ADDRESSES.iotex.WIOTX },
  },
  'whitehole-finance': {
    arbitrum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',  isInsolvent: true, abis: { getAllMarkets: 'address[]:allMarkets', totalBorrows: 'uint256:totalBorrow' } },
  },
  'loanshark': {
    scroll: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'kawa': {
    sei: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'jiblend': {
    jbc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'ionise-io': {
    zilliqa: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'blume-fm': {
    blast: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'basilisk': {
    era: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'asofinance': {
    blast: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'neku': {
    arbitrum: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    moonriver: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    bsc: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'nyke': {
    methodology,
    ethereumclassic: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'metalend': {
    ronin: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'olafinance': {
    fantom: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'orbiter-one': {
    moonbeam: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'torches': {
    kcc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'trustin': {
    btr: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'coslend': {
    evmos: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'huckleberry-lending': {
    moonriver: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'knightswap-lending': {
    methodology,
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'apeswap-lending': {
    methodology,
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'netweave-lending': {
    mode: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'forlend': {
    findora: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'lander': {
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'traderjoe-lend': {
    methodology: 'We count liquidity on the pairs and we get that information from the "traderjoe-xyz/exchange" subgraph. The staking portion of TVL includes the JoeTokens within the JoeBar contract.',
    avax: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'reactorfusion': {
    telos: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    era: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'deepr-finance': {
    methodology,
    shimmer_evm: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    iotaevm: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'tonpound': {
    methodology,
    ethereum: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'solidlizard-lending': {
    methodology: 'Same as Compound Finance, we just count all the tokens supplied (not borrowed money) on the lending markets',
    arbitrum: {
      comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
      pool2: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'teralend': {
    flare: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'strike': {
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'fenrirfinance': {
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'paribus': {
    arbitrum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'fusefi-lending': {
    hallmarks: [['2022-03-31', 'Ola Finance exploit']],
    fuse: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', isInsolvent: true },
  },
  'mendi-finance': {
    methodology: 'Same as Compound Finance, we just count all the tokens supplied (not borrowed money) on the lending markets',
    linea: {
      comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      staking: [['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'qie-lend': {
    qiev3: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  // === Newly migrated adapters below ===
  'tropykus': {
    misrepresentedTokens: true,
    rsk: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
  },
  'tashi': {
    methodology: 'Same as compound, we just get all the collateral (not borrowed money) on the lending markets',
    evmos: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'usdfi-lending': {
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'sumer': {
    meter: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    base: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    arbitrum: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    core: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    bsc: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: [] },
    berachain: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    hemi: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
    btr: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    goat: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    zklink: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    bsquared: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
    monad: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
  },
  'segment-finance': {
    methodology: 'Same as Compound Finance, we just count all the tokens supplied (not borrowed money) on the lending markets',
    op_bnb: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    bob: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    rsk: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    core: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0xb57A4b3ccE8d999A1e6B0357c0a31C3808401B42' },
    bsquared: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'compound-onchain': {
    hallmarks: [['2020-06-15', 'COMP distribution begins']],
    methodology: `${require('../projects/helper/methodologies').lendingMarket}. TVL is calculated by getting the market addresses from comptroller and calling the getCash() on-chain method to get the amount of tokens locked in each of these addresses, then we get the price of each token from coingecko.`,
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'cream': {
    timetravel: false,
    start: '2020-09-08',
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    bsc: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cetheEquivalent: ADDRESSES.bsc.WBNB, isInsolvent: true },
    polygon: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    arbitrum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    base: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  '0xLend': {
    kcc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
    era: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    blast: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'filda': {
    hallmarks: [['2023-04-24', 'Protocol was hacked']],
    heco: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    iotex: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    rei: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    polygon: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    arbitrum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    elastos: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    kava: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    bittorrent: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'lumen-money': {
    methodology: 'Same as Compound Finance, we just count all the tokens supplied (not borrowed money) on the lending markets',
    neon_evm: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'nebula': {
    nibiru: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'machfi': {
    sonic: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'liqee': {
    start: '2021-08-24',
    ethereum: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', abis: { getAllMarkets: 'address[]:getAlliTokens' } },
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', abis: { getAllMarkets: 'address[]:getAlliTokens' } },
  },
  'ironbank': {
    start: '2020-09-08',
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true, blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
    fantom: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
    avax: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    optimism: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'wepiggy': {
    methodology: 'TVL is comprised of tokens deposited to the protocol as collateral, similar to Compound Finance and other lending protocols the borrowed tokens are not counted as TVL.',
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    okexchain: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    bsc: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    polygon: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    heco: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    arbitrum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    optimism: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    moonriver: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    harmony: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    oasis: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    aurora: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    moonbeam: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'wemix-lend': {
    wemix: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'vivacity': {
    canto: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'zkfox': {
    era: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'OCP': {
    hallmarks: [['2022-02-14', 'Project abandoned by the team']],
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
  },
  'fluxfinance': {
    methodology: `${require('../projects/helper/methodologies').lendingMarket}. TVL is calculated by getting the market addresses from comptroller and calling the getCash() on-chain method to get the amount of tokens locked in each of these addresses, then we get the price of each token from coingecko.`,
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'cozy': {
    methodology: 'Count tokens the same way we count for compound',
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'aurigami': {
    aurora: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cetheEquivalent: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'novation': {
    blast: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', abis: { getAllMarkets: 'address[]:allMarkets', totalBorrows: 'uint256:totalBorrow' } },
  },
  'damm-finance': {
    methodology: 'Same as Compound Finance, we just count all the tokens supplied (not borrowed money) on the lending markets',
    hallmarks: [['2022-10-05', 'Liquidity Bonding Start']],
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'canto-lending': {
    hallmarks: [['2022-08-25', 'Remove canto dex LPs from tvl computation']],
    canto: {
      comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      cetheEquivalent: ADDRESSES.canto.WCANTO,
      blacklistedTokens: [
        ADDRESSES.canto.NOTE,
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      ],
    },
  },
  'bao-markets': {
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0xf635fdf9b36b557bd281aa02fdfaebec04cd084a', cetheEquivalent: nullAddress, blacklistedTokens: ['0xe7a52262c1934951207c5fc7a944a82d283c83e5', '0xc0601094C0C88264Ba285fEf0a1b00eF13e79347'] },
  },
  'venus': {
    bsc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    op_bnb: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    arbitrum: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    era: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    base: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    optimism: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    unichain: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'zenolend': {
    apechain: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    unichain: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    soneium: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    sty: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    hemi: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'mare-finance-v2': {
    methodology: 'Same as Compound Finance, we just count all the tokens supplied (not borrowed money) on the lending markets',
    kava: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'unitus': {
    start: '2019-07-26',
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', abis: { getAllMarkets: 'address[]:getAlliTokens' }, blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    bsc: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', abis: { getAllMarkets: 'address[]:getAlliTokens' }, blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    arbitrum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', abis: { getAllMarkets: 'address[]:getAlliTokens' }, blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
    optimism: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', abis: { getAllMarkets: 'address[]:getAlliTokens' }, blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
    polygon: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', abis: { getAllMarkets: 'address[]:getAlliTokens' }, blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
    conflux: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', abis: { getAllMarkets: 'address[]:getAlliTokens' }, blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    base: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', abis: { getAllMarkets: 'address[]:getAlliTokens' }, blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
  },
  'minterest': {
    hallmarks: [
      ['2023-02-23', 'MINTY distribution begins on Ethereum'],
      ['2024-01-04', 'MINTY distribution begins on Mantle'],
      ['2024-05-31', 'MINTY distribution begins on Taiko'],
      ['2025-02-19', 'MINTY distribution begins on Morph'],
    ],
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    mantle: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    taiko: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    morph: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'hundredfinance': {
    hallmarks: [['2023-04-15', 'Protocol hacked (oc Optimism)']],
    ethereum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
    arbitrum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', isInsolvent: true },
    fantom: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', isInsolvent: true },
    harmony: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
    moonriver: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', isInsolvent: true },
    xdai: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', isInsolvent: true },
    polygon: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
    optimism: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', isInsolvent: true },
  },
  'tender-finance': {
    methodology: 'Same as compound, we just get all the collateral (not borrowed money) on the lending markets.',
    arbitrum: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cetheEquivalent: ADDRESSES.arbitrum.WETH },
  },
  'paxo-finance': {
    methodology: `${require('../projects/helper/methodologies').lendingMarket}. TVL is calculated by getting the market addresses from comptroller and calling the getCash() on-chain method to get the amount of tokens locked in each of these addresses.`,
    polygon: {
      comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    xdc: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    linea: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    boba: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'sonne-finance': {
    optimism: {
      comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      isInsolvent: true,
      staking: [['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    base: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  },
  'moonwell': {
    hallmarks: [['2022-08-01', 'Nomad Bridge Exploit']],
    moonbeam: {
      comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
    base: {
      comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
    optimism: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ethereum: { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
  },
  'moonwell-apollo': {
    moonriver: {
      comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'donkey': {
    ethereum: {
      comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      staking: [['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    klaytn: { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', isInsolvent: true },
  },
  'onyx': {
    ethereum: {
      comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      isInsolvent: true,
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  // === Array configs (multiple comptrollers on same chain) ===
  'zoro': {
    era: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ],
  },
  'kinetic': {
    flare: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    ],
  },
  'tectonic': {
    cronos: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ],
  },
  'mage': {
    methodology,
    merlin: [
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ],
  },
  'keom': {
    polygon_zkevm: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ],
    polygon: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    ],
    manta: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    ],
    astrzk: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    ],
  },
  'orbitlending-io': {
    blast: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], isInsolvent: true },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], isInsolvent: true },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], isInsolvent: true },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], isInsolvent: true },
    ],
  },
  'wanlend': {
    methodology,
    wan: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cetheEquivalent: ADDRESSES.wan.WWAN, isInsolvent: true },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cetheEquivalent: ADDRESSES.wan.WWAN },
    ],
  },
  'demeter': {
    bsc: [{ comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', },],
    heco: [{ comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', },],
  },
  'midas-capital': {
    bsc: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ],
    moonbeam: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ],
    polygon: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
    ],
    arbitrum: [
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ],
  },
  'bastion': {
    aurora: [
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', cether: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', cetheEquivalent: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
      { comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
    ],
  },
  'xpert': {
    ink: [{ comptroller: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' }],
    base: [{ comptroller: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' }],
  }
}

module.exports = buildProtocolExports(configs, compoundExportFn)
