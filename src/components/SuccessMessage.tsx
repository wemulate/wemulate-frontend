import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'

type Props = {
  success: string
  removeSuccess: () => void
}

const SuccessMessage: React.FC<Props> = ({ success, removeSuccess }) => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false)
          removeSuccess()
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false)
            removeSuccess()
          }}
          variant="filled"
          severity="success"
          sx={{ mb: 1 }}
        >
          {success}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SuccessMessage
