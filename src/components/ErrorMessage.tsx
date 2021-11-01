import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'

type Props = {
  error: string
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
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ErrorMessage
