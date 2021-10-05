import { useEffect, useState } from 'react'
import ConnectionOverview from './components/ConnectionOverview'
import DeviceOverview from './components/DeviceOverview'
import { Connection } from './models/Connection'
import { Device } from './models/Device'
import { getConnections } from './services/ConnectionService'
import getDevice from './services/DeviceService'
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

  const [openAddConnection, setOpenAddConnection] = useState<boolean>(false)

  useEffect(() => {
    const asyncSetDevice = async () => setDevice(await getDevice())
    asyncSetDevice()
  }, [])
  useEffect(() => {
    const asyncSetConnections = async () =>
      setConnections(await getConnections())
    asyncSetConnections()
  }, [])

  const handleOpenAddConnection = () => setOpenAddConnection(true)
  const handleCloseAddConnection = () => setOpenAddConnection(false)

  const removeConnectionById = (id: number) => {
    setConnections(connections.filter((x) => x.connectionId !== id))
  }

  const editConnection = (connection: Connection) => {
    const index = connections.findIndex(
      (x) => x.connectionId === connection.connectionId,
    )
    setConnections((prevState) => {
      const newState = [...prevState]
      newState[index] = connection
      return newState
    })
  }

  const addConnection = (connection: Connection) => {
    setConnections((prevState) => [...prevState, connection])
  }

  const usedInterfaceIds = connections
    .map((x) => x.firstLogicalInterfaceId)
    .concat(connections.map((x) => x.secondLogicalInterfaceId))

  const getLogicalInterfaceNameById = (id: number) =>
    device.logicalInterfaces.find((x) => x.interfaceId === id)?.logicalName

  return (
    <div>
      <TitleBar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <DeviceOverview device={device} usedInterfaceIds={usedInterfaceIds} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ConnectionOverview
            connections={connections}
            editConnection={editConnection}
            removeConnectionById={removeConnectionById}
            getLogicalInterfaceNameById={getLogicalInterfaceNameById}
          />
        </Grid>
      </Grid>
      <AddConnectionDialog
        onCloseHandler={handleCloseAddConnection}
        open={openAddConnection}
        logicalInterfaces={device.logicalInterfaces}
        usedInterfaceIds={usedInterfaceIds}
        addConnection={addConnection}
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
