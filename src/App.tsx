import { useEffect, useState } from 'react'
import ConnectionOverview from './components/ConnectionOverview'
import DeviceOverview from './components/DeviceOverview'
import { Connection } from './models/Connection'
import { Device } from './models/Device'
import {
  deleteConnection,
  getConnections,
  postConnection,
  putConnection,
} from './services/ConnectionService'
import { getDevice } from './services/DeviceService'
import SpeedDial from '@mui/material/SpeedDial'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid'
import './App.css'
import AddConnectionDialog from './components/AddConnectionDialog'
import TitleBar from './components/TitleBar'
import Tooltip from '@mui/material/Tooltip'
import LinearProgress from '@mui/material/LinearProgress'
import { CustomError } from './models/CustomError'

const App: React.FC = () => {
  const [device, setDevice] = useState<Device>(new Device([], []))
  const [connections, setConnections] = useState<Array<Connection>>([])
  const [openAddConnection, setOpenAddConnection] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [error, setError] = useState<CustomError | null>(null)

  useEffect(() => {
    const asyncInit = async () => {
      try {
        setDevice(await getDevice())
        setConnections(await getConnections())
        setInitLoading(false)
      } catch (e) {
        setError(new CustomError((e as Error).message))
      }
    }
    asyncInit()
  }, [])

  const removeError = () => {
    setError(null)
  }

  const handleOpenAddConnection = () => setOpenAddConnection(true)
  const handleCloseAddConnection = () => setOpenAddConnection(false)

  const removeConnection = async (connection: Connection) => {
    try {
      await deleteConnection(connection)
      setConnections(
        connections.filter((x) => x.connectionId !== connection.connectionId),
      )
    } catch (e) {
      setError(new CustomError((e as Error).message))
    }
  }

  const editConnection = async (connection: Connection) => {
    try {
      await putConnection(connection)
      const index = connections.findIndex(
        (x) => x.connectionId === connection.connectionId,
      )
      setConnections((prevState) => {
        const newState = [...prevState]
        newState[index] = connection
        return newState
      })
    } catch (e) {
      setError(new CustomError((e as Error).message))
    }
  }

  const addConnection = async (connection: Connection) => {
    try {
      const newConnection = await postConnection(connection)
      setConnections((prevState) => [...prevState, newConnection])
    } catch (e) {
      setError(new CustomError((e as Error).message))
    }
  }

  const usedInterfaceIds = connections
    .map((x) => x.firstLogicalInterfaceId)
    .concat(connections.map((x) => x.secondLogicalInterfaceId))

  const unusedLogicalInterfaces = device.logicalInterfaces.filter(
    (x) => !usedInterfaceIds.includes(x.interfaceId),
  )

  const getLogicalInterfaceNameById = (id: number) =>
    device.logicalInterfaces.find((x) => x.interfaceId === id)?.logicalName

  if (initLoading) {
    return (
      <div>
        <TitleBar error={error} removeError={removeError} />
        <LinearProgress />
      </div>
    )
  }

  return (
    <div>
      <TitleBar error={error} removeError={removeError} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <DeviceOverview device={device} usedInterfaceIds={usedInterfaceIds} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ConnectionOverview
            connections={connections}
            editConnection={editConnection}
            removeConnection={removeConnection}
            getLogicalInterfaceNameById={getLogicalInterfaceNameById}
          />
        </Grid>
      </Grid>
      <AddConnectionDialog
        onCloseHandler={handleCloseAddConnection}
        open={openAddConnection}
        logicalInterfaces={device.logicalInterfaces}
        unusedLogicalInterfaces={unusedLogicalInterfaces}
        addConnection={addConnection}
        connections={connections}
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
