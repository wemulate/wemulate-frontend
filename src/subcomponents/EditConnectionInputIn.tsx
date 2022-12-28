import TextField from '@mui/material/TextField'

type Props = {
  formik: any,
}

const EditConnectionInputIn: React.FC<Props> = ({
  formik
}) => {

  return (
    <>
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
    </>
  )
}

export default EditConnectionInputIn
