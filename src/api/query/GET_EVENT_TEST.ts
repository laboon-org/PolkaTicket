import { gql } from "@apollo/client";

const GET_EVENT_TEST = gql`
  query MyQuery {
    Event {
      id
      eventLocation: localtion
      eventName: name
      status
    }
  }
`;

export { GET_EVENT_TEST }
