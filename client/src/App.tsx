import React, { useCallback, useState } from 'react'
import './App.css'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

function throwResponseError<R>(resJson: Promise<R>): Promise<R> {
  return resJson.catch(err => { throw err })
}

function httpClient<R>(): Promise<R> {
  return fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  }).then(res => {
    const json = res.json()
    if (!res.ok) return throwResponseError<R>(json)
    return json
  })
}

const FETCH_USERS = gql`
  {
    users {
      name
    }
  }
`

const App: React.FC = () => {
  const [apiUsers, setApiUsers] = useState([{}])
  const [gqlUsers, setGqlUsers] = useState([{}])
  const [fetchUsers, { loading, data }] = useLazyQuery(FETCH_USERS, {
    onCompleted() {
      setGqlUsers(data.users)
    }
  })

  const onFetchFromApi = useCallback(async () => {
    const users = await httpClient<{ name: string}[]>()
    setApiUsers(users)
  }, [])

  const onFetchFromGql = useCallback(() => {
    fetchUsers()
  }, [])

  return (
    <div className="App">
      <div>
        <h2>From Api</h2>
        <button type="button" onClick={onFetchFromApi}>Fetch</button>
        {apiUsers.map((user: any) => {
          return <p key={user.name}>{user.name}</p>
        })}
      </div>
      <div>
        <h2>From GraphQL</h2>
        <button type="button" onClick={onFetchFromGql}>Fetch</button>
        {loading && <p>Loading...</p>}
        {gqlUsers.map((user: any) => {
          return <p key={user.name}>{user.name}</p>
        })}
      </div>
    </div>
  );
}

export default App;
