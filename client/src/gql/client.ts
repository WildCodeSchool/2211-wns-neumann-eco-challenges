import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri: process.env.GRAPHQL_API_URL ?? "http://192.168.0.16:4000/",
    credentials: "include",
  }),
});

export default client;
