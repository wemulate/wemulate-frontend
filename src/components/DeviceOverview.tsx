import { Device } from '../models/Device'
import LogicalInterfaceList from './LogicalInterfaceList'
import MgmtInterfaceList from './MgmtInterfaceList'

type Props = {
  device: Device
}

const DeviceOverview: React.FC<Props> = ({ device }) => {
  return (
    <div>
      <MgmtInterfaceList mgmtInterfaces={device.mgmtInterfaces} />
      <LogicalInterfaceList logicalInterfaces={device.logicalInterfaces} />
    </div>
  )
}

export default DeviceOverview
