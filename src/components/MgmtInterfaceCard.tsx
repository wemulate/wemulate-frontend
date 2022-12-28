import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { MgmtInterface } from '../models/MgmtInterface'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

type Props = {
  mgmtInterfaces: Array<MgmtInterface>
}

const MgmtInterfaceCard: React.FC<Props> = ({ mgmtInterfaces }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          Management Interfaces
        </Typography>
        <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
          {mgmtInterfaces.map((x: MgmtInterface) => {
            return (
              <ListItem key={x.ip}>
                <ListItemAvatar>
                  <Avatar>
                    <ManageAccountsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={x.physicalName} secondary={x.ip} />
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}

export default MgmtInterfaceCard
