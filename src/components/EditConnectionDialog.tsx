import { Connection } from '../models/Connection'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import * as yup from 'yup'
import { useFormik } from 'formik'
import DialogContentText from '@mui/material/DialogContentText'
import { Settings } from '../models/Settings'
import SaveIcon from '@mui/icons-material/Save'
import { Box, Grid, Link, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import EditConnectionInputIn from '../subcomponents/EditConnectionInputIn'
import EditConnectionInputOut from '../subcomponents/EditConnectionInputOut'

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
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            Edit Connection: {connection.connectionName}
          </Box>
          <Link
            sx={{ ':hover': { color: '#fecb36' }, display: 'flex', alignItems: 'center' }}
            rel="noreferrer"
            target="_blank"
            href="https://wemulate.github.io/wemulate/dev/incoming-outgoing-explanation.html"
          >
            <Tooltip title="Configuration Infos" placement="bottom" arrow>
              <InfoIcon />
            </Tooltip>
          </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DialogContentText sx={{ marginBottom: 1 }}>
                {`
                ${getLogicalInterfaceNameById(
                  connection.firstLogicalInterfaceId,
                )} --> ${getLogicalInterfaceNameById(
                  connection.secondLogicalInterfaceId,
                )}`}
              </DialogContentText>
              <EditConnectionInputIn formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DialogContentText sx={{ marginBottom: 1 }}>
                {`
                ${getLogicalInterfaceNameById(
                  connection.firstLogicalInterfaceId,
                )} <-- ${getLogicalInterfaceNameById(
                  connection.secondLogicalInterfaceId,
                )}`}
              </DialogContentText>
              <EditConnectionInputOut formik={formik} />
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
