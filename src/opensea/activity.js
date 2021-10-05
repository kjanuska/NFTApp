const axios = require('axios')

// https://docs.opensea.io/reference/retrieving-asset-events

/*
GET COST OF MINTING COLLECTION

1. use opensea api to get collection and the contract address of each nft
in the collection

2. crawl through transaction list from etherscan and check if contract addy
in transaction matches the addy from opensea

3. if yes, check if not error. then, 'value' is the mint price (if not 0)
and the gas price is 'gasPrice' * 'gasUsed' divided by something like 10^17
*/

async function getActivity(address, event_type=null) {
  try {
    var resp = await axios.get(
      "https://api.opensea.io/api/v1/events",
      {
        headers: {
        "accept" : "application/json",
        },
        params: {
          account_address: address,
          event_type: event_type,
          only_opensea: 'false',
          offset: '0',
          limit: '20',
        }
      },
    );
  } catch (error) {
    console.log(error);
  }

  return resp.data;
}

module.exports = { getActivity };