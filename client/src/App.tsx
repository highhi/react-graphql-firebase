import React, { useCallback, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { FETCH_USERS } from './graphql/queries/fetchUsers'
import { FetchUsers } from './graphql/queries/__generated__/FetchUsers'

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

const App: React.FC = () => {
  const [apiUsers, setApiUsers] = useState<FetchUsers['users']>([])
  const [gqlUsers, setGqlUsers] = useState<FetchUsers['users']>([])
  const [fetchUsers, { loading }] = useLazyQuery<{ users: FetchUsers['users'] }>(FETCH_USERS, {
    onCompleted({ users }) {
      setGqlUsers(users)
    }
  })

  const onFetchFromApi = useCallback(async () => {
    const users = await httpClient<FetchUsers['users']>()
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
