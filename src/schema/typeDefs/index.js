import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    dob: String
    role: String
    admin: Boolean
    email: String
    password: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID): User
  }

  type Mutation {
    # USERS
    addUser(
      firstName: String
      lastName: String
      dob: String
      role: String
      admin: Boolean
    ): User
    editUser(
      id: ID
      firstName: String
      lastName: String
      dob: String
      role: String
      admin: Boolean
    ): User
    deleteUser(id: ID): Boolean
  }
`;
