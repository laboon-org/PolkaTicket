const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
query ($event_id:Int!,$user_id:Int!,$type:Int!,$status:Int!) {
    Transaction_aggregate(where: {TicketToken: {Event: {id: {_eq: $event_id}, status: {_eq:$status}}}, user_id: {_eq: $user_id}, type: {_eq: $type}}) {
      aggregate {
        count
      }
    }
  }
`;
const execute = async (variables: any) => {
  const fetchResponse = await fetch(variables, get_event_now);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
