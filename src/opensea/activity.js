const axios = require('axios')

// https://docs.opensea.io/reference/retrieving-asset-events

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