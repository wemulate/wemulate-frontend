import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import CableIcon from '@mui/icons-material/Cable'
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi'
import { LogicalInterface } from '../models/LogicalInterface'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

type Props = {
  logicalInterfaces: Array<LogicalInterface>
  usedInterfaceIds: Array<number>
}

const LogicalInterfaceCard: React.FC<Props> = ({
  logicalInterfaces,
  usedInterfaceIds,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          Logical Interfaces
        </Typography>
        <List>
          {logicalInterfaces.map((x: LogicalInterface) => {
            return (
              <ListItem key={x.interfaceId}>
                <ListItemAvatar>
                  <Avatar>
                    <CableIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={x.logicalName}
                  secondary={x.physicalName}
                />
                {usedInterfaceIds.includes(x.interfaceId) && (
                  <SettingsInputHdmiIcon color="success" />
                )}
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}

export default LogicalInterfaceCard
