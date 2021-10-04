import Grid from '@mui/material/Grid'
import { Device } from '../models/Device'
import LogicalInterfaceCard from './LogicalInterfaceCard'
import MgmtInterfaceCard from './MgmtInterfaceCard'

type Props = {
  device: Device
  usedInterfaceIds: Array<number>
}

const DeviceOverview: React.FC<Props> = ({ device, usedInterfaceIds }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LogicalInterfaceCard
            usedInterfaceIds={usedInterfaceIds}
            logicalInterfaces={device.logicalInterfaces}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MgmtInterfaceCard mgmtInterfaces={device.mgmtInterfaces} />
        </Grid>
      </Grid>
    </div>
  )
}

export default DeviceOverview
