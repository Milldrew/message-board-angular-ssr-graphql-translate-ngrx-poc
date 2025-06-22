import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'node:http';
import cors from 'cors';
import { Message } from './message-board/message-board.types';
import { createDatabase, getMessages } from './server.functions';

createDatabase(); // Ensure the database is created at startup
const messages = getMessages();

const typeDefs = `#graphql
  type Query {
    hello: String
    messages: [Message]
  }
  type Message {
    messageId: ID!
    message: String!
    username: String!
    createdAt: String!
  }
  type Mutation {
    addMessage(message: String!, username: String!): Message!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo Server!',
    messages: () => {
      return getMessages();
    },
  },
  Mutation: {
    addMessage: (
      _: any,
      { message, username }: { message: string; username: string },
    ) => {
      const newMessage: Message = {
        messageId: String(Date.now()) + '-' + (Math.random() * 1000).toFixed(0),
        message,
        username,
        createdAt: Date.now(),
      };
      messages.unshift(newMessage);
      return newMessage;
    },
  },
};

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

async function createApp() {
  const app = express();
  const httpServer = createServer(app);

  // Create Apollo Server with proper shutdown handling
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start Apollo Server
  await apolloServer.start();

  const angularApp = new AngularNodeAppEngine();

  // Add JSON parsing middleware
  app.use(express.json());

  // Apollo GraphQL endpoint
  app.use(
    '/api/graphql',
    cors({
      origin:
        process.env['NODE_ENV'] === 'production'
          ? ['your-production-domain.com']
          : ['http://localhost:4200', 'http://localhost:4000'],
      credentials: true,
    }),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        // Add any context you need (auth, user info, etc.)
        headers: req.headers,
      }),
    }),
  );

  // Remove the catch-all API route that was conflicting
  // app.get('/api/**', (req, res) => {
  //   res.json({ message: 'This is an example API response' });
  // });

  // Add specific REST API endpoints if needed
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running!' });
  });

  /**
   * Serve static files from /browser
   */
  app.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
    }),
  );

  /**
   * Handle all other requests by rendering the Angular application.
   */
  app.use('/**', (req, res, next) => {
    angularApp
      .handle(req)
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next(),
      )
      .catch(next);
  });

  return { app, httpServer };
}

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;

  createApp()
    .then(({ app, httpServer }) => {
      httpServer.listen(port, () => {
        console.log(
          `Node Express server listening on http://localhost:${port}`,
        );
        console.log(
          `GraphQL endpoint available at http://localhost:${port}/api/graphql`,
        );
      });
    })
    .catch((error) => {
      console.error('Error starting server:', error);
    });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(
  await createApp().then(({ app }) => app),
);
