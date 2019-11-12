import React, { useCallback, useState } from 'react'
import './App.css'
import { FETCH_USERS } from './graphql/queries/users'
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

type User = {
  name: string
}

type Users = User[]

const App: React.FC = () => {
  const [apiUsers, setApiUsers] = useState<Users>([])
  const [gqlUsers, setGqlUsers] = useState<Users>([])
  const [fetchUsers, { loading }] = useLazyQuery<{ users: Users }>(FETCH_USERS, {
    onCompleted({ users }) {
      setGqlUsers(users)
    }
  })

  const onFetchFromApi = useCallback(async () => {
    const users = await httpClient<Users>()
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
        {apiUsers.map((user) => {
          return <p key={user.name}>{user.name}</p>
        })}
      </div>
      <div>
        <h2>From GraphQL</h2>
        <button type="button" onClick={onFetchFromGql}>Fetch</button>
        {loading && <p>Loading...</p>}
        {gqlUsers.map((user) => {
          return <p key={user.name}>{user.name}</p>
        })}
      </div>
    </div>
  );
}

export default App;
