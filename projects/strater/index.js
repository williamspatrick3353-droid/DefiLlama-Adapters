const ADDRESSES = require("../helper/coreAssets.json");
const sui = require("../helper/chain/sui");
const { addUniV3LikePosition } = require("../helper/unwrapLPs");

const BUCKETUS_VAULT_AND_POOL_IDS = [
  {
    //NEW_BUCKETUS
    vaultID:
      "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
    poolID:
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  },
  {
    //BUCKETUS
    vaultID:
      "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
    poolID:
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
  },
  {
    //FEE_RATE_BUCKETUS
    vaultID:
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE",
    poolID:
      "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1",
  },
];

const CETABLE_VAULT_ID =
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
const USDC_USDT_POOL_ID =
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";

const STAPREAL_VAULT_ID =
  "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";
const STAPEARL_PAIR_METADTA_ID =
  "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";

const ST_SBUCK_VAULT_OBJECT_ID = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"

function asIntN(int, bits = 32) {
  return Number(BigInt.asIntN(bits, BigInt(int)));
}

async function tvl(api) {
  for (const { vaultID, poolID } of BUCKETUS_VAULT_AND_POOL_IDS) {
    const vaultObjs = await sui.getObject(vaultID);
    const poolObjs = await sui.getObject(poolID);

    const pool = poolObjs.fields;
    const position = vaultObjs.fields.position.fields;

    addUniV3LikePosition({
      api,
      tickLower: asIntN(position.tick_lower_index.fields.bits),
      tickUpper: asIntN(position.tick_upper_index.fields.bits),
      tick: asIntN(pool.current_tick_index.fields.bits),
      liquidity: position.liquidity,
      token0: ADDRESSES.sui.BUCK,
      token1: ADDRESSES.sui.USDC,
    });
  }

  const cetableVaultObjs = await sui.getObject(CETABLE_VAULT_ID);
  const cetablePoolObjs = await sui.getObject(USDC_USDT_POOL_ID);

  const cetablePool = cetablePoolObjs.fields;
  const cetablePosition = cetableVaultObjs.fields.position.fields;

  addUniV3LikePosition({
    api,
    tickLower: asIntN(cetablePosition.tick_lower_index.fields.bits),
    tickUpper: asIntN(cetablePosition.tick_upper_index.fields.bits),
    tick: asIntN(cetablePool.current_tick_index.fields.bits),
    liquidity: cetablePosition.liquidity,
    token0: ADDRESSES.sui.USDT,
    token1: ADDRESSES.sui.USDC,
  });

  const stapearlVaultObjs = await sui.getObject(STAPREAL_VAULT_ID);
  const stapearlPairMetadataObjs = await sui.getObject(
    STAPEARL_PAIR_METADTA_ID
  );

  const stapearlLpAmount = stapearlVaultObjs.fields.position.fields.amount;
  const stapearlPairMetadataFields =
    stapearlPairMetadataObjs.fields.value.fields;
  const stapearlLpSupply = stapearlPairMetadataFields.lp_supply.fields.value;
  const stapearlReserveX = stapearlPairMetadataFields.reserve_x.fields.balance;
  const stapearlReserveY = stapearlPairMetadataFields.reserve_y.fields.balance;

  const stapearlUSDCAmount =
    (stapearlLpAmount * stapearlReserveX) / stapearlLpSupply;
  const stapearlUSDTAmount =
    (stapearlLpAmount * stapearlReserveY) / stapearlLpSupply;

  // saving vault
  const savingVaultcObj = await sui.getObject(ST_SBUCK_VAULT_OBJECT_ID)
  let savingVaultTVL = Number(savingVaultcObj.fields.free_balance) + Number(savingVaultcObj.fields.time_locked_profit.fields.locked_balance) + Number(savingVaultcObj.fields.time_locked_profit.fields.unlocked_balance)
  const strategies = savingVaultcObj.fields.strategies.fields.contents
  for(const strategy of strategies){
    const botrrowedAmount = Number(strategy.fields.value.fields.borrowed)
    savingVaultTVL += botrrowedAmount
  }

  api.add(ADDRESSES.sui.USDC, stapearlUSDCAmount);
  api.add(ADDRESSES.sui.USDT, stapearlUSDTAmount);
  api.add(ADDRESSES.sui.BUCK, savingVaultTVL)
}

module.exports = {
  timetravel: false,
  sui: {
    tvl,
  },
};
