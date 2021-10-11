import { Connection } from '../models/Connection'
import ConfigService from './ConfigService'

export const getConnections = async (): Promise<Array<Connection>> => {
  const response = await fetch(
    `${ConfigService.socketAddress}/api/v1/connections`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (response.status !== 200) {
    throw new Error(
      `${response.status} - ${response.statusText}: ${response.url}`,
    )
  }
  const connectionsResponse = await response.json()
  return connectionsResponse.connections.map((x: any) => Connection.fromDto(x))
}

export const postConnection = async (connection: Connection) => {
  console.log(connection)
  const response = await fetch(
    `${ConfigService.socketAddress}/api/v1/connections`,
    {
      method: 'POST',
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

export const putConnection = async (connection: Connection) => {
  const response = await fetch(
    `${ConfigService.socketAddress}/api/v1/connections/${connection.connectionId}`,
    {
      method: 'PUT',
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

export const deleteConnection = async (connection: Connection) => {
  const response = await fetch(
    `${ConfigService.socketAddress}/api/v1/connections/${connection.connectionId}`,
    {
      method: 'DELETE',
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
