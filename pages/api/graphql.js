import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import resolvers from '../../db/graphql/resolvers';
import { typeDefs } from '../../db/graphql/type-defs';

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
  // allowHeaders: ['Access-Control-Allow-Origin', 'https://studio.apollographql.com', 'Access-Control-Allow-Headers', 'X-Requested-With','X-HTTP-Method-Override','Content-Type','Authorization','Accept']
});

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
});

export const config = {
    api: {
        bodyParser: false,
    },
};


const startServer = apolloServer.start();

// export default cors(async (req, res) => {
//     if(req.method === 'OPTIONS') {
//         res.end();
//         return false;
//     }

//     await startServer;
//     await apolloServer.createHandler({
//       // path: process.env.GRAPH_URI,
//       path: '/api/graphql',
//     })(req, res);
// });

 export default async (req, res) => {
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   res.setHeader(
     'Access-Control-Allow-Origin',
     'https://studio.apollographql.com'
   );
   res.setHeader(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept'
   );

   if (req.method === 'OPTIONS') {
     res.end();
     return false;
   }

   await startServer;

   await apolloServer.createHandler({
     path: '/api/graphql',
   })(req, res);
 };

