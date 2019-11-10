import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'

export default new ApolloServer({
  typeDefs,
  resolvers,
})
