const ADDRESSES = require('../projects/helper/coreAssets.json')
const { getUniTVL } = require('../projects/helper/unknownTokens')
const { buildProtocolExports } = require('./utils')

const _chainExtraKeys = new Set(['factory', 'tvl', 'staking', 'pool2', 'borrowed', 'vesting', 'hallmarks'])

// V2 wrapper: normalizes chain configs (string factory or { factory, ...extras }) for getUniTVL
function uniV2ExportFn(chainConfigs, options = {}) {
  const result = {
    methodology: 'Value of the tokens locked in the liquidity pools.',
  }
  Object.entries(chainConfigs).forEach(([chain, config]) => {
    if (typeof config === 'string') {
      result[chain] = { tvl: getUniTVL({ factory: config, useDefaultCoreAssets: true, ...options }) }
    } else {
      const chainOpts = {}
      for (const [k, v] of Object.entries(config)) {
        if (!_chainExtraKeys.has(k)) chainOpts[k] = v
      }
      result[chain] = { tvl: getUniTVL({ factory: config.factory, useDefaultCoreAssets: true, ...options, ...chainOpts }) }
    }
  })
  return result
}

const uniV2Configs = {
  '1pulse': {
    pulse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  '3xcalibur': {
    hallmarks: [
      ['2022-11-10', 'Emissions started'],
    ],
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  '9mm-v2': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    pulse: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'aborean': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    abstract: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'aceofbase': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'adenafinance': {
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'aerodrome': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'agsfinance': {
    astar: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'agus': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Akitaswap': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'akronswap': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'alienbase-area51': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'allinxswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'alphadex': {
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    moonriver: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'amaterasu': {
    aurora: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ancora': {
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'andromeada': {
    _options: {
      hasStablePools: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'aquas-trade': {
    europa: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'arbiswap': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'arbswap': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    arbitrum_nova: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'archerswap': {
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'arena-dex': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'areon-swap': {
    area: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'artexswap_xyz': { artela: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', },
  'sheriff-v2': { robinhood: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', },
  'astarexchange': {
    astar: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'eticahub': {
    etica: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
  },
  'asteroneo': {
    neox: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'astroswap': {
    _options: {
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',],
    },
    velas: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'auragi-finance': {
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'autotronic': {
    start: '2023-08-24',
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'baguette': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bahamut-dex': {
    ftn: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'BallExchange': {
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'balloonswap': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'baoswap': {
    xdai: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'basefinance-v1': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'baseswap': {
    _options: {
      permitFailure: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'baso': {
    _options: {
      hasStablePools: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'BBQSwap': {
    ham: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'beam-swap': {
    beam: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'beracaine': {
    berachain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bescswap': {
    besc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'BetterSwap': {
    vechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bevmswap-xyz': {
    bevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'binaryswap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'biokript': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bitgenie-dex': {
    merlin: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bitgert-swap': {
    bitgert: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bitswap-bb-v2': {
    bouncebit: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'blackhole': {
    _options: {
      hasStablePools: true,
    },
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'blaspace': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'blastdex': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'blasterswap-v2': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'blazeswap': {
    flare: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    songbird: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Blinkswap': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bluelotusdao': {
    genesys: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bluemeteor': {
    pulse: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'BombFinance': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bonedex': {
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'boomswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'boss-swap': {
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bourbon': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'brewswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'brise-swap': {
    bitgert: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'BroSwap': {
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'brownfi': {
    berachain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bswap': {
    chainx: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bulbaswap-v2': {
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0xff12470a969Dd362EB6595FFB44C82c959Fe9ACc'],
    },
    morph: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bullionFX': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'busta': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bwswap': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bxh': {
    heco: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    okexchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cakewwap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'camelot': {
    start: '2022-11-22',
    apechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    duckchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    gravity: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    occ: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    rari: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    reya: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    // sanko: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', // chain was down from 2026-03-07
    spn: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    xai: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'candyswap': {
    meer: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'canto-dex': {
    _options: {
      hasStablePools: true,
    },
    canto: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'canto-forte': {
    canto: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cantoswap': {
    canto: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'capitaldex': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    curio: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'capricorn': {
    cube: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'capx': {
    capx: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'carbonswap': {
    energyweb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'carrotswap': {
    neox: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ceto-swap': {
    manta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ChewySwap': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    shibarium: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'chickendefi': {
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'chiliswap': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'chilizswap': {
    chz: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'chimeradex': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Chocoinu': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'chronos': {
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ciento': {
    planq: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'CirclePacific': {
    manta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'citadelswap': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cl-dex': {
    klaytn: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'clever-protocol': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cobraswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'coinswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'comet-swap-v2': {
    astar: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'comfyswap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'complus': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    heco: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cone': {
    _options: {
      hasStablePools: true,
    },
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'convergence': {
    start: '2021-05-17',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    moonbeam: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cookiebase': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'coreswap': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'crodex': {
    cronos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cronus': {
    evmos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'crowfi': {
    _options: {
      '0': 'c',
      '1': 'r',
      '2': 'o',
      '3': 'n',
      '4': 'o',
      '5': 's',
    },
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'crust-finance': {
    _options: {
      hasStablePools: true,
    },
    mantle: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cuanswap': {
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cubiswap': {
    _options: {
      permitFailure: true,
    },
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cyberblast-v2': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cypher-v2': {
    start: '2025-11-22',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'daiko-dex': {
    deadFrom: '2024-06-07',
    hallmarks: [
      ['2024-06-07', 'Rug Pull'],
    ],
    taiko: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dalmatiandex': {
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'daoaas-swap': {
    eni: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'daomaker-swap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'darkswap': {
    dogechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dbx-finance': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'defi-swap': {
    start: '2020-09-08',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'definix': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    klaytn: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'degendex-fi': {
    degen: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'degenswap': {
    degen: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Dexland': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dexswap-arbi': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dfs-v2': {
    xlayer: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dfyn': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    okexchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dinosaureggs': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'direct-exchange': {
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'diviswap': {
    chz: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dmusk': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'DogeShrek': {
    hallmarks: [
      ['2023-10-25', 'Rebranded as Chewyswap'],
    ],
    deadFrom: '2023-10-25',
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dogswap': {
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dojoswap-ancient8': {
    ancient8: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'donkeswap': {
    sei: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'doveswap': {
    polygon_zkevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dracula-era': {
    _options: {
      hasStablePools: true,
    },
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dragonswap': {
    klaytn: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dragonswap-sei': {
    sei: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dtx-dex': {
    taiko: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'duckydefi': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'duneswap': {
    oasis: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dynastyswap-xyz': {
    pulse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dystopia': {
    _options: {
      hasStablePools: true,
    },
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'echodex': {
    linea: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'eggtartswap': {
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'electroswap-v2': {
    etn: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'elephantdex': {
    harmony: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ElonSwap': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'elvesdex': {
    _options: {
      permitFailure: true,
    },
    alv: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'elysiumswap': {
    elsm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'empiredex': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    empire: { tvl: () => ({}) },
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    xdai: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'energiswap': {
    energi: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'energyfi': {
    moonbeam: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'esper-finance': {
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'etcmcv2': {
    ethereumclassic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'etcswap': {
    ethereumclassic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'eteria': {
    eteria: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ethervista': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ethwswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'excalibur': {
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fairyswap': {
    findora: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fairyswap-v2': {
    findora: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fathom-dex': {
    xdc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fcondex': {
    deadFrom: '2024-01-07',
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fedex': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fenix-v2': {
    _options: {
      hasStablePools: true,
    },
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fizzswap-v2': {
    silicon_zk: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'flair-dex': {
    _options: {
      hasStablePools: true,
    },
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'FlashLiquidity': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon_zkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'flashpulse': {
    pulse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'FlitSwap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'flow-swap-v2': {
    flow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fluxusbase': {
    _options: {
      hasStablePools: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'FomoSwap': {
    tara: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'foodcourt': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    reichain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'forge-sx-dex': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fourdex': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'freeriver': {
    moonriver: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'frogswap': {
    degen: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fstswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'funbeast': {
    astar: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fuseon': {
    _options: {
      hasStablePools: true,
    },
    plasma: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fusionx-fi': {
    mantle: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fvm': {
    _options: {
      hasStablePools: true,
    },
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fwx-dex': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fxswap': {
    functionx: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'galador-io': {
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gammaswap-deltaswap': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Gas404Swap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gassss': {
    stable: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gassswap': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gasturbo-io-dex': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'gemswap': {
    hallmarks: [
      ['2023-04-14', "Rug Pull"]
    ],
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ghost-ex': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ginfinance': {
    boba: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'globiancedex': {
    xdc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gloom': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'goatswap-v2': {
    goat: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'GoSwap': {
    gochain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'gravis-finance': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    heco: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gravity-finance': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'greenhouse': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'grokswap': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'grxswap': {
    grx: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gt3': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gullnetwork-amm': {
    manta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gxypad': {
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'h2-finance': {
    cronos_zkevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hamburger': {
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hebeswap': {
    _options: {
      skipUnknownTokens: true,
    },
    ethereumclassic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'heraswap': {
    onus: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hercules-v2': {
    metis: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hexaswap': {
    telos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hippowswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hiveswap': {
    map: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'honeyswap': {
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x8db0a6d1b06950b4e81c4f67d1289fc7b9359c7f'],
    },
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    xdai: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hope-swap': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hopswap': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hpdex': {
    hpb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hunnyswap': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hybra-v2': {
    _options: {
      hasStablePools: true,
    },
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'HyperBlast': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hyperjump': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    metis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hyperpie-v2-dex': {
    _options: {
      hasStablePools: true,
    },
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hyperswap-v2': {
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hypertrade-v2': {
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hyperdrome': {
    _options: {
      hasStablePools: true,
    },
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'iceswap': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'iguana-v2': {
    etlk: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'in_dex': {
    hsk: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'incaswap': {
    matchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'infusion': {
    _options: {
      hasStablePools: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'inkswap': {
    ink: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'inkyswap': {
    ink: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'inswap': {
    xlayer: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'integral': {
    _options: {
      abis: {
        getReserves: 'function getReserves() view returns (uint112 _reserve0, uint112 _reserve1)',
      },
    },
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'issuaa': {
    _options: {
      hasStablePools: true,
      fetchBalances: true,
    },
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'JaceSwap': {
    _options: {
      hasStablePools: true,
    },
    xlayer: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'jellybeanswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'jibswap': {
    jbc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'joc': {
    joc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'jswap-finance': {
    okexchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'juggler-red': {
    optimism: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'julswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'jumpdefi': {
    telos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'jupiterswap': {
    hallmarks: [
      ['2022-08-15', "incentives not given"]
    ],
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'justmoney': {
    bittorrent: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    tron: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kapaswap': {
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kapinus': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kasavadex': {
    hallmarks: [
      ['2022-08-15', "incentives not given"]
    ],
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kaspacom-dex': {
    kasplex: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    igra: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'katana-ronin': {
    hallmarks: [
      ['2022-05-28', "Ronin Bridge Hack $625m"],
    ],
    ronin: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'katanaswap': {
    zeta: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kayen': {
    chz: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kdex': {
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kewl': {
    chz: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kim-v2': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    mode: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kinetix-v2': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kittenswap': {
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kittypunch': {
    flow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'frothswap': {
    robinhood: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kittypunch-kona-v2': {
    abstract: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kizuna': {
    mode: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'knightdex': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kodiak-v2': {
    berachain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kodo-exchange': {
    _options: {
      hasStablePools: true,
    },
    taiko: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'koffeeswap': {
    kcc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kokomoswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'koone': {
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kswap': {
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kswapfinance': {
    okexchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kuraswap-legacy': {
    _options: {
      hasStablePools: true,
    },
    sei: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kuswap': {
    kcc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'laserswap': {
    thundercore: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'LemonBlast': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lfgswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lfgswap-arbitrum': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lfgswap-xlayer': {
    xlayer: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'linehub-v2': {
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'linkswap': {
    zklink: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'liquid-bolt': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Liquify': {
    _options: {
      hasStablePools: true,
    },
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Liquify-Manta': {
    _options: {
      hasStablePools: true,
    },
    manta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lithos': {
    plasma: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'LizardExchange': {
    oasis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lobsterswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    ozone: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lootswap': {
    hallmarks: [
      ['2022-06-23', "Horizon bridge Hack $100m"],
    ],
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lotusdex-v2': {
    mantra: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lovelyswap-v2': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'luaswap': {
    _options: {
      permitFailure: true,
    },
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    tomochain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'LuigiSwap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'lydia': {
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'machinex-legacy': {
    _options: {
      hasStablePools: true,
    },
    peaq: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'madness-finance': {
    monad: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'magicfox': {
    _options: {
      hasStablePools: true,
    },
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'magicianmv': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ManaSwap': {
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mantaswap': {
    hallmarks: [
      ['2023-10-09', "Rug Pull"]
    ],
    manta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'manxswap': {
    manta: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mateswap-xyz': {
    lac: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'megalon': {
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'melegaswap': {
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x963556de0eb8138e97a85f0a86ee0acd159d210b'],
    },
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'memebox-fi': {
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'memedex': {
    conflux: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'meridian-swap': {
    telos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'metavault-amm-v2': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    linea: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'metropolis-exchange-amm': {
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mezo-tigris': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    mezo: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'miaswap': {
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0xff276c6bca1f66fd54a8915e830735d6ab0c7b09'],
    },
    onus: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mimoswap': {
    iotex: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'minerswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'minidex': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'moai-fi-v2': {
    xrplevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mobiusdex-xyz': {
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mobydex': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'modemax-dex': {
    mode: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'modeswap': {
    mode: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'modSwapDefi': {
    mode: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'monoswap-v2': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'moonlift': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'moonswap': {
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    moonriver: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mswap': {
    matchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mtt-dex': {
    mtt_network: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'multex': {
    shape: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mustcometh': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mversex': {
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'nanoswap': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'narwhalswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'nearpad': {
    aurora: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'neptunex': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'tamaswap': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    // base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'nest-platform-v2': {
    _options: {
      hasStablePools: true,
    },
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'netswap': {
    metis: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'nexus-dex': {
    xdc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'niifi': {
    nahmii: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'nowswap': {
    hallmarks: [
      ['2021-09-15', "Hacked"]
    ],
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'noxa-fi': {
    abstract: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    megaeth: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    berachain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    somnia: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    '0g': '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    plasma: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    stable: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    katana: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'oaswap': {
    oasis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ocelex-v1': {
    _options: {
      hasStablePools: true,
    },
    zircuit: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ocelot-dex': {
    zeta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'octopow': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'octoswap-classic': {
    monad: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'okcswap': {
    okexchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'okieswap-v2': {
    xlayer: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'okutrade-goat': {
    goat: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'omaxswap': {
    omax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'omni-exchange-v2': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    optimism: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    plasma: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'omnidex': {
    telos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Omnidrome': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    zeta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'onavax': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'onionswap': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'onsenswap': {
    start: '2023-04-22',
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'oolongswap': {
    hallmarks: [
      ['2022-07-20', "Alameda Research exits"],
    ],
    boba: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'oortswap': {
    rei: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'OpankeSwap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'opbanana': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'openex': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'openswap': {
    rss3_vsl: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'openswap_harmony': {
    hallmarks: [
      ['2022-06-23', "Horizon bridge Hack $100m"],
    ],
    _options: {
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']
    },
    harmony: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'OreSwap': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pacificswap': {
    manta: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pandaswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pandora-digital': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pandoraswap': {
    astar: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pankuku': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pantherswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'papyrusswap': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'paraluni-dex': {
    hallmarks: [
      ['2022-05-02', 'launch new dex'],
    ],
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'parity-dex': {
    _options: {
      hasStablePools: true,
    },
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'PattieSwap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pearlfi': {
    _options: {
      hasStablePools: true,
    },
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pegasys': {
    syscoin: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pepedex': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'perfectswap': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pheasantswap': {
    enuls: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    deadFrom: '2026-02-11'
  },
  'phenix-dex': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'photonswap': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    evmos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'PinSwap': {
    iotex: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'piperx-v2': {
    sty: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pixelswap': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    linea: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'planar-finance': {
    start: '2024-05-10',
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'planet-blue': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pls2e': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'plunderswap': {
    zilliqa: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'polydex': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'polyDEX-cryption-network': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pond': {
    fuse: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ponyswap': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'PoorExchange': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'potatoswap': {
    xlayer: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'powerswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'PowSea': {
    ethpow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'powswap': {
    ethpow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'printy': {
    _options: {
      hasStablePools: true,
    },
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Produs': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'protofi': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'PulseGun': {
    pulse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pulsex': {
    pulse: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pumex': {
    _options: {
      hasStablePools: true,
    },
    injective: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'punkswap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    shibarium: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pureswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'purple-bridge-dex': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'purps': {
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pyeswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'quillswap': {
    hallmarks: [
      ['2023-10-24', 'Liquidity Removed'],
    ],
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'raccoonswap': {
    parex: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'rcpswap': {
    arbitrum_nova: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'reactor': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'redemption': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'reservoir-tools-v2': {
    abstract: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    zero_network: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ink: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'revoswap': {
    xlayer: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'rexdex': {
    wan: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'rocketswap-anubis': {
    methodology: 'TVL is calculated from RocketSwap AMM liquidity pools using the Uniswap V2 factory.',
    anubi: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'rocketswap-cc': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'rskswap': {
    rsk: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ruby-exchange': {
    europa: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'safeswap': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'saharaexchange': {
    oasis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'saitaswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sanctuary': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sandyswap': {
    _options: {
      hasStablePools: true,
    },
    polygon_zkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'saru': {
    apechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'satin': {
    _options: {
      hasStablePools: true,
    },
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'satoshiswap': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'saucerswap': {
    hedera: '0x0000000000000000000000000000000000103780',
  },
  'savmdex': {
    bevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'savmswap': {
    svm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    prom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sboomfi': {
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'scribeswap': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'scrollswap': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'scrollswapfinance': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sealightswap': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'seascape': {
    moonriver: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'secta-v2': {
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'seedfi-amm': {
    sseed: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'settlex-v2': {
    stable: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sevenswap': {
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shadow-legacy': {
    _options: {
      hasStablePools: true,
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'shadowswap': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shapeswap-v2': {
    shape: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sharelock': {
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sharkswap': {
    sx: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    sxr: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sharkswap-finance': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'shekelswap': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Shibafantom': {
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shibanova': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'shibaswap': {
    _options: {
      blacklistedTokens: [
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'
      ],
    },
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    shibarium: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shibbex': {
    shibarium: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shibshift': {
    pulse: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shimmersea': {
    shimmer_evm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    iotaevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shinobi': {
    ubiq: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sideswap-fi': {
    zkfair: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'silkswap': {
    ftn: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'skullswap': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'smartdex': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'snap-v2': {
    tac: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'solarflare': {
    moonbeam: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'solidblast': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'solidex-finance-v2': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
      permitFailure: true,
    },
    cronos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'solidlizard': {
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'solidly': {
    _options: {
      hasStablePools: true,
    },
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Solidpulse': {
    _options: {
      hasStablePools: true,
    },
    pulse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'solunea': {
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'someswap': {
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'somnex-xyz': {
    somnia: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'somnia-exchange': {
    somnia: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sonefi-xyz': {
    soneium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sonic-market-amm': {
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sonicswap': {
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sonicxswap': {
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sonusexchange': {
    soneium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'soswap': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spacefi': {
    evmos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'spacefi-scroll': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spacefi-zksync': {
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sparkdex-v2': {
    flare: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spartacus-exchange': {
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'spartadex': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spinaqdex': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spookyswap': {
    bittorrent: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    eon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spoon-exchange': {
    _options: {
      hasStablePools: true,
    },
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'squidswap': {
    ink: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'stableswap': {
    _options: {
      hasStablePools: true,
    },
    stable: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'stableswap-dex': {
    _options: {
      hasStablePools: true,
    },
    stable: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'stableswap-xyz': {
    stable: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'standard-tech': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    metis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    shiden: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'starmaker': {
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'step-exchange': {
    step: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sterling-finance': {
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'straxswap': {
    stratis: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sumswap': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sunflowerswap': {
    moonbeam: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'supernova': {
    _options: {
      hasStablePools: true,
    },
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'superswap-v2': {
    _options: {
      permitFailure: true,
    },
    optimism: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'supswap-v2': {
    mode: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'surfswap': {
    hallmarks: [
      ['2022-08-15', "incentives not given"]
    ],
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swanswap': {
    shape: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swapbase': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swapblast': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'SwapMode': {
    mode: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swapos': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'swapp': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swapperchan': {
    boba: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swappi': {
    conflux: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swapx': {
    xone: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'SwapX-v2': {
    _options: {
      hasStablePools: true,
    },
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'SweetSwap': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swipeswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'swyrl-legacy': {
    _options: {
      hasStablePools: true,
    },
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tachyswap': {
    etlk: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'taffy': {
    saakuru: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'TAKOSWAP': {
    ogpu: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tarina': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tealswap': {
    oas: '0x5200000000000000000000000000000000000018',
  },
  'tenx-exchange': {
    tenet: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'tetu-swap': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'themis-capital-dex': {
    filecoin: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'thena': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'thetaswap': {
    theta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'throne-v2': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'titano-swych': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tokan-exchange': {
    _options: {
      hasStablePools: true,
    },
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tomb-swap': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Torr-Finance': {
    bittorrent: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'torusfarm': {
    _options: {
      permitFailure: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tropicalswap': {
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'turtleswap': {
    vechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ubeswap': {
    celo: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ucs-finance': {
    unichain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ultrasolid-v2': {
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'unicly': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'uniwswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'upheaval-v2': {
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'usesugarswap': {
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'uswap-me': {
    tron: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'v2swap': {
    _options: {
      permitFailure: true,
    },
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'valleyswap': {
    hallmarks: [
      ['2023-04-17', "Remove Fake USDT"],
      ['2022-06-03', "EvoDefi bridge depeg"]
    ],
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    oasis: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'vanillaswap-v2': {
    defichain_evm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'vapordex': {
    apechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    telos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'VAX': {
    multivac: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'velocimeter-v2': {
    _options: {
      hasStablePools: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    canto: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    mantle: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    pulse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'velocimeter-v4': {
    _options: {
      hasStablePools: true,
    },
    iotaevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'velodrome': {
    hallmarks: [
      ['2022-07-14', 'First OP grant awarded'],
      ['2022-08-04', 'Loss $350k Operational Funds'],
    ],
    _options: {
      hasStablePools: true,
    },
    optimism: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'veniceswap': {
    findora: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'venuSwap': {
    zkfair: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'veplus': {
    _options: {
      hasStablePools: true,
    },
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'veRocket': {
    vechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'versa': {
    astar: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'vexchange': {
    vechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'virbicoin-dex': {
    _options: {
      fetchBalances: true,
    },
    virbicoin: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'VoltageSwap': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'voltswap': {
    meter: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    theta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'voltswap-v2': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    meter: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'vulcandex': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'vultureswap': {
    cronos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'vvs-finance': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'wagyuswap': {
    _options: {
      blacklistedTokens: [
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      ],
    },
    velas: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'wakafinance': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'weero-v2': {
    _options: {
      fromBlock: 184616686,
    },
    klaytn: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'wemix-fi': {
    wemix: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'winery-swap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'woken': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'woof': {
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'woofswap': {
    _options: {
      hasStablePools: true,
    },
    shibarium: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'woofswapGL': {
    _options: {
      hasStablePools: true,
    },
    gatelayer: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'xbased': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'XDX': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'xenwave': {
    btn: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'xops-finance': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'xrise33': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    xrplevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'xspswap': {
    xdc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'xswap': {
    crossfi: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'yakafinance': {
    sei: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'yapeswap': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'yetiswap': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'yoshi-exchange': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'youswap': {
    heco: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'yumiswap': {
    astar: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zappy': {
    telos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Zebra': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zedaswap': {
    zeta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zena-v2': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zeniq-swap': {
    zeniq: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Zenonswap': {
    degen: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zerodex': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zkdefi': {
    polygon_zkevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zkfairswap': {
    zkfair: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zkmoonswap': {
    polygon_zkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zkswap-2': {
    hallmarks: [
      ['2024-01-10', "Whale Withdraw"]
    ],
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    zkfair: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zoodex': {
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zprotocol-dex': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zswap-plus': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },

  // --- Migrated simple getUniTVL adapters ---
  'GlyphExchange': {
    core: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'KibbleSwap': {
    dogechain: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owner: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true } },
  },
  'Kwikswap': {
    ethereum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
    polygon: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "polygon"] },
    shiden: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "shiden", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Velocimeter': {
    _options: { hasStablePools: true },
    canto: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "canto"] },
  },
  'Viridian': {
    _options: { hasStablePools: true },
    core: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'afraswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "wbnb"] },
  },
  'alienbase': {
    base: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'alienfi': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { tokensAndOwners: [['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
  },
  'alita-finance': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'aliumswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: [["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'ampleswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
    alv: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    dsc: { tvl: () => ({}) },
  },
  'apeswap-amm': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], "bsc"] },
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    telos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'arthswap': {
    astar: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'babydogeswap': {
    _options: {
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'babyswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'biswap': {
    hallmarks: [
      ['2022-05-07', 'UST depeg'],
    ],
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'bscswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'burgerswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'cafeswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
    polygon: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "polygon", "bsc:0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'canary': {
    avax: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'candycity': {
    cronos: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], vesting: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'casinocronos': {
    cronos: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'champagne-swap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'claimswap': {
    klaytn: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'cleopatra-exchange-v1': {
    _options: { hasStablePools: true, stablePoolSymbol: 'crAMM' },
    mantle: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'cowswap-cash': {
    smartbch: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cronaswap': {
    _options: {
      blacklistedTokens: ['0x5b5fe1238aca91c65683acd7f9d9bf922e271eaa'],
    },
    cronos: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'cryptoswap': {
    start: '2022-05-02',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'crystalvale': {
    dfk: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "dfk", "defi-kingdoms-crystal", 18] },
  },
  'currentx': {
    _options: { coreAssets: [ADDRESSES.optimism.WETH_1] },
    megaeth: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dddx': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'dogmoney': {
    dogechain: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owner: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true } },
  },
  'equilibre': {
    _options: { hasStablePools: true },
    kava: {
      factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], blacklistedPools: [
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
      ]
    },
  },
  'etcmc': {
    ethereumclassic: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { tokensAndOwners: [['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1']], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true } },
  },
  'etherex-legacy': {
    _options: { hasStablePools: true, stablePoolSymbol: 'cAMM' },
    linea: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ezkalibur': {
    start: '2023-06-09',
    era: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "weth"] },
  },
  'fatex': {
    polygon: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'galoswap': {
    _options: { hasStablePools: true },
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'gemkeeper': {
    oasis: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'gibxswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'glacier-finance': {
    _options: { hasStablePools: true },
    avax: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'glide-finance': {
    elastos: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "elastos"] },
  },
  'groveswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    grove: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hermes': {
    harmony: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true, lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
  },
  'honkswap': {
    smartbch: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'huckleberry': {
    moonriver: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owner: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true } },
    clv: { tvl: () => ({}) },
  },
  'ifswap': {
    csc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'illuminex': {
    start: '2024-01-28',
    sapphire: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "oasis-network", true] },
  },
  'kaoyaswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'keller': {
    _options: { hasStablePools: true },
    scroll: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'kryptodex': {
    cronos: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "crypto-com-chain"] },
  },
  'kyotoswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'leetswap': {
    polygon_zkevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    canto: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    op_bnb: ADDRESSES.shibarium.BONE_4,
    base: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', hasStablePools: true, stablePoolSymbol: 'sLS2' },
    manta: ADDRESSES.shibarium.BONE_4,
    scroll: ADDRESSES.shibarium.BONE_4,
  },
  'leonicornswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"]] },
  },
  'lfgswap-core': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'merchant-moe': {
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mindgames': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owner: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], coreAssets: [ADDRESSES.arbitrum.USDC], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
  },
  'mistswap': {
    smartbch: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "smartbch", "mistswap", 18] },
  },
  'mm-finance': {
    _options: {
      blacklistedTokens: [
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      ],
    },
    cronos: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'mm-finance-arbitrum': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'mm-finance-polygon': {
    polygon: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'mochiswap': {
    hallmarks: [
      [["2022-06-23", "Horizon bridge Hack $100m"]],
    ],
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
    harmony: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], },
  },
  'moonbase': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'moonbase-app': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'moonchainswap': {
    mxczkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'yuzuswap': { oasis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  'moraswap': {
    _options: { queryBatched: 10, waitBetweenCalls: 1000 },
    neon_evm: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'mute': {
    _options: { hasStablePools: true, stablePoolSymbol: 'sMLP' },
    era: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"]] },
  },
  'neuronswap': {
    timetravel: false,
    klaytn: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], owner: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true } },
  },
  'newswap': {
    new: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'nile-exchange-v1': {
    _options: { hasStablePools: true, stablePoolSymbol: 'cAMM' },
    linea: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'nuri-exchange-v1': {
    _options: { hasStablePools: true, stablePoolSymbol: 'crAMM' },
    scroll: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0xAAAE8378809bb8815c08D3C59Eb0c7D1529aD769"] },
  },
  'omniswap': {
    nibiru: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'oni': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x6c77BB19C69d66bEA9E3CDAea108A76eA8D2Fd2A", "0x7A070189A28875aC936F517A9d452248619F0CA6"] },
  },
  'openxswap': {
    optimism: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'oracleswap': {
    songbird: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "songbird"] },
  },
  'orbitalswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'paintswap': {
    fantom: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: [["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'partyswap': {
    avax: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "avalanche-2"] },
  },
  'pharaoh-exchange-v1': {
    _options: { hasStablePools: true, stablePoolSymbol: 'crAMM' },
    avax: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'pharaoh-exchange-v3-legacy': {
    _options: { hasStablePools: true, stablePoolSymbol: 'Stable' },
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pinkswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'polycat-dex': {
    polygon: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'ponder': {
    _options: { fetchBalances: true },
    bitkub: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "bitkub", "ethereum:0xe0432224871917fb5a137f4a153a51ecf9f74f57"] },
  },
  'quantoswap': {
    ethereum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'ramses': {
    _options: { hasStablePools: true, stablePoolSymbol: 'crAMM' },
    arbitrum: { factory: '0xAAA20D08e59F6561f242b08513D36266C5A29415', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'ramses-legacy-v2': {
    _options: { hasStablePools: true, stablePoolSymbol: 'cAMM' },
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sharkyswap': {
    arbitrum: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'shibance': {
    kcc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'smartdexbch': {
    smartbch: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "bitcoin-cash", false, 18] },
  },
  'smbswap': {
    start: '2022-02-19',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'smolswap': {
    cronos: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x66a5f06d9c8bdc27bb0768eeff71d22b468fb464", "0x2Ad63Da83d6ff5dA9E716DcaE844D4f157405BDd", "0x408b982fDC78eA8fdF8f8652C7893181A645d782", "crypto-com-chain", true] },
  },
  'solisnek': {
    _options: { hasStablePools: true, stablePoolSymbol: 'ssAMM' },
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'soyfinance': {
    callisto: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', blacklistedTokens: [ADDRESSES.callisto.SOY] },
    ethereumclassic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bittorrent: ADDRESSES.callisto.BUSDT,
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'starswap': {
    astar: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'swapfish': {
    arbitrum: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'swaprum': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'tangoswap': {
    smartbch: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "smartbch", "tangoswap", 18] },
  },
  'tendieswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'tendieswap-app': {
    tenet: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tethys': {
    metis: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'tideswap': {
    ink: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' }
  },
  'tulip': {
    oasis: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'ultronSwap': {
    ultron: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owner: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', tokens: [ADDRESSES.ultron.wULX] } },
  },
  'unifi-protocol': {
    timetravel: false,
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    iotex: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ontology_evm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] },
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bittorrent: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    tron: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'vanswap': {
    deadFrom: '2025-10-29',
    vision: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "tether"] },
  },
  'venera': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'krokoswap-v2': {
    kasplex: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'versedex': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    smartbch: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'w3swap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    pg: { tvl: () => ({}) },
  },
  'wannaswap': {
    aurora: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'wardenswap': {
    hallmarks: [
      ['2021-08-25', "Announcement 2 week left before pool's rewards end"],
      ['2021-08-27', "Start pool's reward 100x warden pool"],
      ['2021-09-10', "Pool's rewards end"],
    ],
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'warpx': {
    _options: { fetchBalances: true, coreAssets: [ADDRESSES.optimism.WETH_1] },
    megaeth: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'whaleswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true, lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] } },
    fantom: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true, lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] } },
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true, lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] } },
    optimism: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true, lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] } },
    avax: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true, lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] } },
    polygon: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true, lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] } },
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'wind-swap-cl': {
    sei: {
      factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      fetchBalances: true,
      useDefaultCoreAssets: false,
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint) view returns (address)',
      },
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
    base: {
      factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      fetchBalances: true,
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint) view returns (address)',
      },
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'wingswap': {
    fantom: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'wojakfinance': {
    dogechain: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: { owners: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true, lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] } },
  },
  'wswap': {
    wchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'wtfdex': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'yieldfields': {
    start: '2021-05-17',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zenithswap': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'zk-swap': {
    era: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'zkSwap-finance': {
    era: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: [["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"]] },
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    monad: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zkevmswap': {
    polygon_zkevm: ADDRESSES.shibarium.BONE_1,
  },
  'bcswap': {
    bcypher: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'velox': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'capybara-v2': {
    klaytn: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'qie-dex': {
    start: '2025-08-05',
    qiev3: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
  },
  'virtus-protocol': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      }
    }
  },
  'forest-v1': {
    bsc: {
      factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    },
  },
  'mezo-tigris-v3': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      fetchBalances: true,
    },
    mezo: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sentrix-dex': {
    srx: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
  },
  'myrxswap': {
    mrt: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
  },
  'brownfi-v3': {
    berachain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
  },
  'hyperlynx': {
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'nadfun-v2': {
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'robinswap': {
    robinhood: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'swaphood': {
    robinhood: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bitblocks-finance': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'catnip': {
    robinhood: {
      factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'],
    }
  },
}

module.exports = buildProtocolExports(uniV2Configs, uniV2ExportFn)
