import { gql } from 'apollo-server-express'

const mockUsers = [
  { id: 1, name: 'foo', age: 10 },
  { id: 2, name: 'bar', age: 100 }
]

// Schema設計はRelay Specificationに則る
// see: https://relay.dev/docs/en/v6.0.0/graphql-server-specification
export const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Query {
    users(first: Int!): UserConnection!
  }

  type User implements Node {
    id: ID!
    name: String!
    age: Int!
  }
  
  type UserEdge {
    node: User!
    cursor: String!
  }

  type UserConnection {
    edges: [UserEdge!]!
    pageInfo: PageInfo!
  }
`

export const resolvers = {
  Query: {
    users: (_: undefined, { first }: { first: number }) => {
      // TODO: Relay Specificationに則ったレスポンスを返す
      return mockUsers[first]
    },
  },
}

