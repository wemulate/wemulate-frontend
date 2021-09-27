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
import logo from './static/wemulate_logo.png'
import { version } from './../package.json'
import SpeedDial from '@mui/material/SpeedDial'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid'
import './App.css'
import AddConnectionDialog from './components/AddConnectionDialog'

const App: React.FC = () => {
  const [device, setDevice] = useState<Device>(new Device([], []))
  const [connections, setConnections] = useState<Array<Connection>>([
    new Connection('', 0, 0, 0, 0, 0, 0, 0),
  ])

  const [openAddConnection, setAddConnection] = useState<boolean>(false)

  useEffect(() => setDevice(getDevices()), [])
  useEffect(() => setConnections(getConnections()), [])

  const handleOpenAddConnection = () => setAddConnection(true)
  const handleCloseAddConnection = () => setAddConnection(false)

  return (
    <div>
      <AppBar position="static" sx={{ mb: 1 }}>
        <Toolbar>
          <img alt="logo" width={88} style={{ marginRight: 24 }} src={logo} />
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            WEmulate
          </Typography>
          <Typography>{version}</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <DeviceOverview device={device} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ConnectionOverview connections={connections} />
        </Grid>
      </Grid>
      <AddConnectionDialog
        onCloseHandler={handleCloseAddConnection}
        open={openAddConnection}
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<AddIcon />}
        onClick={handleOpenAddConnection}
      ></SpeedDial>
    </div>
  )
}

export default App
