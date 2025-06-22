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
import { Message } from './message-board/message-board.types';
import { MOCK_MESSAGES } from './message-board/message-board.constants';

const messages: Message[] = MOCK_MESSAGES;
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
      messages.push(newMessage);
      return newMessage;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await apolloServer.start();
})();

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */
app.get('/api/**', (req, res) => {
  res.json({ message: 'This is an example API response' });
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

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
