const axios = require("axios");

// https://docs.opensea.io/reference/retrieving-asset-events

/*
GET COST OF MINTING COLLECTION

1. use opensea api to get collection and the contract address of each nft
in the collection
"Get Collection"

2. get ERC-721 token info from etherscan, which gives the transaction hash.
there might be multiple hashes if a person mined the same token at different times.
"Get ERC271 Tokens"

3. crawl through entire transaction list to find transaction that matches the hash
received in the previous step.
"Get Transaction List"

3. if transaction foudn, check if not error. then, 'value' is the mint price
and the gas price is 'gasPrice' * 'gasUsed' divided by something like 10^17
*/

class NFT {
  constructor(address, name, dev_fee) {
    this._address = address;
    this._name = name;
    this._dev_fee = dev_fee;
  }

  get address() {
    return this._address;
  }

  get name() {
    return this._name;
  }

  get devFee() {
    return this._dev_fee;
  }

  get totalFee() {
    return this._dev_fee + 250;
  }
}

async function getTransactions(address) {
  try {
    var resp = await axios.get("https://api.etherscan.io/api", {
      headers: {
        accept: "application/json",
      },
      params: {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: 'desc',
        apikey: 'FDBB85H7HTFKGVEQ68XV9CPHK4GG6Z2GF8',
      },
    });
  } catch (error) {
    console.log("Erorr getting transaction list: " + error);
  }

  let owned = await getCollection(address);
  if (resp.data['status'] === '1') {
    owned.forEach((nft) => {
      resp.data['result'].forEach((transaction) => {
        if (transaction['to'] == nft.address) {
          console.log(`${nft.name} - mint: ${transaction['value']}`);
        }
      });
    });
  }
}

async function getCollection(address) {
  try {
    var resp = await axios.get("https://api.opensea.io/api/v1/collections", {
      headers: {
        accept: "application/json",
      },
      params: {
        asset_owner: address,
        offset: 0,
        limit: 300,
      },
    });
  } catch (error) {
    console.log("Error getting collection: " + error);
  }

  let owned = [];

  Object.values(resp.data).forEach((item) => {
    if (item["primary_asset_contracts"].length !== 0) {
      const current = item["primary_asset_contracts"][0];
      const nft = new NFT(
        current["address"],
        current["name"],
        current["dev_seller_fee_basis_points"]
      );
      owned.push(nft);
    }
  });

  return owned;
}

async function getActivity(address, event_type = null) {
  try {
    var resp = await axios.get("https://api.opensea.io/api/v1/events", {
      headers: {
        accept: "application/json",
      },
      params: {
        account_address: address,
        event_type: event_type,
        only_opensea: "false",
        offset: "0",
        limit: "20",
      },
    });
  } catch (error) {
    console.log(error);
  }

  return resp.data;
}

getTransactions("0xd77220D15cB1F3A69d54Ae3bF6497D54510f08Bf");

module.exports = { getActivity };
