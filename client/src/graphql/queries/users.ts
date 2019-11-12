import { gql } from 'apollo-boost'

export const FETCH_USERS = gql`
  query fetchUsers {
    users {
      name
    }
  }
`