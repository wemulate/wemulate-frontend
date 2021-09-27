import { Connection } from '../models/Connection'

export const getConnections = () => {
  return [
    {
      connection_name: 'Connection1',
      connection_id: 1,
      first_logical_interface_id: 1,
      second_logical_interface_id: 2,
      delay: 1,
      packet_loss: 5,
      bandwidth: 100,
      jitter: 10,
    },
    {
      connection_name: 'Connection2',
      connection_id: 2,
      first_logical_interface_id: 3,
      second_logical_interface_id: 4,
      delay: 2,
      packet_loss: 5,
      bandwidth: 50,
      jitter: 5,
    },
  ].map((x) => Connection.fromDto(x))
}

export const getConnection = (id: number) => {
  return Connection.fromDto({
    connection_name: 'Connection3',
    connection_id: 2,
    first_logical_interface_id: 2,
    second_logical_interface_id: 3,
    delay: 1,
    packet_loss: 6,
    bandwidth: 101,
    jitter: 6,
  })
}
