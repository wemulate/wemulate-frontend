import TextField from '@mui/material/TextField'

type Props = {
  formik: any
}

const EditConnectionInputOut: React.FC<Props> = ({
  formik
}) => {

  return (
    <>
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
    </>
  )
}

export default EditConnectionInputOut
