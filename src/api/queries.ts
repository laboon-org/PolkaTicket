import { DocumentNode, gql } from "@apollo/client";

export interface Event {
  id: number,
  name: string,
  image: string,
  location: string,
  startDate: Date,
  endDate: Date,
  status: number,
  owner: string,
  eventCategoryItems: [{
    eventCategory: {
      id: number,
      name: string,
    }
  }]
}

export interface TicketCollection {
  id: number,
  verified: boolean,
  favorited: number,
  ticketInfo: {
    id: number,
    status: number | null,
    ticketType: number
    event: {
      id: number
      name: string,
      image: string,
      location: string,
      startDate: Date,
      endDate: Date,
      status: number,
      owner: string,
      eventCategoryItems: [{
        eventCategory: {
          id: number,
          name: string,
        }
      }]
    }
  }
}

export const getEvents: DocumentNode = gql`
  query MyQuery {
    events: Event {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      status
      owner
      eventCategoryItems: EventCatogoryItems {
        eventCategory: EventCatogory {
          id
          name
        }
      }
    }
  }
`;

export const getTicketCollections: DocumentNode = gql`
  query MyQuery {
    ticketCollections: TicketCollection {
      id
      verified
      favorited
      ticketInfo: TicketToken {
        id
        status
        ticketType: ticket_type
        event: Event {
          id
          name
          image
          location: localtion
          startDate: start_date
          endDate: end_date
          status
          owner
          eventCategoryItems: EventCatogoryItems {
            eventCategory: EventCatogory {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const getEventsUser = gql`
  query MyQuery {
    events: Event(where: {owner: {_eq: "dev_test_wallet"}}) {
      status
      startDate: start_date
      owner
      name
      location: localtion
      image
      id
      endDate: end_date
      eventCategoryItems: EventCatogoryItems {
        eventCategory: EventCatogory {
          id
          name
        }
      }
  }
}
`;
