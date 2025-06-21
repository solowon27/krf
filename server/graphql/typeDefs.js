const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type Donation {
    id: ID!
    donorName: String!
    item: String!
    message: String
    date: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getDonations: [Donation!]!
    getMe: User
  }

  type Mutation {
    register(email: String!, password: String!, role: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addDonation(donorName: String!, item: String!, message: String): Donation!
  }
`;
