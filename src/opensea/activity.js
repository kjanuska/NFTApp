const axios = require('axios')

// https://docs.opensea.io/reference/retrieving-asset-events

async function getActivity(event_type) {
  try {
    var resp = await axios.get(
      "https://api.opensea.io/api/v1/events",
      {
        headers: {
        "accept" : "application/json",
        },
        params: {
          account_address: '0xd77220D15cB1F3A69d54Ae3bF6497D54510f08Bf',
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