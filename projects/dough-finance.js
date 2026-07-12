const ADDRESSES = require('./helper/coreAssets.json')
const { sumTokens2 } = require("./helper/unwrapLPs")

async function getVaults(api) {
    const vaults = await api.fetchList({ lengthAbi: 'dsaCounter', itemAbi: 'getDsaByID', target: "0x5390724ca3b0880242c7b1ef08eb9b1abe698c0e" })
    const tokens = [
        "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", 
        "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
        ADDRESSES.ethereum.USDC, // usdc
        ADDRESSES.ethereum.WETH, // eth
        "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // debt usdc
        "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // debt weth
    ]
    return { vaults, tokens }
}

module.exports = {
    // hallmarks: [
    //     ['2024-07-12', "Protocol Exploit"]
    // ],
    ethereum: {
        tvl: async (api) => {
            const { vaults, tokens } = await getVaults(api)
            return sumTokens2({ api, tokens, owners: vaults })
        },
    }
}
