import { Device } from '../models/Device'
import ConfigService from './ConfigService'

export const getDevice = async (): Promise<Device> => {
  const response = await fetch(`${ConfigService.host}/api/v1/device`, {
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
  return Device.fromDto(await response.json())
}
