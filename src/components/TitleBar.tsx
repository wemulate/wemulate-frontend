import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from '../static/wemulate_logo.png'
import { version } from './../../package.json'

const TitleBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ mb: 1 }}>
      <Toolbar>
        <img alt="logo" width={88} style={{ marginRight: 24 }} src={logo} />
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          WEmulate
        </Typography>
        <Typography>{version}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar
