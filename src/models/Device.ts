import { LogicalInterface } from './LogicalInterface'
import { MgmtInterface } from './MgmtInterface'

export class Device {
  constructor(
    public mgmtInterfaces: Array<MgmtInterface>,
    public logicalInterfaces: Array<LogicalInterface>,
  ) {}

  public static fromDto(dto: any) {
    const mgmtInterfaces = dto.mgmt_interfaces
      ? dto.mgmt_interfaces.map((x: any) => MgmtInterface.fromDto(x))
      : []
    const logicalInterfaces = dto.logical_interfaces
      ? dto.logical_interfaces.map((x: any) => LogicalInterface.fromDto(x))
      : []

    return new Device(mgmtInterfaces, logicalInterfaces)
  }
}
