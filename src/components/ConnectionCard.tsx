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

type Props = {
  connection: Connection
  editConnection: (x: Connection) => void
  removeConnection: (x: Connection) => void
  getLogicalInterfaceNameById: (x: number) => string | undefined
  connections: Array<Connection>
}

const ConnectionCard: React.FC<Props> = ({
  connection,
  editConnection,
  removeConnection,
  getLogicalInterfaceNameById,
  connections,
}) => {
  const [openEditConnection, setOpenEditConnection] = useState<boolean>(false)
  const handleOpenEditConnection = () => setOpenEditConnection(true)
  const handleCloseEditConnection = () => setOpenEditConnection(false)

  const deleteConnection = () => {
    removeConnection(connection)
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {`${getLogicalInterfaceNameById(
              connection.firstLogicalInterfaceId,
            )} <> ${getLogicalInterfaceNameById(
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
                secondary={`${connection.delay} ms`}
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
                secondary={`${connection.packetLoss} %`}
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
                secondary={`${connection.bandwidth} Mbit/s`}
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
                secondary={`${connection.jitter} ms`}
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpenEditConnection}>edit</Button>
          <Button onClick={deleteConnection}>delete</Button>
        </CardActions>
      </Card>
      <EditConnectionDialog
        connection={connection}
        onCloseHandler={handleCloseEditConnection}
        editConnection={editConnection}
        open={openEditConnection}
        connections={connections}
      />
    </div>
  )
}

export default ConnectionCard
