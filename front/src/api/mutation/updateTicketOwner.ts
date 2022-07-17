import { gql } from "@apollo/client";

export const UPDATE_TICKET_OWNER = gql`
  mutation MyMutation(
    $ticketID: Int!,
    $ownerName: String!,
  ) {
    update_TicketTokens(where: {id: {_eq: $ticketID}}, _set: {owner_address: $ownerName}) {
      affected_rows
    }
  }
`