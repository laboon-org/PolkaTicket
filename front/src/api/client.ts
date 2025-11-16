import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import mockTicketCollections from "../data/mockTicketCollections";
import { getTicketCollections } from './queries';

// v1.1.0-stable: Disabled external GraphQL API to avoid CORS issues
// Using mock data for local development and testing
const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql", // Mock endpoint (not used)
  headers: {
    "Content-Type": "application/json"
  }
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: httpLink,
  // Disable network requests - use mock data only
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
    },
  },
});

// Initialize cache with mock data
cache.writeQuery({
  query: getTicketCollections,
  data: {
    ticketCollections: mockTicketCollections,
  },
});
