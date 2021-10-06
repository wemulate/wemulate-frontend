import { Connection } from '../models/Connection'

export const getConnections = async () => {
  const response = await fetch('http://localhost:8000/api/v1/connections', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const connections = await response.json()
  return connections.connections.map((x: any) => Connection.fromDto(x))
}
