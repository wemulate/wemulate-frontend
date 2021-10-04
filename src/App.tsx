import { useEffect, useState } from 'react'
import ConnectionOverview from './components/ConnectionOverview'
import DeviceOverview from './components/DeviceOverview'
import { Connection } from './models/Connection'
import { Device } from './models/Device'
import { getConnections } from './services/ConnectionService'
import getDevices from './services/DeviceService'
import SpeedDial from '@mui/material/SpeedDial'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid'
import './App.css'
import AddConnectionDialog from './components/AddConnectionDialog'
import TitleBar from './components/TitleBar'
import Tooltip from '@mui/material/Tooltip'

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

  const usedInterfaceIds = connections
    .map((x) => x.firstLogicalInterfaceId)
    .concat(connections.map((x) => x.secondLogicalInterfaceId))

  return (
    <div>
      <TitleBar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <DeviceOverview device={device} usedInterfaceIds={usedInterfaceIds} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ConnectionOverview connections={connections} />
        </Grid>
      </Grid>
      <AddConnectionDialog
        onCloseHandler={handleCloseAddConnection}
        open={openAddConnection}
        logicalInterfaces={device.logicalInterfaces}
        usedInterfaceIds={usedInterfaceIds}
      />
      <Tooltip title="Add a New Connection" placement="left" arrow>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<AddIcon />}
          onClick={handleOpenAddConnection}
        ></SpeedDial>
      </Tooltip>
    </div>
  )
}

export default App
