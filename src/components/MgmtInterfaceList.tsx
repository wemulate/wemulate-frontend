import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { MgmtInterface } from "../models/MgmtInterface";

type Props = {
  mgmtInterfaces: Array<MgmtInterface>
}

const MgmtInterfaceList: React.FC<Props> = ({mgmtInterfaces}) => {
  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border: 1 }}>
        {
          mgmtInterfaces.map((x, key) => { return (
            <ListItem key={key}>
              <ListItemAvatar>
                <Avatar>
                  <ManageAccountsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={x.physicalName} secondary={x.ip} />
            </ListItem>
          )})
        }
      </List>
    </div>
  )
}

export default MgmtInterfaceList;
