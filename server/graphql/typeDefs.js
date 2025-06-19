const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    ping: String
  }
`;

module.exports = typeDefs;
