import { Device } from './models/Device'
import MgmtInterfaceList from './components/MgmtInterfaceList'
import LogicalInterfaceList from './components/LogicalInterfaceList'

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
