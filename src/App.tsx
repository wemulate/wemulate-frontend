import { useEffect, useState } from 'react'
import DeviceOverview from './DeviceOverview'
import { Device } from './models/Device'
import getDevices from './services/DeviceService'

const App: React.FC = () => {
  const [device, setDevice] = useState<Device>(new Device([], []))

  useEffect(() => setDevice(getDevices()), [])

  return (
    <div>
      App
      <DeviceOverview device={device} />
    </div>
  )
}

export default App
