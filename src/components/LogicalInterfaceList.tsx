import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import CableIcon from '@mui/icons-material/Cable'
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi'
import IconButton from '@mui/material/IconButton'
import { LogicalInterface } from '../models/LogicalInterface'

type Props = {
  logicalInterfaces: Array<LogicalInterface>
}

const DeviceOverview: React.FC<Props> = ({ logicalInterfaces }) => {
  return (
    <div>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          border: 1,
        }}
      >
        {logicalInterfaces.map((x, key) => {
          return (
            <ListItem key={key}>
              <ListItemAvatar>
                <Avatar>
                  <CableIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={x.logicalName}
                secondary={x.physicalName}
              />
              <IconButton edge="end" aria-label="comments">
                <SettingsInputHdmiIcon color="success" />
              </IconButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default DeviceOverview
