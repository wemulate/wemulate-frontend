export class LogicalInterface {
  constructor(
    public interfaceId: number,
    public logicalName: string,
    public physicalName: string,
  ) {}

  public static fromDto(dto: any) {
    return new LogicalInterface(
      dto.interface_id ? dto.interface_id : 0,
      dto.logical_name ? dto.logical_name : '',
      dto.physical_name ? dto.physical_name : '',
    )
  }
}
