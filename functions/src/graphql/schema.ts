import { gql } from 'apollo-server-express'

const mockUsers = [
  { name: 'foo', age: 10 },
  { name: 'bar', age: 100}
]

export const typeDefs = gql`
  type Query {
    user: [User]!
  }

  type User {
    name: String!
    age: Int!
  }
`

export const resolvers = {
  Query: {
    user: () => mockUsers,
  },
}

