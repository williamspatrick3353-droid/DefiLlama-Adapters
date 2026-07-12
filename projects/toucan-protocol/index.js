const sdk = require('@defillama/sdk')
const ADDRESSES = require('../helper/coreAssets.json')
const CONFIG_DATA = {
    base: {
        char: "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
    },
    celo: {
        bct: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
        nct: ADDRESSES.celo.NCT,
        char: "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
    },
    polygon: {
        bct: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
        nct: "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
    },
    regen: {
        nct_bridge: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"
    },
};
const TOKEN_DATA = {
    bct: {
        coingecko: "toucan-protocol-base-carbon-tonne",
        validUntil: 1709828986,
    },
    nct: {
        coingecko: "toucan-protocol-nature-carbon-tonne",
    },
    char: {
        coingecko: "biochar",
    },
};

const getCalculationMethod = (chain) => {
  return async (api,) => {
    const supplyCalls = []
    const tokenInfo = []
    Object.keys(CONFIG_DATA[chain]).map((key) => {
      supplyCalls.push(CONFIG_DATA[chain][key]);
      tokenInfo.push(TOKEN_DATA[key]);
    })

    const resp = await api.multiCall({ abi: 'erc20:totalSupply', calls: supplyCalls, })
    const tokensArray = resp.map((obj, i) => {
      const validUntil = tokenInfo[i].validUntil
      if (validUntil && api.timestamp > validUntil)
        tokenInfo[i].totalSupply = 0
      else
        tokenInfo[i].totalSupply = obj
  
      return {
        [tokenInfo[i].coingecko]: dropDecimals(tokenInfo[i].totalSupply),
      };
    });

    const tokens = tokensArray.reduce((acc, cur) => {
      for (const entry of Object.entries(cur)) {
        const [key, value] = entry;
        acc[key] = value;
      }
      return acc;
    } , {});

    return tokens;
  };
};

const dropDecimals = (num) => {
  return (num ?? 0) / 1e18;
}

const getRegenCredits = () => {
  return async () => {
    const transferred = (await sdk.api.abi.call({
      abi: 'uint256:totalTransferred',
      target: CONFIG_DATA['regen'].nct_bridge,
      chain: 'polygon',
    })).output;

    return {
      'toucan-protocol-nature-carbon-tonne': transferred / 1e18,
    };
  };
};

module.exports = {
  start: '2021-10-21',
  base: {
    tvl: getCalculationMethod("base")
  },
  celo: {
    tvl: getCalculationMethod("celo")
  },
  polygon: {
    tvl: getCalculationMethod("polygon")
  },
  regen: {
    tvl: getRegenCredits()
  },
  hallmarks: [
    ['2022-05-24', "Verra prohibits tokenization"], ['2024-03-07', "BCT administrative control transferred to KlimaDAO"],
  ]
};
