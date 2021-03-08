import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';

const httpUri = process.env.REACT_APP_SERVER_URL + '/graphql';

const httpLink = new HttpLink({
  uri: httpUri,
});

const inMemoryCache = new InMemoryCache();

export default new ApolloClient({
  link: httpLink as any,
  cache: inMemoryCache,
});
