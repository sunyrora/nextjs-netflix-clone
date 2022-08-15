const { gql } = require("apollo-server-micro");

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type User {
    _id: ID!
    provider: String!
    email: String!
    image: Int
  }

  input CreateUserInput {
    email: String!
    password: String!
    image: String
  }

  input UpdateUsernameInput {
    _id: ID!
    email: String!
    provider: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): [User]
  }
`;

module.exports = { typeDefs };
