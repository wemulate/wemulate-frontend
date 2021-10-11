import { Connection } from '../models/Connection'
import ConfigService from './ConfigService'

export const getConnections = async (): Promise<Array<Connection>> => {
  const response = await fetch(`${ConfigService.host}/api/v1/connections`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status !== 200) {
    throw new Error(
      `${response.status} - ${response.statusText}: ${response.url}`,
    )
  }

  const connectionsResponse = await response.json()
  return connectionsResponse.connections.map((x: any) => Connection.fromDto(x))
}

export const connectionRequest = async (
  method: string,
  connection: Connection,
  id: string = '',
) => {
  const response = await fetch(
    `${ConfigService.host}/api/v1/connections/${id}`,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(connection.toDto()),
    },
  )

  if (response.status !== 200) {
    throw new Error(
      `${response.status} - ${response.statusText}: ${response.url}`,
    )
  }
  return Connection.fromDto(await response.json())
}

export const postConnection = async (connection: Connection) => {
  return await connectionRequest('POST', connection)
}

export const putConnection = async (connection: Connection) => {
  return await connectionRequest(
    'PUT',
    connection,
    `${connection.connectionId}`,
  )
}

export const deleteConnection = async (connection: Connection) => {
  return await connectionRequest(
    'DELETE',
    connection,
    `${connection.connectionId}`,
  )
}
