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
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  '9mm-v2': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    pulse: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'agsfinance': {
    astar: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'agus': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Akitaswap': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'akronswap': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'alienbase-area51': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'allinxswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'alphadex': {
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    moonriver: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'amaterasu': {
0x3211d27a1A1B8E40C7974F6951935303e6e56DBE  },
  'ancora': {
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'andromeada': {
    _options: {
      hasStablePools: true,
    },
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'aquas-trade': {
    europa: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'arbiswap': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'arbswap': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    arbitrum_nova: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'archerswap': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'arena-dex': {
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'areon-swap': {
    area: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'artexswap_xyz': { artela: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', },
  'sheriff-v2': { robinhood: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', },
  'astarexchange': {
    astar: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'eticahub': {
    etica: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
  },
  'asteroneo': {
    neox: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'astroswap': {
    _options: {
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',],
    },
    velas: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'auragi-finance': {
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'autotronic': {
    start: '2023-08-24',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    berachain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    bouncebit: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    songbird: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Blinkswap': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bluelotusdao': {
    genesys: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bluemeteor': {
    pulse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'BombFinance': {
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'brise-swap': {
    bitgert: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'BroSwap': {
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'brownfi': {
    berachain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    monad: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bswap': {
    chainx: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bulbaswap-v2': {
    _options: {
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0xff12470a969Dd362EB6595FFB44C82c959Fe9ACc'],
    },
    morph: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bullionFX': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'busta': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'bwswap': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'bxh': {
    heco: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    okexchain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cakewwap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'camelot': {
    start: '2022-11-22',
    apechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    duckchain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    gravity: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    occ: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    rari: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    reya: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    canto: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cantoswap': {
    canto: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'capitaldex': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    curio: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'capricorn': {
    cube: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'capx': {
    capx: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'carbonswap': {
    energyweb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'carrotswap': {
    neox: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ceto-swap': {
    manta: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ChewySwap': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    shibarium: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'chickendefi': {
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'chiliswap': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'chilizswap': {
    chz: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'chimeradex': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Chocoinu': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'chronos': {
    _options: {
      hasStablePools: true,
    },
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ciento': {
    planq: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'CirclePacific': {
    manta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'citadelswap': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cl-dex': {
    klaytn: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'clever-protocol': {
    dogechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cobraswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'coinswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'comet-swap-v2': {
    astar: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'comfyswap': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'complus': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    heco: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cone': {
    _options: {
      hasStablePools: true,
    },
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cronus': {
    evmos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'cyberblast-v2': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'cypher-v2': {
    start: '2025-11-22',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'daiko-dex': {
    deadFrom: '2024-06-07',
    hallmarks: [
      ['2024-06-07', 'Rug Pull'],
    ],
    taiko: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dalmatiandex': {
    shibarium: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'daoaas-swap': {
    eni: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'daomaker-swap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'darkswap': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dbx-finance': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'defi-swap': {
    start: '2020-09-08',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'definix': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    klaytn: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'degendex-fi': {
    degen: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'degenswap': {
    degen: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    okexchain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dinosaureggs': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'direct-exchange': {
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'diviswap': {
    chz: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dmusk': {
    dogechain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'DogeShrek': {
    hallmarks: [
      ['2023-10-25', 'Rebranded as Chewyswap'],
    ],
    deadFrom: '2023-10-25',
    dogechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dogswap': {
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dojoswap-ancient8': {
    ancient8: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'donkeswap': {
    sei: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'doveswap': {
    polygon_zkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dracula-era': {
    _options: {
      hasStablePools: true,
    },
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dragonswap': {
    klaytn: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'dragonswap-sei': {
    sei: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'dtx-dex': {
    taiko: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'echodex': {
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'eggtartswap': {
    harmony: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    alv: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'elysiumswap': {
    elsm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'empiredex': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    empire: { tvl: () => ({}) },
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    xdai: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'energiswap': {
    energi: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'energyfi': {
    moonbeam: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'esper-finance': {
    mantle: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'etcmcv2': {
    ethereumclassic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    ethpow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'excalibur': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fairyswap': {
    findora: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fairyswap-v2': {
    findora: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fathom-dex': {
    xdc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fcondex': {
    deadFrom: '2024-01-07',
    mantle: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fedex': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon_zkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'flashpulse': {
    pulse: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'FlitSwap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'flow-swap-v2': {
    flow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'fluxusbase': {
    _options: {
      hasStablePools: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'FomoSwap': {
    tara: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'foodcourt': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    reichain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'forge-sx-dex': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fourdex': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'freeriver': {
    moonriver: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'frogswap': {
    degen: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'fxswap': {
    functionx: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'galador-io': {
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gammaswap-deltaswap': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Gas404Swap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gassss': {
    stable: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ghost-ex': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ginfinance': {
    boba: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'globiancedex': {
    xdc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'gloom': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'goatswap-v2': {
    goat: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'GoSwap': {
    gochain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gravis-finance': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    heco: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'gravity-finance': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'greenhouse': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'grokswap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'grxswap': {
    grx: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'gt3': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'gullnetwork-amm': {
    manta: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'gxypad': {
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'h2-finance': {
    cronos_zkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    ethpow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hiveswap': {
    map: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'honeyswap': {
    _options: {
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x8db0a6d1b06950b4e81c4f67d1289fc7b9359c7f'],
    },
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    xdai: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hope-swap': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hopswap': {
    cronos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hpdex': {
    hpb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hunnyswap': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hybra-v2': {
    _options: {
      hasStablePools: true,
    },
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'HyperBlast': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hyperswap-v2': {
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'hypertrade-v2': {
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hyperdrome': {
    _options: {
      hasStablePools: true,
    },
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'inkswap': {
    ink: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    jbc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'joc': {
    joc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    telos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'jupiterswap': {
    hallmarks: [
      ['2022-08-15', "incentives not given"]
    ],
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'justmoney': {
    bittorrent: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    tron: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'kapaswap': {
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    ronin: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'katanaswap': {
    zeta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    flow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'kittypunch-kona-v2': {
    abstract: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    kcc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    okexchain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'lfgswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lfgswap-arbitrum': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'lfgswap-xlayer': {
    xlayer: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'linehub-v2': {
    linea: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'linkswap': {
    zklink: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'liquid-bolt': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Liquify': {
    _options: {
      hasStablePools: true,
    },
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Liquify-Manta': {
    _options: {
      hasStablePools: true,
    },
    manta: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'lithos': {
    plasma: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'LizardExchange': {
    oasis: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'lobsterswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ozone: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'lootswap': {
    hallmarks: [
      ['2022-06-23', "Horizon bridge Hack $100m"],
    ],
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'lotusdex-v2': {
    mantra: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'lovelyswap-v2': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'luaswap': {
    _options: {
      permitFailure: true,
    },
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    tomochain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'LuigiSwap': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'metropolis-exchange-amm': {
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mezo-tigris': {
    _options: {
      abis: {
        allPairsLength: 'uint256:allPoolsLength',
        allPairs: 'function allPools(uint256) view returns (address)',
      },
      hasStablePools: true,
    },
    mezo: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'miaswap': {
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0xff276c6bca1f66fd54a8915e830735d6ab0c7b09'],
    },
    onus: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mimoswap': {
    iotex: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'minerswap': {
    ethpow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'minidex': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'moai-fi-v2': {
    xrplevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mobiusdex-xyz': {
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mobydex': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'modemax-dex': {
    mode: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'modeswap': {
    mode: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'modSwapDefi': {
    mode: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'monoswap-v2': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'moonlift': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'moonswap': {
    _options: {
      blacklistedTokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
    moonriver: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mswap': {
    matchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mtt-dex': {
    mtt_network: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'multex': {
    shape: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'mustcometh': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mversex': {
    kava: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'nanoswap': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'narwhalswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'nearpad': {
    aurora: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'neptunex': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tamaswap': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    // base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'nest-platform-v2': {
    _options: {
      hasStablePools: true,
    },
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'netswap': {
    metis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'nexus-dex': {
    xdc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'niifi': {
    nahmii: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'nowswap': {
    hallmarks: [
      ['2021-09-15', "Hacked"]
    ],
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'noxa-fi': {
    abstract: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    megaeth: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    berachain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    somnia: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    '0g': '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    plasma: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    stable: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    katana: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    ethpow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'octoswap-classic': {
    monad: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'okcswap': {
    okexchain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'okieswap-v2': {
    xlayer: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'okutrade-goat': {
    goat: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'omaxswap': {
    omax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'omni-exchange-v2': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    optimism: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    plasma: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'onionswap': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'onsenswap': {
    start: '2023-04-22',
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'oolongswap': {
    hallmarks: [
      ['2022-07-20', "Alameda Research exits"],
    ],
    boba: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'oortswap': {
    rei: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'OpankeSwap': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'opbanana': {
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'openex': {
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'openswap': {
    rss3_vsl: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'openswap_harmony': {
    hallmarks: [
      ['2022-06-23', "Horizon bridge Hack $100m"],
    ],
    _options: {
      blacklistedTokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']
    },
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'OreSwap': {
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pacificswap': {
    manta: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pandaswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pandora-digital': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pandoraswap': {
    astar: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pankuku': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'pantherswap': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'papyrusswap': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'paraluni-dex': {
    hallmarks: [
      ['2022-05-02', 'launch new dex'],
    ],
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    enuls: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    deadFrom: '2026-02-11'
  },
  'phenix-dex': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'photonswap': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    evmos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'planar-finance': {
    start: '2024-05-10',
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'planet-blue': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pls2e': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'plunderswap': {
    zilliqa: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'polydex': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'polyDEX-cryption-network': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pond': {
    fuse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ponyswap': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'PoorExchange': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'potatoswap': {
    xlayer: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'powerswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'PowSea': {
    ethpow: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'powswap': {
    ethpow: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'printy': {
    _options: {
      hasStablePools: true,
    },
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Produs': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'protofi': {
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    arbitrum_nova: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'reactor': {
    blast: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'redemption': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'reservoir-tools-v2': {
    abstract: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    zero_network: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ink: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'revoswap': {
    xlayer: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'rexdex': {
    wan: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'saharaexchange': {
    oasis: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'saitaswap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sanctuary': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sandyswap': {
    _options: {
      hasStablePools: true,
    },
    polygon_zkevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    hedera: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'savmdex': {
    bevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'savmswap': {
    svm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    prom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sboomfi': {
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'scribeswap': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'scrollswap': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'scrollswapfinance': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sealightswap': {
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'seascape': {
    moonriver: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shadowswap': {
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'shapeswap-v2': {
    shape: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sharelock': {
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sharkswap': {
    sx: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    sxr: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sharkswap-finance': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'
      ],
    },
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    shibarium: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'shibbex': {
    shibarium: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'shibshift': {
    pulse: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'shimmersea': {
    shimmer_evm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    iotaevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'shinobi': {
    ubiq: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'sideswap-fi': {
    zkfair: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'silkswap': {
    ftn: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'skullswap': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'smartdex': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'snap-v2': {
    tac: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'solarflare': {
    moonbeam: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'solidblast': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'solidly': {
    _options: {
      hasStablePools: true,
    },
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'someswap': {
    monad: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'spacefi': {
    evmos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spacefi-scroll': {
    scroll: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'spacefi-zksync': {
    era: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sparkdex-v2': {
    flare: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'spartacus-exchange': {
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spartadex': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    linea: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'spinaqdex': {
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'spookyswap': {
    bittorrent: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    eon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    fantom: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    sonic: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'spoon-exchange': {
    _options: {
      hasStablePools: true,
    },
    core: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'squidswap': {
    ink: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'stableswap': {
    _options: {
      hasStablePools: true,
    },
    stable: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    metis: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    shiden: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'starmaker': {
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'step-exchange': {
    step: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    moonbeam: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'supernova': {
    _options: {
      hasStablePools: true,
    },
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'superswap-v2': {
    _options: {
      permitFailure: true,
    },
    optimism: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'supswap-v2': {
    mode: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'surfswap': {
    hallmarks: [
      ['2022-08-15', "incentives not given"]
    ],
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'swanswap': {
    shape: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swapbase': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'swapblast': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'SwapMode': {
    mode: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'swapos': {
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swapp': {
    cronos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'swapperchan': {
    boba: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swappi': {
    conflux: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'swapx': {
    xone: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'swyrl-legacy': {
    _options: {
      hasStablePools: true,
    },
    monad: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'tachyswap': {
    etlk: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'taffy': {
    saakuru: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'TAKOSWAP': {
    ogpu: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tarina': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'tealswap': {
    oas: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tenx-exchange': {
    tenet: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tetu-swap': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'themis-capital-dex': {
    filecoin: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'thena': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'thetaswap': {
    theta: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'throne-v2': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'titano-swych': {
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'tokan-exchange': {
    _options: {
      hasStablePools: true,
    },
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'tomb-swap': {
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Torr-Finance': {
    bittorrent: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'torusfarm': {
    _options: {
      permitFailure: true,
    },
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'tropicalswap': {
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'turtleswap': {
    vechain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ubeswap': {
    celo: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'ucs-finance': {
    unichain: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'ultrasolid-v2': {
    hyperliquid: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'unicly': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    tron: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'v2swap': {
    _options: {
      permitFailure: true,
    },
    op_bnb: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    telos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'VAX': {
    multivac: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'velocimeter-v2': {
    _options: {
      hasStablePools: true,
    },
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    canto: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    mantle: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    pulse: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    meter: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'vulcandex': {
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'vultureswap': {
    cronos: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'vvs-finance': {
    cronos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    klaytn: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'XDX': {
    blast: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    xrplevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'xspswap': {
    xdc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'xswap': {
    crossfi: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'yakafinance': {
    sei: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    heco: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'yumiswap': {
    astar: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zappy': {
    telos: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Zebra': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zedaswap': {
    zeta: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zena-v2': {
    op_bnb: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zeniq-swap': {
    zeniq: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'Zenonswap': {
    degen: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zerodex': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zkdefi': {
    polygon_zkevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zkfairswap': {
    zkfair: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zkmoonswap': {
    polygon_zkevm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zkswap-2': {
    hallmarks: [
      ['2024-01-10', "Whale Withdraw"]
    ],
    era: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    zkfair: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zoodex': {
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'zprotocol-dex': {
    scroll: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zswap-plus': {
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },

  // --- Migrated simple getUniTVL adapters ---
  'GlyphExchange': {
    core: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x6bf16B2645b13db386ecE6038e1dEF76d95696fc", "0xb3A8F0f0da9ffC65318aA39E55079796093029AD"] },
  },
  'KibbleSwap': {
    dogechain: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: { owner: '0x8ffBD442F246964A0d2E87C9b2551095bdA6EEb3', tokens: ['0x1e1026ba0810e6391b0F86AFa8A9305c12713B66'], lps: ['0xC1C10b8BeeC82E840990A2c60A54ccdB39b2153F'], useDefaultCoreAssets: true } },
  },
  'Kwikswap': {
    ethereum: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x57Caec63E87e1496E946181e3Fc59086e589D4c0", "0x286c0936c7eaf6651099ab5dab9ee5a6cb5d229d"] },
    polygon: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x7965e5F759caB3d5a1b737b9Bb24e94ef6747FA7", "0x8df74088b3aecfd0cb97bcfd053b173782f01e3a", "polygon"] },
    shiden: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x212CB413c48221cA6fE2100578a9ABED26840380", "0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454", "shiden", "0x286c0936c7eaf6651099ab5dab9ee5a6cb5d229d"] },
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'Velocimeter': {
    _options: { hasStablePools: true },
    canto: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x990efF367C6c4aece43c1E98099061c897730F27", "0x2Baec546a92cA3469f71b7A091f7dF61e5569889", "canto"] },
  },
  'Viridian': {
    _options: { hasStablePools: true },
    core: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x49360Bc1727113F56f5A256678AC27F93ee6D368", "0x189d2849AF2031e20c670E755Fa3F0121f2be409"] },
  },
  'afraswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "wbnb"] },
  },
  'alienbase': {
    base: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'alienfi': {
    arbitrum: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: { tokensAndOwners: [['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE']], lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
  },
  'alita-finance': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'aliumswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: [["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'ampleswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
    alv: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    dsc: { tvl: () => ({}) },
  },
  'apeswap-amm': {
    bsc: { factory: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6', staking: [["0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], "bsc"] },
    polygon: '0xcf083be4164828f00cae704ec15a36d711491284',
    ethereum: '0xBAe5dc9B19004883d0377419FeF3c2C8832d7d7B',
    telos: '0x411172Dfcd5f68307656A1ff35520841C2F7fAec',
    arbitrum: '0xCf083Be4164828f00cAE704EC15a36D711491284',
  },
  'arthswap': {
    astar: { factory: '0xA9473608514457b4bF083f9045fA63ae5810A03E', staking: ["0x42d175a498Cb517Ad29d055ea7DcFD3D99045404", "0xde2578edec4669ba7f41c5d5d2386300bcea4678"] },
  },
  'babydogeswap': {
    _options: {
      blacklistedTokens: ['0xe320df552e78d57e95cf1182b6960746d5016561'],
    },
    bsc: { factory: '0x4693B62E5fc9c0a45F89D62e6300a03C85f43137', staking: ["0xcecd3e7eadae1ad0c94f53bf6a2af188df1a90d0", "0xc748673057861a797275CD8A068AbB95A902e8de"] },
  },
  'babyswap': {
    bsc: { factory: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da', staking: ["0xdfAa0e08e357dB0153927C7EaBB492d1F60aC730", "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657"] },
  },
  'biswap': {
    hallmarks: [
      ['2022-05-07', 'UST depeg'],
    ],
    bsc: { factory: '0x858e3312ed3a876947ea49d572a7c42de08af7ee', staking: [["0xDbc1A13490deeF9c3C12b44FE77b503c1B061739", "0x13e9031133E901d5214fb4D593DF8ECc034c8237", "0xD4855892a3188DA76da0066b9e4918939511E67a", "0x9b9F3F1112E74765518cE93B1489c70F6db52bFf", "0x683963df7331c65Df8ACE6818651a7611bdc39E5", "0xBD09D5E5dcC904bbf8649af78d323eEfdf7b0D1D", "0x8b10E6959F2915f532fE142b9C53B167eEC42fF4", "0x7D621C9F70B3743CbAb15c22d781754FcD7c9589", "0x1F337dea1679730906F46A06fd6034054BD32970", "0x131010022654B57b0C39c918ef8313ce79Fa04B8", "0x6653c3c4CD2083fEbFf49A52F9a5ce4c30978A25", "0x44EeCE1e9ccbaa5Ad0b8C14192467Ab83BE0BA51", "0xA394dD5ADC4AAF41aa1f9CFf28158A6AF2823459", "0x6cBbA2f3BD677Da630aEd2311253713e8Ba1394D", "0xa3A911033af250f7013597A6AF6a719906Ac4444", "0xE42D17b1a734e04d2e0cB33234Ab074E21c175A7", "0xAa2b37d023Ffa244022A9aa60EeB351cc79FD4e5", "0x69C4c9cf979431DA6C4B4a2F3874E6378DFC8157", "0xE056FB8Ce6A3437530B1AfF799185A009b25990b", "0xf31F62A6Afb0546771a821e0F98FD187Ee7f7d4C", "0x2792Ccd3F02a22beBa49F28F3ab0B52dF18BD280", "0x109eAA8b5Ea469fb5aCe0647A93695D8DCD5e836"], "0x965f527d9159dce6288a2219db51fc6eef120dd1"] },
  },
  'bscswap': {
    bsc: { factory: '0xCe8fd65646F2a2a897755A1188C04aCe94D2B8D0', staking: ["0x7B2dAC429DF0b39390cD3D4E6a8b8bcCeB331E2D", "0xacc234978a5eb941665fd051ca48765610d82584"] },
  },
  'burgerswap': {
    bsc: { factory: '0x8a1E9d3aEbBBd5bA2A64d3355A48dD5E9b511256', staking: ["0x9154c2684aeF8d106babcB19Aa81d4FabF7581ec", "0xae9269f27437f0fcbc232d39ec814844a51d6b8f"] },
  },
  'cafeswap': {
    bsc: { factory: '0x3e708fdbe3ada63fc94f8f61811196f1302137ad', staking: ["0xc772955c33088a97d56d0bbf473d05267bc4febb", "0x790be81c3ca0e53974be2688cdb954732c9862e1"] },
    polygon: { factory: '0x5ede3f4e7203bf1f12d57af1810448e5db20f46c', staking: ["0xca2DeAc853225f5a4dfC809Ae0B7c6e39104fCe5", "0xb5106A3277718eCaD2F20aB6b86Ce0Fee7A21F09", "polygon", "bsc:0x790be81c3ca0e53974be2688cdb954732c9862e1"] },
  },
  'canary': {
    avax: { factory: '0xCFBA329d49C24b70F3a8b9CC0853493d4645436b', staking: ["0x39124Af473501Ccd83a5791eA1eFBc2e6dd78f10", "0x8D88e48465F30Acfb8daC0b3E35c9D6D7d36abaf"] },
    scroll: '0x8D88e48465F30Acfb8daC0b3E35c9D6D7d36abaf',
  },
  'candycity': {
    cronos: { factory: '0x84343b84EEd78228CCFB65EAdEe7659F246023bf', staking: [["0xDAf7c0e2882818b46c36AdBCe95399821Eca08F8", "0x8FEf43b1f3046F8f58A76c64aD01Bc8d82ff0ad1", "0xA46C4a3428a5E9B5C84A4457215D98BC8DC17AbB", "0xCa207941946218126BD7BBe44C5d457753490b4A", "0x7CeA583ea310b3A8a72Ed42B3364aff16d24B3A2", "0xE56C1A8D4E90d82BA06F3f49efEc69f736a32070", "0xc568Ce4C714c5Ec819eA8F52596a6Fd9523A2B81"], "0x06C04B0AD236e7Ca3B3189b1d049FE80109C7977"], vesting: ["0x427f1230A547566a51F5Ffd5698BB65c06acA2D2", "0x06C04B0AD236e7Ca3B3189b1d049FE80109C7977"] },
  },
  'casinocronos': {
    cronos: { factory: '0x570aA1E0aa3d679Bc9DaAA47564ed3Daba1208FE', staking: ["0x81b5118bF8A720B19FEC6F3078d2b555790cb0AB", "0x95ac4a86c0677971c4125ACe494e3C17a87a4C61"] },
  },
  'champagne-swap': {
    bsc: { factory: '0xb31A337f1C3ee7fA2b2B83c6F8ee0CA643D807a0', staking: ["0x15C17442eb2Cd3a56139e877ec7784b2dbD97270", "0x4957c1c073557BFf33C01A7cA1436D0d2409d439"] },
  },
  'claimswap': {
    klaytn: { factory: '0x3679c3766E70133Ee4A7eb76031E49d3d1f2B50c', staking: ["0x5f5dec0d6402408ee81f52ab985a9c665b6e6010", "0xcf87f94fd8f6b6f0b479771f10df672f99eada63"] },
  },
  'cleopatra-exchange-v1': {
    _options: { hasStablePools: true, stablePoolSymbol: 'crAMM' },
    mantle: { factory: '0xAAA16c016BF556fcD620328f0759252E29b1AB57', staking: ["0xAAAEa1fB9f3DE3F70E89f37B69Ab11B47eb9Ce6F", "0xC1E0C8C30F251A07a894609616580ad2CEb547F2"] },
  },
  'cowswap-cash': {
    smartbch: '0x72cd8c0B5169Ff1f337E2b8F5b121f8510b52117',
  },
  'cronaswap': {
    _options: {
      blacklistedTokens: ['0x5b5fe1238aca91c65683acd7f9d9bf922e271eaa'],
    },
    cronos: { factory: '0x73A48f8f521EB31c55c0e1274dB0898dE599Cb11', staking: ["0x77ea4a4cF9F77A034E4291E8f457Af7772c2B254", "0xadbd1231fb360047525BEdF962581F3eee7b49fe"] },
  },
  'cryptoswap': {
    start: '2022-05-02',
    bsc: '0x4136A450861f5CFE7E860Ce93e678Ad12158695C',
  },
  'crystalvale': {
    dfk: { factory: '0x794C07912474351b3134E6D6B3B7b3b4A07cbAAa', staking: ["0x6E7185872BCDf3F7a6cBbE81356e50DAFFB002d2", "0x04b9dA42306B023f3572e106B11D82aAd9D32EBb", "dfk", "defi-kingdoms-crystal", 18] },
  },
  'currentx': {
    _options: { coreAssets: [ADDRESSES.optimism.WETH_1] },
    megaeth: '0xC60940F182F7699522970517f6d753A560546937',
  },
  'dddx': {
    bsc: { factory: '0xb5737A06c330c22056C77a4205D16fFD1436c81b', staking: [["0x488f0252B4bEa5A851FE9C827894d08868D552C0", "0xAd8Ab2C2270Ab0603CFC674d28fd545495369f31", "0x37056DbB4352877C94Ef6bDbB8C314f749258fCA"], "0x4B6ee8188d6Df169E1071a7c96929640D61f144f"] },
  },
  'dogmoney': {
    dogechain: { factory: '0xaF85e6eD0Da6f7F5F86F2f5A7d595B1b0F35706C', staking: { owner: '0xC5c70fA7A518bE9229eB0Dc84e70a91683694562', tokens: ['0x93C8a00416dD8AB9701fa15CA120160172039851'], lps: ['0x9ab710cd0bfbee60e14115d19c76213c4d4b1687'], useDefaultCoreAssets: true } },
  },
  'equilibre': {
    _options: { hasStablePools: true },
    kava: {
      factory: '0xA138FAFc30f6Ec6980aAd22656F2F11C38B56a95', staking: ["0x35361C9c2a324F5FB8f3aed2d7bA91CE1410893A", "0xE1da44C0dA55B075aE8E2e4b6986AdC76Ac77d73"], blacklistedPools: [
        '0x78Ef6D3E3d0da9B2248C11BE11743B4C573ADd25',
      ]
    },
  },
  'etcmc': {
    ethereumclassic: { factory: '0x164999e9174686b39987dfB7E0FAb28465b867A5', staking: { tokensAndOwners: [['0x6c3B413C461c42a88160Ed1B1B31d6f7b02a1C83', '0xca1F5a20E07610d82e28683519c72f6817A3505a']], lps: ['0x730F59a8690b50724914D7b9b2f49a8dD18F5572'], useDefaultCoreAssets: true } },
  },
  'etherex-legacy': {
    _options: { hasStablePools: true, stablePoolSymbol: 'cAMM' },
    linea: '0xC0b920f6f1d6122B8187c031554dc8194F644592',
  },
  'ezkalibur': {
    start: '2023-06-09',
    era: { factory: '0x15C664A62086c06D43E75BB3fddED93008B8cE63', staking: ["0x11ef47783740B3F0c9736D54BE8eF8953C3Ead99", "0x240f765Af2273B0CAb6cAff2880D6d8F8B285fa4", "0xc8b6b3a4d2d8428ef3a940eac1e32a7ddadcb0f1", "weth"] },
  },
  'fatex': {
    polygon: { factory: '0x937e0c67d21Df99eaEa0e6a1055A5b783291DC8f', staking: ["0x56BE76031A4614370fA1f188e01e18a1CF16E642", "0x4853365bC81f8270D902076892e13F27c27e7266", "0x69c894Dce6FA2E3b89D3111d29167F0484AC0b2A"] },
  },
  'galoswap': {
    _options: { hasStablePools: true },
    era: '0x48E571C645bbeD451b7C58650E643F534fCaB693',
  },
  'gemkeeper': {
    oasis: { factory: '0xa7200334f652425A12BF2f7e4F0F5409CCA4d963', staking: ["0x25070fA2244b41EA39B964DBFA9E0ab70A886e72", "0x72Ad551af3c884d02e864B182aD9A34EE414C36C", "0xb29553faf847ba5b79b6ae13fa82d0b216faf626"] },
  },
  'gibxswap': {
    bsc: { factory: '0x97bCD9BB482144291D77ee53bFa99317A82066E8', staking: ["0xC31A355277228C1bf9A88599647faEaaE664Ea1f", "0xAe28714390e95B8dF1Ef847C58AEaC23ED457702"] },
  },
  'glacier-finance': {
    _options: { hasStablePools: true },
    avax: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0xed1eE3f892fe8a13A9BE02F92E8FB7410AA84739", "0x3712871408a829C5cd4e86DA1f4CE727eFCD28F6"] },
  },
  'glide-finance': {
    elastos: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0xd39eC832FF1CaaFAb2729c76dDeac967ABcA8F27", "0xbeeAAb15628329C2C89Bc9F403d34b31fbCb3085", "elastos"] },
  },
  'groveswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0xf33893de6eb6ae9a67442e066ae9abd228f5290c", "0xe27f915a8a9ca6c31b193311ae76b8738b926d17"] },
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    grove: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'hermes': {
    harmony: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0xba4476a302f5bc1dc4053cf79106dc43455904a3'], useDefaultCoreAssets: true, lps: ['0x8604197eb7123888b551fe78a8828b895608d093'] } },
  },
  'honkswap': {
    smartbch: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'huckleberry': {
    moonriver: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owner: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true } },
    clv: { tvl: () => ({}) },
  },
  'ifswap': {
    csc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'illuminex': {
    start: '2024-01-28',
    sapphire: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "oasis-network", true] },
  },
  'kaoyaswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'keller': {
    _options: { hasStablePools: true },
    scroll: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'kryptodex': {
    cronos: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "crypto-com-chain"] },
  },
  'kyotoswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'leetswap': {
    polygon_zkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    canto: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    linea: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
    core: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'merchant-moe': {
    mantle: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'mindgames': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owner: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], coreAssets: [ADDRESSES.arbitrum.USDC], lps: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] } },
  },
  'mistswap': {
    smartbch: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "smartbch", "mistswap", 18] },
  },
  'mm-finance': {
    _options: {
      blacklistedTokens: [
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
        '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
        '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
      ],
    },
    cronos: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
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
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
    harmony: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], },
  },
  'moonbase': {
    base: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'moonbase-app': {
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'moonchainswap': {
    mxczkevm: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'yuzuswap': { oasis: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' },
  'moraswap': {
    _options: { queryBatched: 10, waitBetweenCalls: 1000 },
    neon_evm: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'mute': {
    _options: { hasStablePools: true, stablePoolSymbol: 'sMLP' },
    era: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"]] },
  },
  'neuronswap': {
    timetravel: false,
    klaytn: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: { tokens: ['0x340073962a8561cb9e0c271aab7e182d5f5af5c8'], owner: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true } },
  },
  'newswap': {
    new: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'nile-exchange-v1': {
    _options: { hasStablePools: true, stablePoolSymbol: 'cAMM' },
    linea: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'nuri-exchange-v1': {
    _options: { hasStablePools: true, stablePoolSymbol: 'crAMM' },
    scroll: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'omniswap': {
    nibiru: '0x2043d6f72CcD82c4Eae36fF331ADAE8C77bA5897',
  },
  'oni': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'openxswap': {
    optimism: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0xc3864f98f2a61A7cAeb95b039D031b4E2f55e0e9"] },
  },
  'oracleswap': {
    songbird: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "songbird"] },
  },
  'orbitalswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'paintswap': {
    fantom: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'partyswap': {
    avax: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "avalanche-2"] },
  },
  'pharaoh-exchange-v1': {
    _options: { hasStablePools: true, stablePoolSymbol: 'crAMM' },
    avax: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'pharaoh-exchange-v3-legacy': {
    _options: { hasStablePools: true, stablePoolSymbol: 'Stable' },
    avax: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'pinkswap': {
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'polycat-dex': {
    polygon: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'ponder': {
    _options: { fetchBalances: true },
    bitkub: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "bitkub", "ethereum:0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'quantoswap': {
    ethereum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'ramses': {
    _options: { hasStablePools: true, stablePoolSymbol: 'crAMM' },
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'ramses-legacy-v2': {
    _options: { hasStablePools: true, stablePoolSymbol: 'cAMM' },
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    polygon: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'sharkyswap': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'shibance': {
    kcc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'smartdexbch': {
    smartbch: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "bitcoin-cash", false, 18] },
  },
  'smbswap': {
    start: '2022-02-19',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'smolswap': {
    cronos: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "crypto-com-chain", true] },
  },
  'solisnek': {
    _options: { hasStablePools: true, stablePoolSymbol: 'ssAMM' },
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'soyfinance': {
    callisto: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', blacklistedTokens: [ADDRESSES.callisto.SOY] },
    ethereumclassic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bittorrent: ADDRESSES.callisto.BUSDT,
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'starswap': {
    astar: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'swapfish': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
    bsc: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'swaprum': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: [["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"], "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'tangoswap': {
    smartbch: { factory: '0x2F3f70d13223EDDCA9593fAC9fc010e912DF917a', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "smartbch", "tangoswap", 18] },
  },
  'tendieswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'tendieswap-app': {
    tenet: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'tethys': {
    metis: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'tideswap': {
    ink: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' }
  },
  'tulip': {
    oasis: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'ultronSwap': {
    ultron: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owner: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', tokens: [ADDRESSES.ultron.wULX] } },
  },
  'unifi-protocol': {
    timetravel: false,
    avax: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    iotex: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ontology_evm: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'] },
    fantom: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    harmony: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    polygon: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    bittorrent: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    tron: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'vanswap': {
    deadFrom: '2025-10-29',
    vision: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "tether"] },
  },
  'venera': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'krokoswap-v2': {
    kasplex: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'versedex': {
    ethereum: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    smartbch: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'w3swap': {
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    pg: { tvl: () => ({}) },
  },
  'wannaswap': {
    aurora: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'wardenswap': {
    hallmarks: [
      ['2021-08-25', "Announcement 2 week left before pool's rewards end"],
      ['2021-08-27', "Start pool's reward 100x warden pool"],
      ['2021-09-10', "Pool's rewards end"],
    ],
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'warpx': {
    _options: { fetchBalances: true, coreAssets: [ADDRESSES.optimism.WETH_1] },
    megaeth: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'whaleswap': {
    bsc: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true, lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
    fantom: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true, lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true, lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
    optimism: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true, lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
    avax: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true, lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
    polygon: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], tokens: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'], useDefaultCoreAssets: true, lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
    kava: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
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
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
    },
  },
  'wingswap': {
    fantom: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'wojakfinance': {
    dogechain: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: { owners: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], tokens: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'], useDefaultCoreAssets: true, lps: ['0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'] } },
  },
  'wswap': {
    wchain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    ethereum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    bsc: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  'wtfdex': {
    arbitrum: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'yieldfields': {
    start: '2021-05-17',
    bsc: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  'zenithswap': {
    arbitrum: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"] },
  },
  'zk-swap': {
    era: { factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', staking: ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"] },
  },
  'zkSwap-finance': {
    era: { factory: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', staking: [["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1", "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"], ["0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"]] },
    sonic: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
    qiev3: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'
  },
  'virtus-protocol': {
    base: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
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
      staking: ['0x3211d27a1A1B8E40C7974F6951935303e6e56DBE', '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'],
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
    mrt: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'
  },
  'brownfi-v3': {
    berachain: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    hyperliquid: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    arbitrum: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    linea: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE'
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
}

module.exports = buildProtocolExports(uniV2Configs, uniV2ExportFn)
