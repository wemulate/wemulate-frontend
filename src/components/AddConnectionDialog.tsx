import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContentText from '@mui/material/DialogContentText'
import { LogicalInterface } from '../models/LogicalInterface'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import * as yup from 'yup'
import { useFormik } from 'formik'
import FormHelperText from '@mui/material/FormHelperText'

type Props = {
  onCloseHandler: () => void
  open: boolean
  logicalInterfaces: Array<LogicalInterface>
  usedInterfaceIds: Array<number>
}

const AddConnectionDialog: React.FC<Props> = ({
  onCloseHandler,
  open,
  logicalInterfaces,
  usedInterfaceIds,
}) => {
  const formSchema = yup.object({
    connection_name: yup.string().required(),
    first_logical_interface_id: yup.number().required(),
    second_logical_interface_id: yup
      .number()
      .required()
      .moreThan(yup.ref('first_logical_interface_id'), 'Max should be > min'),
  })

  const formik = useFormik({
    initialValues: {
      connection_name: '',
      first_logical_interface_id: 3,
      second_logical_interface_id: 4,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  //TODO: add cases when no logical interface is left or not enough are available
  /*   if (usedInterfaceIds.length < 2) {
    return (
      <Dialog open={open} onClose={onCloseHandler}>
        <DialogTitle>Add a New Connection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The current device does not have more than two logical interfaces!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  } */

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
              formik.touched.connection_name &&
              Boolean(formik.errors.connection_name)
            }
            helperText={
              formik.touched.connection_name && formik.errors.connection_name
            }
          />
          <Select
            margin="dense"
            fullWidth
            id="first_logical_interface_id"
            value={formik.values.first_logical_interface_id}
            onChange={formik.handleChange}
            error={
              formik.touched.first_logical_interface_id &&
              Boolean(formik.errors.first_logical_interface_id)
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
          </Select>
          <FormHelperText>
            {formik.touched.first_logical_interface_id &&
              formik.errors.first_logical_interface_id}
          </FormHelperText>
          <Select
            margin="dense"
            fullWidth
            id="second_logical_interface_id"
            value={formik.values.second_logical_interface_id}
            onChange={formik.handleChange}
            error={
              formik.touched.second_logical_interface_id &&
              Boolean(formik.errors.second_logical_interface_id)
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
          </Select>
          <FormHelperText>
            {formik.touched.second_logical_interface_id &&
              formik.errors.second_logical_interface_id}
          </FormHelperText>
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
