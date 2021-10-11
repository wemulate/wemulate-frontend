import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'
import { CustomError } from '../models/CustomError'

type Props = {
  error: CustomError
  removeError: () => void
}

const ErrorMessage: React.FC<Props> = ({ error, removeError }) => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={7000}
        onClose={() => {
          setOpen(false)
          removeError()
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false)
            removeError()
          }}
          variant="filled"
          severity="error"
          sx={{ mb: 1 }}
        >
          {`${error.message}`}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ErrorMessage
