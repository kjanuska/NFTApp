const axios = require("axios");

// https://docs.opensea.io/reference/retrieving-asset-events

/*
GET COST OF MINTING COLLECTION

1. use opensea api to get collection and the contract address of each nft
in the collection. create a 'collection' object for each nft which contains:
- name
- schema type
- dev fee
- transactions object array (empty at first)
create a map with the collection address as the key and the collection object
as the value
"Get Collection"

2. for each key in the map, get the ERC-721 token info. add a transaction object
that contains the following:
- hash
- token id array
- block number
- gas price (empty)
- gas used (empty)
- mint cost (empty)
for the following transactions,
if the hash is the same, add the new token id to the array
if the is different, add a new transaction object with the new hash and a new array
"Get ERC721 Tokens"

3. get the transaction info using the block number for each transaction for each collection.
set the mint cost of the transaction, gas price, and gas used if not erorr
1 eth = 10^18 wei
1 gwei = 10^9 wei
"Get Transaction List"
*/

class Collection {
  constructor(type, name, dev_fee) {
    this._type = type;
    this._name = name;
    this._dev_fee = parseFloat(dev_fee);
    this._transactions = [];
  }

  get type() {
    return this._type;
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

const ADDRESS = "0xd77220D15cB1F3A69d54Ae3bF6497D54510f08Bf";

// async function getPrice() {
//   let collection = await getCollection();

//   collection.forEach((token) => {
//     setTimeout(() => {
//       try {
//         var resp = await axios.get("https://api.etherscan.io/api", {
//           headers: {
//             accept: "application/json",
//           },
//           params: {
//             module: "account",
//             action: "tokennfttx",
//             contractaddress: token.address,
//             address: ADDRESS,
//             sort: "desc",
//             apikey: API_KEY,
//           },
//         });
//       } catch (error) {
//         console.log("Error getting ERC721 token: " + error);
//       }

//       if (resp.data["status"] === "1") {
//         const hash = resp.data["result"][0]["hash"];
//         resp.data["result"].forEach((item) => {
//           const gas_price = parseFloat(item['gasPrice']);
//           const gas_used = parseFloat(item['gasUsed']);
//           const gas_price = (gas_price * gas_used) / Math.pow(10, 9);
//           // if there is another transaction for the same token
//         });
//       } else {
//         console.log(resp.data["message"]);
//       }
//     }, 500);
//   });
// }

// async function getMintPrice(address, block) {
//   try {
//     var resp = await axios.get("https://api.etherscan.io/api", {
//       headers: {
//         accept: "application/json",
//       },
//       params: {
//         module: "account",
//         action: "txlist",
//         address: address,
//         startblock: 0,
//         endblock: 99999999,
//         sort: "desc",
//         apikey: API_KEY,
//       },
//     });
//   } catch (error) {
//     console.log("Erorr getting transaction list: " + error);
//   }

//   let owned = await getCollection(address);
//   if (resp.data["status"] === "1") {
//     owned.forEach((addy) => {
//       resp.data["result"].forEach((transaction) => {

//       });
//     });
//   } else {
//     console.log(resp.data['message']);
//   }
// }

// get all nft info for each address in collection
// async function getAsset(address) {
//   let addresses = await getCollection(address);

//   let collection = [];
//   addresses.forEach((addy) => {
//     try {
//       var resp = await axios.get("https://api.opensea.io/api/v1/assets", {
//         headers: {
//           accept: "application/json",
//         },
//         params: {
//           ownder: address,
//           asset_contract_address: addy,
//         },
//       });
//     } catch (error) {
//       console.log("Error getting token info: " + error);
//     }

//     resp.data["assets"].forEach((token) => {
//       const nft = new NFT(
//         token["asset_contract"]["schema_name"],
//         addy,
//         token["asset_contract"]["name"],
//         token["token_id"],
//         token["asset_contract"]["dev_seller_fee_basis_points"]
//       );
//       collection.push(nft);
//     });
//   });

//   return collection;
// }

// get the contract addresses of each item in collection
async function getEntireCollection() {
  try {
    var resp = await axios.get("https://api.opensea.io/api/v1/collections", {
      headers: {
        accept: "application/json",
      },
      params: {
        asset_owner: ADDRESS,
        offset: 0,
        limit: 300,
      },
    });
  } catch (error) {
    console.log("Error getting collection: " + error);
  }

  let collection = new Map();

  Object.values(resp.data).forEach((item) => {
    if (item["primary_asset_contracts"].length !== 0) {
      const new_nft = new Collection(item["primary_asset_contracts"][0]["schema_name"],
                                 item["name"],
                                 item["primary_asset_contracts"][0]["dev_seller_fee_basis_points"])
      collection.set(item["primary_asset_contracts"][0]["address"], new_nft);
    }
  });

  return collection;
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

getEntireCollection();

module.exports = { getActivity };
