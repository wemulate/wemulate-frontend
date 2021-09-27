import { Device } from '../models/Device'

const getDevices = () => {
  return Device.fromDto({
    mgmt_interfaces: [
      {
        ip: '192.168.1.1',
        physical_name: 'ens0',
      },
      {
        ip: '10.10.10.10',
        physical_name: 'ens1',
      },
    ],
    logical_interfaces: [
      {
        interface_id: 1,
        logical_name: 'LAN A',
        physical_name: 'eth1',
      },
      {
        interface_id: 2,
        logical_name: 'LAN B',
        physical_name: 'eth2',
      },
      {
        interface_id: 3,
        logical_name: 'LAN C',
        physical_name: 'eth3',
      },
      {
        interface_id: 4,
        logical_name: 'LAN D',
        physical_name: 'eth4',
      },
    ],
  })
}

export default getDevices
