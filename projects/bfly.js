const { default: axios } = require("axios")

async function fetch_price(){
    return (await axios.post("https://main-seed.starcoin.org",
        {
            id: 101,
            jsonrpc: "2.0",
            method: "contract.call_v2",
            params: [
                {
                    function_id: "0x1::PriceOracle::read",
                    args: ["0x46531ea0E7cec64b14181d45F8C6798a1cE45da1"],
                    type_args: ["0x1::STCUSDOracle::STCUSD"]
                }]
        })).data.result[0]
}

async function fetch_amount(){
    return (await axios.post("https://main-seed.starcoin.org",
        {
            id: 101,
            jsonrpc: "2.0",
            method: "contract.call_v2",
            params: [{
                function_id: "0x46531ea0E7cec64b14181d45F8C6798a1cE45da1::STCVaultPoolA::current_stc_locked",
                args: [],
                type_args: []
            }]
        })).data.result
}
async function tvl() {
    const tvl = (await fetch_amount()) /1000000000 * (await fetch_price()) /1000000
    return {
        tether: tvl
    }
}


module.exports={
    methodology: "Data is retrieved from the api at https://fai.bfly.finance",
    misrepresentedTokens: true,
    timetravel: false,
    starcoin: {
        tvl,
    }
}
