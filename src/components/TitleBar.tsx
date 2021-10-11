import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from '../static/wemulate_logo.png'
import { version } from './../../package.json'
import { CustomError } from '../models/CustomError'
import ErrorMessage from './ErrorMessage'

type Props = {
  error: CustomError | null
  removeError: () => void
}

const TitleBar: React.FC<Props> = ({ error, removeError }) => {
  return (
    <div>
      <AppBar position="static" sx={{ mb: 1 }}>
        <Toolbar>
          <img alt="logo" width={88} style={{ marginRight: 24 }} src={logo} />
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            WEmulate
          </Typography>
          <Typography>{version}</Typography>
        </Toolbar>
      </AppBar>
      {error && <ErrorMessage error={error} removeError={removeError} />}
    </div>
  )
}

export default TitleBar
