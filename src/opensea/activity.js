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
and the gas price is 'gasPrice' * 'gasUsed'
1 eth = 10^18 wei
1 gwei = 10^9 wei
*/

class NFT {
  constructor(type, address, name, id, dev_fee) {
    this._type = type;
    this._address = address;
    this._name = name;
    this._id = parseInt(id);
    this._dev_fee = parseFloat(dev_fee);
    this._mint = 0.0;
    this._gas = 0.0;
  }

  set mint(mint) {
    this._mint = mint;
  }

  set gas(gas) {
    this._gas = gas;
  }

  get type() {
    return this._type;
  }

  get id() {
    return this._id;
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

const API_KEY = "FDBB85H7HTFKGVEQ68XV9CPHK4GG6Z2GF8";

async function getPrice(address) {
  let collection = await getCollection(address);

  collection.forEach((token) => {
    setTimeout(() => {
      try {
        var resp = await axios.get("https://api.etherscan.io/api", {
          headers: {
            accept: "application/json",
          },
          params: {
            module: "account",
            action: "tokennfttx",
            contractaddress: token.address,
            address: address,
            sort: "desc",
            apikey: API_KEY,
          },
        });
      } catch (error) {
        console.log("Error getting ERC721 token: " + error);
      }

      if (resp.data["status"] === "1") {
        const hash = resp.data["result"][0]["hash"];
        resp.data["result"].forEach((item) => {
          const gas_price = parseFloat(item['gasPrice']);
          const gas_used = parseFloat(item['gasUsed']);
          const gas_price = (gas_price * gas_used) / Math.pow(10, 9);
          // if there is another transaction for the same token
        });
      } else {
        console.log(resp.data["message"]);
      }
    }, 500);
  });
}

async function getMintPrice(address, block) {
  try {
    var resp = await axios.get("https://api.etherscan.io/api", {
      headers: {
        accept: "application/json",
      },
      params: {
        module: "account",
        action: "txlist",
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: "desc",
        apikey: API_KEY,
      },
    });
  } catch (error) {
    console.log("Erorr getting transaction list: " + error);
  }

  let owned = await getCollection(address);
  if (resp.data["status"] === "1") {
    owned.forEach((addy) => {
      resp.data["result"].forEach((transaction) => {

      });
    });
  } else {
    console.log(resp.data['message']);
  }
}

// get all nft info for each address in collection
async function getAsset(address) {
  let addresses = await getCollection(address);

  let collection = [];
  addresses.forEach((addy) => {
    try {
      var resp = await axios.get("https://api.opensea.io/api/v1/assets", {
        headers: {
          accept: "application/json",
        },
        params: {
          ownder: address,
          asset_contract_address: addy,
        },
      });
    } catch (error) {
      console.log("Error getting token info: " + error);
    }

    resp.data["assets"].forEach((token) => {
      const nft = new NFT(
        token["asset_contract"]["schema_name"],
        addy,
        token["asset_contract"]["name"],
        token["token_id"],
        token["asset_contract"]["dev_seller_fee_basis_points"]
      );
      collection.push(nft);
    });
  });

  return collection;
}

// get the contract addresses of each item in collection
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

  let collection_addresses = [];

  Object.values(resp.data).forEach((item) => {
    if (item["primary_asset_contracts"].length !== 0) {
      collection_addresses.push(item["primary_asset_contracts"][0]["address"]);
    }
  });

  return collection_addresses;
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
