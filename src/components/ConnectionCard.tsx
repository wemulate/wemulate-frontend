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

type Props = {
  connection: Connection
}

const ConnectionCard: React.FC<Props> = ({ connection }) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {`${connection.firstLogicalInterfaceId} - ${connection.secondLogicalInterfaceId}`}
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
                primary="Bandwith"
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
          <Button>edit</Button>
          <Button>remove</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default ConnectionCard
