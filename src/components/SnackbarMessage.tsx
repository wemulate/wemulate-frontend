import Alert, { AlertColor } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'

type Props = {
  messageText: string
  clearMessage: () => void
  color: AlertColor | undefined
}

const SnackbarMessage: React.FC<Props> = ({
  messageText,
  clearMessage,
  color,
}) => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false)
          clearMessage()
        }}
      >
        <Alert variant="filled" severity={color} sx={{ mb: 1 }}>
          {messageText}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackbarMessage
