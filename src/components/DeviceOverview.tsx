import Grid from '@mui/material/Grid'
import { Device } from '../models/Device'
import LogicalInterfaceCard from './LogicalInterfaceCard'
import MgmtInterfaceCard from './MgmtInterfaceCard'

type Props = {
  device: Device
}

const DeviceOverview: React.FC<Props> = ({ device }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LogicalInterfaceCard logicalInterfaces={device.logicalInterfaces} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MgmtInterfaceCard mgmtInterfaces={device.mgmtInterfaces} />
        </Grid>
      </Grid>
    </div>
  )
}

export default DeviceOverview
