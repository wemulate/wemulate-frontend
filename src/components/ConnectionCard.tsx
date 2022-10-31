import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Connection } from '../models/Connection'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import SpeedIcon from '@mui/icons-material/Speed'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import EditConnectionDialog from './EditConnectionDialog'
import { useState } from 'react'
import CardActionArea from '@mui/material/CardActionArea'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import React from 'react'
import ConfirmationDialog from './ConfirmationDialog'

type Props = {
  connection: Connection
  editConnection: (x: Connection) => Promise<void>
  removeConnection: (x: Connection) => Promise<void>
  getLogicalInterfaceNameById: (x: number) => string | undefined
}

const ConnectionCard: React.FC<Props> = ({
  connection,
  editConnection,
  removeConnection,
  getLogicalInterfaceNameById,
}) => {
  const [openEditConnection, setOpenEditConnection] = useState<boolean>(false)
  const handleOpenEditConnection = () => setOpenEditConnection(true)
  const handleCloseEditConnection = () => setOpenEditConnection(false)
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState<boolean>(false)
  const handleOpenRemoveConfirm = () => setOpenRemoveConfirm(true)
  const handleCloseRemoveConfirm = () => setOpenRemoveConfirm(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveConnection = async () => {
    handleCloseRemoveConfirm()
    setIsLoading(true)
    await removeConnection(connection)
    setIsLoading(false)
  }

  const bandwidthMaxValue = (bandwidth: number) =>
    // eslint-disable-next-line eqeqeq
    bandwidth == 0 ? '∞' : bandwidth

  return (
    <React.Fragment>
      <Card sx={{ position: 'relative' }}>
        {isLoading && (
          <Backdrop
            sx={{
              color: '#fff',
              position: 'absolute',
              zIndex: 100,
            }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <CardActionArea onClick={handleOpenEditConnection}>
          <CardContent>
            <Typography variant="h5" component="div">
              {`${getLogicalInterfaceNameById(
                connection.firstLogicalInterfaceId,
              )}
              ⇄
              ${getLogicalInterfaceNameById(
                connection.secondLogicalInterfaceId,
              )}`}
            </Typography>
            <Typography
              sx={{ fontSize: 14, mb: 1.5 }}
              color="text.secondary"
              gutterBottom
            >
              {connection.connectionName}
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccessTimeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Delay"
                  secondary={`${connection.settingsIncoming.delay} ms --> | <-- ${connection.settingsOutgoing.delay} ms`}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CancelPresentationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Packet Loss"
                  secondary={`${connection.settingsIncoming.packetLoss} % --> | <-- ${connection.settingsOutgoing.packetLoss} %`}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FlashOnIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Jitter"
                  secondary={`${connection.settingsIncoming.jitter} ms --> | <-- ${connection.settingsOutgoing.jitter} ms`}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SpeedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Bandwidth"
                  secondary={`${bandwidthMaxValue(
                    connection.settingsIncoming.bandwidth,
                  )} Mbit/s --> | <-- ${bandwidthMaxValue(
                    connection.settingsOutgoing.bandwidth,
                  )} Mbit/s`}
                />
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ marginLeft: 1, marginBottom: 1 }}>
          <Button
            onClick={handleOpenEditConnection}
            variant="outlined"
            startIcon={<ModeEditIcon />}
          >
            edit
          </Button>
          <Button
            onClick={handleOpenRemoveConfirm}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
      <EditConnectionDialog
        connection={connection}
        onCloseHandler={handleCloseEditConnection}
        editConnection={editConnection}
        open={openEditConnection}
        setIsLoading={setIsLoading}
        getLogicalInterfaceNameById={getLogicalInterfaceNameById}
      />
      <ConfirmationDialog
        onCloseHandler={handleCloseRemoveConfirm}
        onConfirmHandler={handleRemoveConnection}
        open={openRemoveConfirm}
        title="Delete Connection"
        text={`Do you really want to delete the connection ${connection.connectionName}?`}
      />
    </React.Fragment>
  )
}

export default ConnectionCard
