const { getLogs2 } = require('../helper/cache/getLogs')
const ADDRESSES = require('../helper/coreAssets.json')

const vaults = [
  // "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  // "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
]

const beraBorrowWberaToken = '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1'

const PSMs = [
  '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1',
  '0x3211d27a1A1B8E40C7974F6951935303e6e56DBE',
]

const getAllCollateralsAndDenManagersAbi = "function getAllCollateralsAndDenManagers() view returns ((address collateral, address[] denManagers)[])"

async function tvl(api) {
  const tokens = await api.multiCall({ abi: 'address:asset', calls: vaults })
  // const beraTokens = await api.multiCall({ abi: 'address:collVault', calls: vaults })
  const pTokens = await api.multiCall({ abi: 'address:stable', calls: PSMs })
  const denInfos = await api.call({ abi: getAllCollateralsAndDenManagersAbi, target: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1' })
  const tokensAndOwners = tokens.map((t, i) => [t, vaults[i]])

  pTokens.forEach((t, i) => tokensAndOwners.push([t, PSMs[i]]))
  denInfos.forEach(({ collateral, denManagers }) => {
    denManagers.forEach(d => tokensAndOwners.push([collateral, d]))
  })

  const infraredLogs = await getLogs2({ api, factory: '0x46531ea0E7cec64b14181d45F8C6798a1cE45da1', eventAbi: 'event NewVault (address _sender, address indexed _asset, address indexed _vault)', fromBlock: 562092, })
  const infraAssets = infraredLogs.map(log => log._asset)
  const names = await api.multiCall({ abi: 'string:name', calls: infraAssets, permitFailure: true, })
  const bbInfraWrappers = infraAssets.filter((a, i) => names[i] && names[i].startsWith('Beraborrow: '))
  const bbInfraWrapperUnderlyings = await api.multiCall({ abi: 'address:underlying', calls: bbInfraWrappers })
  bbInfraWrapperUnderlyings.forEach((u, i) => tokensAndOwners.push([u, bbInfraWrappers[i]]))
  const blacklistedTokens = [...bbInfraWrappers, beraBorrowWberaToken]
  return api.sumTokens({ tokensAndOwners, blacklistedTokens })
}

module.exports = {
  berachain: { tvl }
}
