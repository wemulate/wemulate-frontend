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
import SnackbarMessage from './components/SnackbarMessage'
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const App: React.FC = () => {
  const [device, setDevice] = useState<Device>(new Device([], []))
  const [connections, setConnections] = useState<Array<Connection>>([])
  const [openAddConnection, setOpenAddConnection] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [colorTheme, setColorTheme] = useState<Theme>(darkTheme)

  useEffect(() => {
    const asyncInit = async () => {
      try {
        setDevice(await getDevice())
        setConnections(await getConnections())
        setInitLoading(false)
      } catch (e) {
        setError((e as Error).message)
      }
    }
    asyncInit()
  }, [])

  const changeTheme = () => {
    colorTheme === darkTheme
      ? setColorTheme(lightTheme)
      : setColorTheme(darkTheme)
  }

  const removeError = () => {
    setError(null)
  }

  const removeSuccess = () => {
    setSuccess(null)
  }

  const handleOpenAddConnection = () => setOpenAddConnection(true)
  const handleCloseAddConnection = () => setOpenAddConnection(false)

  const removeConnection = async (connection: Connection) => {
    try {
      await deleteConnection(connection)
      setConnections(
        connections.filter((x) => x.connectionId !== connection.connectionId),
      )
      setSuccess('Connection successfully deleted')
    } catch (e) {
      setError((e as Error).message)
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
      setSuccess('Connection successfully adjusted')
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const addConnection = async (connection: Connection) => {
    try {
      const newConnection = await postConnection(connection)
      setConnections((prevState) => [...prevState, newConnection])
      setSuccess('Connection successfully added')
    } catch (e) {
      setError((e as Error).message)
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
      <ThemeProvider theme={colorTheme}>
        <CssBaseline />
        <TitleBar
          changeTheme={changeTheme}
          error={error}
          removeError={removeError}
        />
        <LinearProgress />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={colorTheme}>
      <CssBaseline />
      <TitleBar
        changeTheme={changeTheme}
        error={error}
        removeError={removeError}
      />
      <Container sx={{ mt: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <DeviceOverview device={device} usedInterfaceIds={usedInterfaceIds} />
          <ConnectionOverview
            connections={connections}
            editConnection={editConnection}
            removeConnection={removeConnection}
            getLogicalInterfaceNameById={getLogicalInterfaceNameById}
          />
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
        {success && (
          <SnackbarMessage
            messageText={success}
            clearMessage={removeSuccess}
            color={'success'}
          />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
