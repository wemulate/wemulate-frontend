import { Connection } from '../models/Connection'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import * as yup from 'yup'
import { useFormik } from 'formik'

type Props = {
  connection: Connection
  onCloseHandler: () => void
  open: boolean
  editConnection: (x: Connection) => void
  connections: Array<Connection>
}

const EditConnectionDialog: React.FC<Props> = ({
  connection,
  onCloseHandler,
  open,
  editConnection,
  connections,
}) => {
  const formSchema = yup.object({
    connection_name: yup
      .mixed()
      .notOneOf(
        connections.map((x) =>
          x.connectionName !== connection.connectionName
            ? x.connectionName
            : '',
        ),
      )
      .required(),
    delay: yup.number().min(0).required(),
    packet_loss: yup.number().min(0).max(100).required(),
    bandwidth: yup.number().min(0).required(),
    jitter: yup.number().min(0).required(),
  })

  const formik = useFormik({
    initialValues: {
      connection_name: connection.connectionName,
      delay: connection.delay,
      packet_loss: connection.packetLoss,
      bandwidth: connection.bandwidth,
      jitter: connection.jitter,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // onCloseHandler has to be called first,
      // otherwise react shows an error because of state
      // e.g. when updating the connection name
      // that is updated in an unmounted component
      // TODO: understand whyd...
      onCloseHandler()
      editConnection(
        new Connection(
          values.connection_name,
          connection.connectionId,
          connection.firstLogicalInterfaceId,
          connection.secondLogicalInterfaceId,
          values.delay,
          values.packet_loss,
          values.bandwidth,
          values.jitter,
        ),
      )
    },
  })

  return (
    <Dialog open={open} onClose={onCloseHandler}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit Connection</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="connection_name"
            name="connection_name"
            label="Connection Name"
            type="text"
            fullWidth
            value={formik.values.connection_name}
            onChange={formik.handleChange}
            error={
              formik.errors.connection_name !== undefined &&
              formik.touched.connection_name &&
              true
            }
            helperText={
              formik.touched.connection_name && formik.errors.connection_name
            }
          />
          <TextField
            margin="dense"
            id="delay"
            name="delay"
            label="Delay in ms"
            type="number"
            fullWidth
            value={formik.values.delay}
            onChange={formik.handleChange}
            error={
              formik.errors.delay !== undefined && formik.touched.delay && true
            }
            helperText={formik.touched.delay && formik.errors.delay}
          />
          <TextField
            margin="dense"
            id="packet_loss"
            name="packet_loss"
            label="Packet Loss in %"
            type="number"
            fullWidth
            value={formik.values.packet_loss}
            onChange={formik.handleChange}
            error={
              formik.errors.packet_loss !== undefined &&
              formik.touched.packet_loss &&
              true
            }
            helperText={formik.touched.packet_loss && formik.errors.packet_loss}
          />
          <TextField
            margin="dense"
            id="bandwidth"
            name="bandwidth"
            label="Bandwidth in Mbit/s"
            type="number"
            fullWidth
            value={formik.values.bandwidth}
            onChange={formik.handleChange}
            error={
              formik.errors.bandwidth !== undefined &&
              formik.touched.bandwidth &&
              true
            }
            helperText={formik.touched.bandwidth && formik.errors.bandwidth}
          />
          <TextField
            margin="dense"
            id="jitter"
            name="jitter"
            label="Jitter in ms"
            type="number"
            fullWidth
            value={formik.values.jitter}
            onChange={formik.handleChange}
            error={
              formik.errors.jitter !== undefined &&
              formik.touched.jitter &&
              true
            }
            helperText={formik.touched.jitter && formik.errors.jitter}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditConnectionDialog
