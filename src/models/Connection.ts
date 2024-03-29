import { Settings } from './Settings'

export class Connection {
  constructor(
    public connectionName: string,
    public connectionId: number,
    public firstLogicalInterfaceId: number,
    public secondLogicalInterfaceId: number,
    public settingsIncoming: Settings,
    public settingsOutgoing: Settings,
  ) {}

  public static fromDto(dto: any) {
    return new Connection(
      dto.connection_name ? dto.connection_name : '',
      dto.connection_id ? dto.connection_id : 0,
      dto.first_logical_interface_id ? dto.first_logical_interface_id : 0,
      dto.second_logical_interface_id ? dto.second_logical_interface_id : 0,
      dto.incoming ? Settings.fromDto(dto.incoming) : Settings.fromDto({}),
      dto.outgoing ? Settings.fromDto(dto.outgoing) : Settings.fromDto({}),
    )
  }

  public toDto() {
    return {
      connection_name: this.connectionName,
      connection_id: this.connectionId,
      first_logical_interface_id: this.firstLogicalInterfaceId,
      second_logical_interface_id: this.secondLogicalInterfaceId,
      incoming: this.settingsIncoming.toDto(),
      outgoing: this.settingsOutgoing.toDto(),
    }
  }
}
