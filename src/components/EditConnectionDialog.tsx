import { Connection } from '../models/Connection'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useState } from 'react'

type Props = {
  connection: Connection
  onCloseHandler: () => void
  open: boolean
  editConnection: (x: Connection) => void
}

const EditConnectionDialog: React.FC<Props> = ({
  connection,
  onCloseHandler,
  open,
  editConnection,
}) => {
  const save = () => editConnection(new Connection('33', 1, 0, 0, 0, 0, 0, 0))

  const [name, setName] = useState(connection.connectionName)

  return (
    <Dialog open={open} onClose={onCloseHandler}>
      <form>
        <DialogTitle>Edit Connection</DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            margin="dense"
            id="connection_name"
            label="Connection Name"
            type="text"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            value={connection.delay}
            margin="dense"
            id="delay"
            label="Delay in ms"
            type="number"
            fullWidth
          />
          <TextField
            value={connection.packetLoss}
            margin="dense"
            id="packet_loss"
            label="Packet Loss in %"
            type="number"
            fullWidth
          />
          <TextField
            value={connection.bandwidth}
            margin="dense"
            id="bandwith"
            label="Bandwith in Mbit/s"
            type="number"
            fullWidth
          />
          <TextField
            value={connection.jitter}
            margin="dense"
            id="jitter"
            label="Jitter in ms"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditConnectionDialog
