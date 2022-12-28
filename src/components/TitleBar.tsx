import { Switch } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from '../static/wemulate_logo.png'
import SnackbarMessage from './SnackbarMessage'
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium'

type Props = {
  error: string | null
  removeError: () => void
  changeTheme: () => void
}

const TitleBar: React.FC<Props> = ({ error, removeError, changeTheme }) => {
  return (
    <div>
      <AppBar position="static" sx={{ mb: 1 }}>
        <Toolbar>
          <img alt="logo" width={88} style={{ marginRight: 24 }} src={logo} />
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            WEmulate
          </Typography>
          <BrightnessMediumIcon />
          <Switch onChange={changeTheme} defaultChecked />
          <Typography>{process.env.REACT_APP_VERSION}</Typography>
        </Toolbar>
      </AppBar>
      {error && (
        <SnackbarMessage
          messageText={error}
          clearMessage={removeError}
          color={'error'}
        />
      )}
    </div>
  )
}

export default TitleBar
