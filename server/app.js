import cors from "cors"
import http from 'http';
import express from "express"
import { ApolloServer } from "@apollo/server"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';

export async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server),
  );
  
  await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:4000/`);
}