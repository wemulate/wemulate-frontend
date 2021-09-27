import { useEffect, useState } from 'react'
import ConnectionOverview from './components/ConnectionOverview'
import DeviceOverview from './components/DeviceOverview'
import { Connection } from './models/Connection'
import { Device } from './models/Device'
import { getConnections } from './services/ConnectionService'
import getDevices from './services/DeviceService'

const App: React.FC = () => {
  const [device, setDevice] = useState<Device>(new Device([], []))
  const [connections, setConnections] = useState<Array<Connection>>([
    new Connection('', 0, 0, 0, 0, 0, 0, 0),
  ])

  useEffect(() => setDevice(getDevices()), [])
  useEffect(() => setConnections(getConnections()), [])

  return (
    <div>
      <DeviceOverview device={device} />
      <ConnectionOverview connections={connections} />
    </div>
  )
}

export default App
