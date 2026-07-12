const sdk = require("@defillama/sdk");
const { getStorage, sumTokens2 } = require("../helper/chain/tezos");

async function tvl() {
  return sumTokens2({
    owners: [
      // v1 contracts
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰXTZ v1
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰUSDtz v1
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰUSDt v1
      // v2 contracts
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰXTZ v2
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰUSDtz v2
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰUSDt v2
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰtzBTC v2
      // v3 contracts
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰXTZ v3
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰUSDtz v3
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰUSDt v3
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰtzBTC v3
      "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", // ꜰstXTZ v3
    ],
    includeTezos: true,
  });
}

async function borrowed() {
  const markets = [
    // v1 contracts
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰXTZ v1
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰUSDtz v1
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰUSDt v1
    // v2 contracts
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰXTZ v2
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰUSDtz v2
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰUSDt v2
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 8 }, // ꜰtzBTC v2
    // v3 contracts
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰXTZ v3
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰUSDtz v3
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰUSDt v3
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 8 }, // ꜰtzBTC v3
    { address: "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE", decimals: 6 }, // ꜰstXTZ v3
  ];

  const balances = {};

  for (const { address, decimals } of markets) {
    const storage = await getStorage(address);
    let borrows = Number(storage.totalBorrows || 0);

    let tokenAddress = storage.fa1_2_TokenAddress ? `${storage.fa1_2_TokenAddress}-0` : storage.fa2_TokenAddress ? `${storage.fa2_TokenAddress}-${storage.tokenId}` : "tezos";

    borrows = borrows / 10 ** decimals;

    const key = tokenAddress === "tezos" ? "tezos" : `tezos:${tokenAddress}`;
    sdk.util.sumSingleBalance(balances, key, borrows);
  }

  return balances;
}

module.exports = {
  timetravel: false,
  tezos: {
    tvl,
    borrowed,
  },
  methodology:
    'TVL includes all deposits in TezFin lending markets (ꜰXTZ, ꜰUSDtz, ꜰUSDt, ꜰtzBTC, ꜰstXTZ) across v1, v2, and v3. Borrowed value is based on totalBorrows from contract storage, adjusted by token decimals.',
 };
