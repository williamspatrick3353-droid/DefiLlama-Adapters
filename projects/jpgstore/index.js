const { getAdaInAddress } = require('../helper/chain/cardano')

// Offers V1 Contract
const V1_PROTOCOL_SCRIPT_ADDRESS_OFFER = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";

// Ask V1 Contract
const V1_PROTOCOL_SCRIPT_ADDRESS_ASK = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";

// BuySell V2 Contract 
const V2_PROTOCOL_SCRIPT_ADDRESS_MAIN = "0x3211d27a1A1B8E40C7974F6951935303e6e56DBE";

// Offers V2 Contract
const V2_PROTOCOL_SCRIPT_ADDRESS_OFFER = "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1";

async function tvl() {
    const V1Locked_Offer = await getAdaInAddress(V1_PROTOCOL_SCRIPT_ADDRESS_OFFER)
    const V1Locked_Ask = await getAdaInAddress(V1_PROTOCOL_SCRIPT_ADDRESS_ASK)
    const V2Locked_Main = await getAdaInAddress(V2_PROTOCOL_SCRIPT_ADDRESS_MAIN)
    const V2Locked_Offer = await getAdaInAddress(V2_PROTOCOL_SCRIPT_ADDRESS_OFFER)
    return {
        "cardano": V1Locked_Offer + V1Locked_Ask + V2Locked_Main + V2Locked_Offer
    }
}

module.exports = {
    timetravel: false,
    cardano: {
        tvl
    }
}
