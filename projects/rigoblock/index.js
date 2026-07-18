const sdk = require('@defillama/sdk')
const { getLogs2 } = require('../helper/cache/getLogs')
const { sumTokens2 } = require('../helper/unwrapLPs')
const { getUniqueAddresses } = require('../helper/tokenMapping')

const activeTokensAbi = 'function getActiveTokens() view returns ((address[] activeTokens, address baseToken))'
const tokenIdsAbi = 'function getUniV4TokenIds() view returns (uint256[])'
const ownerOfAbi = 'function ownerOf(uint256 tokenId) view returns (address)'
// rigoblock external positions ref: https://github.com/RigoBlock/v3-contracts/blob/5f6ff38e8d88d66e83d71523d3688c21174837c4/contracts/protocol/extensions/EApps.sol#L53
const activeAppsAbi = 'function getActiveApplications() view returns (uint256)'

const REGISTRY = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' // same on all chains

// Applications enum: https://github.com/RigoBlock/v3-contracts/tree/development/contracts/protocol/types/Applications.sol
const GMX_APP_INDEX = 2
const GMX_FLAG = 1 << GMX_APP_INDEX

const GMX = {
  arbitrum: { reader: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', dataStore: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE' },
}
const getAccountPositionsAbi = 'function getAccountPositions(address dataStore, address account, uint256 start, uint256 end) view returns (((address account, address market, address collateralToken) addresses, (uint256 sizeInUsd, uint256 sizeInTokens, uint256 collateralAmount, uint256 borrowingFactor, uint256 fundingFeeAmountPerSize, uint256 longTokenClaimableFundingAmountPerSize, uint256 shortTokenClaimableFundingAmountPerSize, uint256 increasedAtBlock, uint256 decreasedAtBlock) numbers, (bool isLong) flags)[])'

async function addGmxPositions(api, gmxPools, blacklistedTokens = []) {
  const gmx = GMX[api.chain]
  if (!gmx || !gmxPools.length) return
  const positionsByPool = await api.multiCall({
    abi: getAccountPositionsAbi,
    target: gmx.reader,
    calls: gmxPools.map(pool => ({ params: [gmx.dataStore, pool, 0, 1000] })),
    permitFailure: true,
  })
  const blacklist = new Set(blacklistedTokens.map(t => t.toLowerCase()))
  for (const positions of positionsByPool) {
    if (!positions) continue
    for (const p of positions) {
      const token = p.addresses.collateralToken
      if (blacklist.has(token.toLowerCase())) continue
      api.add(token, p.numbers.collateralAmount)
    }
  }
}

module.exports = {
  methodology: `RigoBlock TVL on Ethereum, Arbitrum, Optimism, BSC, Base, and Unichain pulled from onchain data, including Uniswap V4 liquidity position balances and collateral held in GMX v2 positions, excluding GRG balances. Staking TVL includes staked GRG, plus GRG balances in Uniswap V4 liquidity positions, and GRG balances held by smart pool contracts.`,
}

