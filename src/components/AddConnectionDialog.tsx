import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContentText from '@mui/material/DialogContentText'

type Props = {
  onCloseHandler: () => void
  open: boolean
}

const AddConnectionDialog: React.FC<Props> = ({ onCloseHandler, open }) => {
  return (
    <Dialog open={open} onClose={onCloseHandler}>
      <DialogTitle>Add a New Connection</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Connect two logical interfaces together to setup jitter, packet lose
          etc.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="connectionName"
          label="Connection Name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler}>Cancel</Button>
        <Button onClick={onCloseHandler}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddConnectionDialog
