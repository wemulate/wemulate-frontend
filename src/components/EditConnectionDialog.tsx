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
  const save = () => {
    editConnection(
      new Connection(
        connectionName,
        connection.connectionId,
        connection.firstLogicalInterfaceId,
        connection.secondLogicalInterfaceId,
        delay,
        packetLoss,
        bandwidth,
        jitter,
      ),
    )
    onCloseHandler()
  }

  const [connectionName, setConnectionName] = useState(
    connection.connectionName,
  )
  const [delay, setDelay] = useState(connection.delay)
  const [packetLoss, setPacketLoss] = useState(connection.packetLoss)
  const [bandwidth, setBandwidth] = useState(connection.bandwidth)
  const [jitter, setJitter] = useState(connection.jitter)

  return (
    <Dialog open={open} onClose={onCloseHandler}>
      <form>
        <DialogTitle>Edit Connection</DialogTitle>
        <DialogContent>
          <TextField
            value={connectionName}
            margin="dense"
            id="connection_name"
            label="Connection Name"
            type="text"
            fullWidth
            onChange={(e) => setConnectionName(e.target.value)}
          />
          <TextField
            value={delay}
            margin="dense"
            id="delay"
            label="Delay in ms"
            type="number"
            fullWidth
            onChange={(e) => setDelay(parseInt(e.target.value))}
          />
          <TextField
            value={packetLoss}
            margin="dense"
            id="packet_loss"
            label="Packet Loss in %"
            type="number"
            fullWidth
            onChange={(e) => setPacketLoss(parseInt(e.target.value))}
          />
          <TextField
            value={bandwidth}
            margin="dense"
            id="bandwidth"
            label="Bandwidth in Mbit/s"
            type="number"
            fullWidth
            onChange={(e) => setBandwidth(parseInt(e.target.value))}
          />
          <TextField
            value={jitter}
            margin="dense"
            id="jitter"
            label="Jitter in ms"
            type="number"
            fullWidth
            onChange={(e) => setJitter(parseInt(e.target.value))}
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
