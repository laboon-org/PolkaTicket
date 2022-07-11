const fetch = require("../../fetch/index")
require('dotenv').config()

const create_accounts = `
mutation ($wallet_address: String!, $input: UserNonce_set_input!) {
  update_UserNonce(where: {UserWallet: {wallet_address: {_eq: $wallet_address}}}, _set: $input) {
    affected_rows
    returning {
      address_id
      id
      ticket_bought
      ticket_issued
      ticket_sold
    }
  }
}


`;
// execute the parent operation in Hasura

const execute = async (variables:Object) => {
  const fetchResponse = await fetch(variables,create_accounts) 
  const data = await fetchResponse.json();
  return data
};
module.exports=execute
export{}