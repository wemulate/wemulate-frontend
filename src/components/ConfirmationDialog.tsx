import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContentText from '@mui/material/DialogContentText'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'

type Props = {
  onCloseHandler: () => void
  onConfirmHandler: () => void
  open: boolean
  title: string
  text: string
}

const ConfirmationDialog: React.FC<Props> = ({
  onCloseHandler,
  onConfirmHandler,
  open,
  title,
  text,
}) => {
  return (
    <Dialog open={open} onClose={onCloseHandler}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ marginRight: 2, marginBottom: 2 }}>
        <Button
          onClick={onCloseHandler}
          variant="outlined"
          startIcon={<CloseIcon />}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirmHandler}
          variant="outlined"
          startIcon={<DoneIcon />}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