const config = {
  ethereum: {
    fromBlock: 15817831,
    GRG_VAULT_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    GRG_TOKEN_ADDRESSES: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    UNISWAP_V4_POSM: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  arbitrum: {
    fromBlock: 32290603,
    GRG_VAULT_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    GRG_TOKEN_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    UNISWAP_V4_POSM: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  optimism: {
    fromBlock: 31239008,
    GRG_VAULT_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    GRG_TOKEN_ADDRESSES: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    UNISWAP_V4_POSM: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  bsc: {
    fromBlock: 25550259,
    GRG_VAULT_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    GRG_TOKEN_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    UNISWAP_V4_POSM: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
  },
  base: {
    fromBlock: 2568188,
    GRG_VAULT_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    GRG_TOKEN_ADDRESSES: '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
    UNISWAP_V4_POSM: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
  unichain: {
    fromBlock: 16121670,
    GRG_VAULT_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    GRG_TOKEN_ADDRESSES: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
    UNISWAP_V4_POSM: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  },
}

Object.keys(config).forEach(chain => {
  const { fromBlock, GRG_TOKEN_ADDRESSES, GRG_VAULT_ADDRESSES, UNISWAP_V4_POSM } = config[chain]
  module.exports[chain] = {
    tvl: async (api) => {
      const { pools, tokens, uniV4Ids, gmxPools } = await getPoolInfo(api)
      await sumTokens2({ owner: UNISWAP_V4_POSM, tokens, api, blacklistedTokens: [GRG_TOKEN_ADDRESSES], resolveUniV4: true, uniV4ExtraConfig: { positionIds: uniV4Ids } })
      await addGmxPositions(api, gmxPools, [GRG_TOKEN_ADDRESSES])
      return sumTokens2({ owners: pools, tokens, api, blacklistedTokens: [GRG_TOKEN_ADDRESSES] })
    },
    staking: async (api) => {
      const { pools, uniV4Ids } = await getPoolInfo(api)
      // Add GRG balances from vaults
      const bals = await api.multiCall({ abi: 'erc20:balanceOf', calls: pools, target: GRG_VAULT_ADDRESSES })
      bals.forEach(i => api.add(GRG_TOKEN_ADDRESSES, i))
      // Aggregate GRG from vaults, ERC20 pool balances, and Uniswap V4 positions in a single call
      await sumTokens2({ owner: UNISWAP_V4_POSM, tokens: [GRG_TOKEN_ADDRESSES], api, uniV3WhitelistedTokens: [GRG_TOKEN_ADDRESSES], resolveUniV4: true, uniV4ExtraConfig: { positionIds: uniV4Ids } })
      return sumTokens2({ owners: pools, tokens: [GRG_TOKEN_ADDRESSES], api, uniV3WhitelistedTokens: [GRG_TOKEN_ADDRESSES] })
    },
  }

  async function getPoolInfo(api) {
    const poolKey = `${api.chain}-${api.block}`
    if (!poolData[poolKey]) poolData[poolKey] = _getPoolInfo()
    return poolData[poolKey]

    async function _getPoolInfo() {
      // Fetch pool addresses from registry logs
      const registeredLogs = await getLogs2({
        api,
        target: REGISTRY,
        fromBlock,
        topic: 'Registered(address,address,bytes32,bytes32,bytes32)',
        eventAbi: 'event Registered(address indexed group, address pool, bytes32 indexed name, bytes32 indexed symbol, bytes32 id)'
      })
      const pools = registeredLogs.map(i => i.pool)

      // Fetch active tokens and base token for each pool
      const tokenData = await api.multiCall({
        abi: activeTokensAbi,
        calls: pools,
        permitFailure: true, // V3 pools do not have activeTokens
      })
      const validTokenData = tokenData.filter(data => data !== null)

      const tokens = validTokenData.flatMap(i => i.activeTokens)
      const baseTokens = validTokenData.map(i => i.baseToken).filter(Boolean)
      const allTokens = [...tokens, ...baseTokens]

      // Fetch Uniswap V4 position tokenIds and active application flags for all pools
      const [tokenIdsData, activeApps] = await Promise.all([
        api.multiCall({
          abi: tokenIdsAbi,
          calls: pools,
          permitFailure: true, // Allow pools without tokenIds
        }),
        api.multiCall({
          abi: activeAppsAbi,
          calls: pools,
          permitFailure: true, // Allow pools without getActiveApplications
        }),
      ])

      // Pools that have GMX v2 positions active
      const gmxPools = pools.filter((_, i) => activeApps[i] && (BigInt(activeApps[i]) & BigInt(GMX_FLAG)) !== 0n)

      // Prepare Uniswap V4 position IDs
      const uniV4Ids = []
      for (let i = 0; i < pools.length; i++) {
        const pool = pools[i]
        const tokenIds = tokenIdsData[i] || []
        if (tokenIds.length === 0) continue

        // Verify ownership with POSM
        const owners = await api.multiCall({
          abi: ownerOfAbi,
          calls: tokenIds.map(id => ({ target: UNISWAP_V4_POSM, params: [id] })),
          permitFailure: true,
        })

        // Filter valid tokenIds where pool is the owner
        const validTokenIds = tokenIds.filter((id, j) => owners[j] === pool)
        uniV4Ids.push(...validTokenIds)
      }

      const uniqueTokens = getUniqueAddresses(allTokens)
      sdk.log('chain: ', api.chain, 'pools: ', pools.length, 'tokens: ', uniqueTokens.length, 'valid uniV4 tokenIds: ', uniV4Ids.length, 'uniV4 pools: ', pools.filter((_, i) => tokenIdsData[i]?.length > 0).length, 'gmx pools: ', gmxPools.length)
      return { pools, tokens: uniqueTokens, uniV4Ids, gmxPools }
    }
  }
})

const poolData = {}
