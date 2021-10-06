import { Device } from '../models/Device'

export const getDevice = async (): Promise<Device> => {
  const response = await fetch('http://localhost:8000/api/v1/device', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return Device.fromDto(await response.json())
}
