const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Apollo Server Setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // MongoDB Connection
  mongoose
    .connect(process.env.MONGODB_URI, {
    })
    .then(() => console.log('✅ MongoDB connected successfully!'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();
