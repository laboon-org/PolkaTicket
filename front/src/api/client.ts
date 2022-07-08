import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://laboon-nts-v2.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "5iccCRnL4BFDk7jU8HbOGLuTItamh7HrvQi9JjD23OzOWiVtP7Q6fcShcNabfja8",
    "x-hasura-role": "admin"
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
