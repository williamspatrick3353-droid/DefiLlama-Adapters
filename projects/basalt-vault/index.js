const ADDRESSES = require("../helper/coreAssets.json");

const FACTORY = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"; // VaultCoreNftFactory
const DOLOMITE = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"; // DolomiteMargin

const WBTC_MARKET = 4;
const ISO_ACCOUNT = 100; // Dolomite isolation sub-account used by every vault

const GM_UNDERLYING = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE"; // GMX v2 GM BTC/USD
const WBTC = ADDRESSES.arbitrum.WBTC;

const abi = {
  nextTokenId: "uint256:nextTokenId",
  vaultByTokenId: "function vaultByTokenId(uint256) view returns (address)",
  basaltState: "function basaltState() view returns (address)",
  dolomiteIsolationVault: "function dolomiteIsolationVault() view returns (address)",
  getAccountWei:
    "function getAccountWei((address owner, uint256 number) account, uint256 market) view returns ((bool sign, uint256 value))",
};

async function tvl(api) {
  const n = Number(await api.call({ target: FACTORY, abi: abi.nextTokenId }));
  if (!n) throw new Error("Failed to fetch nextTokenId.");

  const ids = Array.from({ length: n }, (_, i) => i + 1);
  const notZero = (a) => a && a.toLowerCase() !== ADDRESSES.null;

  // Every vault is enumerated on-chain; drop never-minted / burned ids at each hop
  // so a zero address can never make a downstream call revert.
  const vaults = (
    await api.multiCall({
      target: FACTORY,
      abi: abi.vaultByTokenId,
      calls: ids.map((id) => ({ params: [id] })),
    })
  ).filter(notZero);
  if (!vaults.length) throw new Error("Failed to fetch vaults from the factory.");

  const states = (
    await api.multiCall({ abi: abi.basaltState, calls: vaults.map((target) => ({ target })) })
  ).filter(notZero);

  // Only vaults whose Dolomite isolation vault has been created hold a position.
  const active = (
    await api.multiCall({ abi: abi.dolomiteIsolationVault, calls: states.map((target) => ({ target })) })
  ).filter(notZero);
  if (!active.length) return;

  const wbtcWei = await api.multiCall({
      target: DOLOMITE,
      abi: abi.getAccountWei,
      calls: active.map((owner) => ({ params: [{ owner, number: ISO_ACCOUNT }, WBTC_MARKET] })),
    })

  active.forEach((_, i) => { 
    const wb = wbtcWei[i];
    api.add(WBTC, wb.sign ? wb.value : `-${wb.value}`);
  });
  await api.sumTokens({ owners: active, tokens: [GM_UNDERLYING] });
}

module.exports = {
  doublecounted: true,
  methodology:
    "TVL is the net equity summed over every Basalt vault: GM collateral + any WBTC surplus - WBTC debt. Each NFT-bound vault holds GMX v2 GM (BTC/USD) collateral in a Dolomite isolation account and borrows WBTC for a delta-neutral hedge.",
  start: '2026-05-08',
  arbitrum: { tvl },
};
