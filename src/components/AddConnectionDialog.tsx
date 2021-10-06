import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContentText from '@mui/material/DialogContentText'
import { LogicalInterface } from '../models/LogicalInterface'
import MenuItem from '@mui/material/MenuItem'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Connection } from '../models/Connection'

type Props = {
  onCloseHandler: () => void
  open: boolean
  logicalInterfaces: Array<LogicalInterface>
  usedInterfaceIds: Array<number>
  addConnection: (x: Connection) => void
  connections: Array<Connection>
}

const AddConnectionDialog: React.FC<Props> = ({
  onCloseHandler,
  open,
  logicalInterfaces,
  usedInterfaceIds,
  addConnection,
  connections,
}) => {
  const formSchema = yup.object({
    connection_name: yup
      .mixed()
      .notOneOf(connections.map((x) => x.connectionName))
      .required(),
    first_logical_interface_id: yup.number().required(),
    second_logical_interface_id: yup.number().required(),
  })

  const formik = useFormik({
    initialValues: {
      connection_name: '',
      first_logical_interface_id: '',
      second_logical_interface_id: '',
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      // resetForm() is needed so the select fields do not generate
      // an out of range warning because the value given is not as
      // MenuItem available anymore (after creating the connection)
      // https://github.com/mui-org/material-ui/issues/18494
      resetForm()
      addConnection(Connection.fromDto(values))
      onCloseHandler()
    },
  })

  if (logicalInterfaces.length - usedInterfaceIds.length < 2) {
    return (
      <Dialog open={open} onClose={onCloseHandler}>
        <DialogTitle>Add a New Connection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The current device does not have more than two logical interfaces
            {logicalInterfaces.length > 1 && ' left'}!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onClose={onCloseHandler}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add a New Connection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Connect two logical interfaces together to setup jitter, packet lose
            etc. for the traffic between these interfaces.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="connection_name"
            value={formik.values.connection_name}
            label="Connection Name"
            type="text"
            fullWidth
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
            select
            margin="dense"
            fullWidth
            id="first_logical_interface_id"
            name="first_logical_interface_id"
            value={formik.values.first_logical_interface_id}
            onChange={formik.handleChange}
            error={
              formik.errors.first_logical_interface_id !== undefined &&
              formik.touched.first_logical_interface_id &&
              true
            }
            helperText={
              formik.touched.first_logical_interface_id &&
              formik.errors.first_logical_interface_id
            }
          >
            {logicalInterfaces.map((x) => {
              return (
                !usedInterfaceIds.includes(x.interfaceId) && (
                  <MenuItem key={x.interfaceId} value={x.interfaceId}>
                    {x.logicalName}
                  </MenuItem>
                )
              )
            })}
          </TextField>
          <TextField
            select
            margin="dense"
            fullWidth
            id="second_logical_interface_id"
            name="second_logical_interface_id"
            value={formik.values.second_logical_interface_id}
            onChange={formik.handleChange}
            error={
              formik.errors.second_logical_interface_id !== undefined &&
              formik.touched.second_logical_interface_id &&
              true
            }
            helperText={
              formik.touched.second_logical_interface_id &&
              formik.errors.second_logical_interface_id
            }
          >
            {logicalInterfaces.map((x) => {
              return (
                !usedInterfaceIds.includes(x.interfaceId) && (
                  <MenuItem key={x.interfaceId} value={x.interfaceId}>
                    {x.logicalName}
                  </MenuItem>
                )
              )
            })}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddConnectionDialog
