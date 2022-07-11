const fetch = require("../../fetch/index")
const create_account= require("./create_account")
require('dotenv').config()
const createWallet = `
mutation ($wallet_address:String!) {
    insert_UserWallet(objects: {wallet_address:$wallet_address}) {
      affected_rows
      returning {
        id
        wallet_address
      }
    }
  }
  
`;
const execute = async (variables:Object) => {
  const fetchResponse = await fetch(variables,createWallet) 
  const data = await fetchResponse.json();
  console.log(data.data.insert_UserWallet.returning[0].id)
  if(data.errors==undefined){
    await create_account({address_id:data.data.insert_UserWallet.returning[0].id}).then(((val:any)=>console.log("test123",val)))
  }
  console.log("DEBUG: ", data);
  return data;
};
module.exports=execute
export{}