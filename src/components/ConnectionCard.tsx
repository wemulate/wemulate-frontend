import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Connection } from '../models/Connection'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {connection.connectionName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
            LAN A
            <SettingsEthernetIcon sx={{ ml: 1, mr: 1 }} />
            LAN B
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
          <Button size="small">edit</Button>
          <Button size="small">remove</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default ConnectionCard
