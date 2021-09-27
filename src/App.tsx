import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import ConnectionOverview from './components/ConnectionOverview'
import DeviceOverview from './components/DeviceOverview'
import { Connection } from './models/Connection'
import { Device } from './models/Device'
import { getConnections } from './services/ConnectionService'
import getDevices from './services/DeviceService'
import logo from './static/WEmulate_logo.png'
import { version } from './../package.json'
import SpeedDial from '@mui/material/SpeedDial'
import AddIcon from '@mui/icons-material/Add'

const App: React.FC = () => {
  const [device, setDevice] = useState<Device>(new Device([], []))
  const [connections, setConnections] = useState<Array<Connection>>([
    new Connection('', 0, 0, 0, 0, 0, 0, 0),
  ])

  useEffect(() => setDevice(getDevices()), [])
  useEffect(() => setConnections(getConnections()), [])

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img alt="logo" width={88} style={{ marginRight: 24 }} src={logo} />
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            WEmulate
          </Typography>
          <Typography>{version}</Typography>
        </Toolbar>
      </AppBar>
      <DeviceOverview device={device} />
      <ConnectionOverview connections={connections} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<AddIcon />}
        onClick={() => alert('test')}
      ></SpeedDial>
    </div>
  )
}

export default App
