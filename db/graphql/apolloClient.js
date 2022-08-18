import { ApolloClient, InMemoryCache } from '@apollo/client';
import { typeDefs } from './type-defs';

const apolloClient = new ApolloClient({
  uri: process.env.GRAPH_URI,
  cache: new InMemoryCache({}),
  typeDefs,
  connectToDevTools: process.env.NODE_ENV === 'development',
});

export default apolloClient;
