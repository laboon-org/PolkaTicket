import { gql } from "@apollo/client";

export interface CreateTicket {
  create_at: string
  event: number
  owner_address: string
  supply: number
  ticket_type: number
  type: number
  user_id: number
  approver: string[]
  price: string
  image_link: string
}

export const CREATE_TICKET = gql`
    mutation CreateTicket(
      $create_at: timestamptz!
      $event: Int!       
      $owner_address: String!
      $supply: Int!
      $ticket_type: Int!
      $type: Int!
      $user_id: Int!
      $approver: jsonb 
      $price: float8!
      $image_link: String!
      ){
      createTicket(
        create_at: $create_at,
        event: $event,
        owner_address: $owner_address,
        supply: $supply,
        ticket_type: $ticket_type,
        type: $type,
        user_id: $user_id,
        approver: $approver,
        price:$price,
        image_link: $image_link
      ){
      data
    }
}
`;
