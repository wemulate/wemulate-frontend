export class MgmtInterface {
  constructor(public ip: string, public physicalName: string) {}

  public static fromDto(dto: any) {
    return new MgmtInterface(
      dto.ip ? dto.ip : '',
      dto.physical_name ? dto.physical_name : '',
    )
  }
}
