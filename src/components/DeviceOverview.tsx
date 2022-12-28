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
    <>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <LogicalInterfaceCard
          usedInterfaceIds={usedInterfaceIds}
          logicalInterfaces={device.logicalInterfaces}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <MgmtInterfaceCard mgmtInterfaces={device.mgmtInterfaces} />
      </Grid>
    </>
  )
}

export default DeviceOverview
