import { Connection } from '../models/Connection'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import * as yup from 'yup'
import { useFormik } from 'formik'
import DialogContentText from '@mui/material/DialogContentText'
import { Settings } from '../models/Settings'
import SaveIcon from '@mui/icons-material/Save'
import { Grid, Link, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

type Props = {
  connection: Connection
  onCloseHandler: () => void
  open: boolean
  editConnection: (x: Connection) => Promise<void>
  setIsLoading: (x: boolean) => void
  getLogicalInterfaceNameById: (x: number) => string | undefined
}

const EditConnectionDialog: React.FC<Props> = ({
  connection,
  onCloseHandler,
  open,
  editConnection,
  setIsLoading,
  getLogicalInterfaceNameById,
}) => {
  const formSchema = yup.object({
    delayIn: yup.number().min(0).max(100000).required(),
    delayOut: yup.number().min(0).max(100000).required(),
    packetLossIn: yup.number().min(0).max(100).required(),
    packetLossOut: yup.number().min(0).max(100).required(),
    bandwidthIn: yup.number().min(0).max(100000).required(),
    bandwidthOut: yup.number().min(0).max(100000).required(),
    jitterIn: yup.number().min(0).max(100000).required(),
    jitterOut: yup.number().min(0).max(100000).required(),
  })

  const formik = useFormik({
    initialValues: {
      delayIn: connection.settingsIncoming.delay,
      delayOut: connection.settingsOutgoing.delay,
      packetLossIn: connection.settingsIncoming.packetLoss,
      packetLossOut: connection.settingsOutgoing.packetLoss,
      bandwidthIn: connection.settingsIncoming.bandwidth,
      bandwidthOut: connection.settingsOutgoing.bandwidth,
      jitterIn: connection.settingsIncoming.jitter,
      jitterOut: connection.settingsOutgoing.jitter,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      // onCloseHandler has to be called first,
      // otherwise react shows an error because of its state
      // e.g. when updating delay
      // that is updated in an unmounted component
      // TODO: understand why...
      onCloseHandler()
      setIsLoading(true)
      await editConnection(
        new Connection(
          connection.connectionName,
          connection.connectionId,
          connection.firstLogicalInterfaceId,
          connection.secondLogicalInterfaceId,
          new Settings(
            values.delayIn,
            values.packetLossIn,
            values.bandwidthIn,
            values.jitterIn,
          ),
          new Settings(
            values.delayOut,
            values.packetLossOut,
            values.bandwidthOut,
            values.jitterOut,
          ),
        ),
      )
      setIsLoading(false)
    },
  })

  const handleResetForm = () => {
    formik.resetForm()
  }

  return (
    <Dialog open={open} onClose={onCloseHandler}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ display: 'flex' }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Edit Connection: {connection.connectionName}
          </Typography>
          <Link
            sx={{ ':hover': { color: '#fecb36' } }}
            rel="noreferrer"
            target="_blank"
            href="https://wemulate.github.io/wemulate/dev/incoming-outgoing-explanation.html"
          >
            <InfoIcon />
          </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DialogContentText sx={{ marginBottom: 1 }}>
                {`
                ${getLogicalInterfaceNameById(
                  connection.firstLogicalInterfaceId,
                )} 🡆 ${getLogicalInterfaceNameById(
                  connection.secondLogicalInterfaceId,
                )}`}
              </DialogContentText>
              <TextField
                margin="dense"
                id="delayIn"
                name="delayIn"
                label="Delay in ms"
                type="text"
                fullWidth
                value={formik.values.delayIn}
                onChange={formik.handleChange}
                error={
                  formik.errors.delayIn !== undefined &&
                  formik.touched.delayIn &&
                  true
                }
                helperText={formik.touched.delayIn && formik.errors.delayIn}
              />
              <TextField
                margin="dense"
                id="packetLossIn"
                name="packetLossIn"
                label="Packet Loss in %"
                type="text"
                fullWidth
                value={formik.values.packetLossIn}
                onChange={formik.handleChange}
                error={
                  formik.errors.packetLossIn !== undefined &&
                  formik.touched.packetLossIn &&
                  true
                }
                helperText={
                  formik.touched.packetLossIn && formik.errors.packetLossIn
                }
              />
              <TextField
                margin="dense"
                id="jitterIn"
                name="jitterIn"
                label="Jitter in ms"
                type="text"
                fullWidth
                value={formik.values.jitterIn}
                onChange={formik.handleChange}
                error={
                  formik.errors.jitterIn !== undefined &&
                  formik.touched.jitterIn &&
                  true
                }
                helperText={formik.touched.jitterIn && formik.errors.jitterIn}
              />
              <TextField
                margin="dense"
                id="bandwidthIn"
                name="bandwidthIn"
                label="Bandwidth in Mbit/s"
                type="text"
                fullWidth
                value={formik.values.bandwidthIn}
                onChange={formik.handleChange}
                error={
                  formik.errors.bandwidthIn !== undefined &&
                  formik.touched.bandwidthIn &&
                  true
                }
                helperText={
                  formik.touched.bandwidthIn && formik.errors.bandwidthIn
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DialogContentText sx={{ marginBottom: 1 }}>
                {`
                ${getLogicalInterfaceNameById(
                  connection.firstLogicalInterfaceId,
                )} 🡄 ${getLogicalInterfaceNameById(
                  connection.secondLogicalInterfaceId,
                )}`}
              </DialogContentText>
              <TextField
                margin="dense"
                id="delayOut"
                name="delayOut"
                label="Delay in ms"
                type="text"
                fullWidth
                value={formik.values.delayOut}
                onChange={formik.handleChange}
                error={
                  formik.errors.delayOut !== undefined &&
                  formik.touched.delayOut &&
                  true
                }
                helperText={formik.touched.delayOut && formik.errors.delayOut}
              />
              <TextField
                margin="dense"
                id="packetLossOut"
                name="packetLossOut"
                label="Packet Loss in %"
                type="text"
                fullWidth
                value={formik.values.packetLossOut}
                onChange={formik.handleChange}
                error={
                  formik.errors.packetLossOut !== undefined &&
                  formik.touched.packetLossOut &&
                  true
                }
                helperText={
                  formik.touched.packetLossOut && formik.errors.packetLossOut
                }
              />
              <TextField
                margin="dense"
                id="jitterOut"
                name="jitterOut"
                label="Jitter in ms"
                type="text"
                fullWidth
                value={formik.values.jitterOut}
                onChange={formik.handleChange}
                error={
                  formik.errors.jitterOut !== undefined &&
                  formik.touched.jitterOut &&
                  true
                }
                helperText={formik.touched.jitterOut && formik.errors.jitterOut}
              />
              <TextField
                margin="dense"
                id="bandwidthOut"
                name="bandwidthOut"
                label="Bandwidth in Mbit/s"
                type="text"
                fullWidth
                value={formik.values.bandwidthOut}
                onChange={formik.handleChange}
                error={
                  formik.errors.bandwidthOut !== undefined &&
                  formik.touched.bandwidthOut &&
                  true
                }
                helperText={
                  formik.touched.bandwidthOut && formik.errors.bandwidthOut
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            marginTop: -1,
            marginRight: 2,
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={handleResetForm}
            sx={{ marginLeft: 2 }}
          >
            Reset
          </Button>
          <div>
            <Button
              onClick={onCloseHandler}
              variant="outlined"
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              startIcon={<SaveIcon />}
              sx={{ marginLeft: 1 }}
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditConnectionDialog
