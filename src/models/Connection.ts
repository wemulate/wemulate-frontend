export class Connection {
  constructor(
    public connectionName: string,
    public connectionId: number,
    public firstLogicalInterfaceId: number,
    public secondLogicalInterfaceId: number,
    public delay: number,
    public packetLoss: number,
    public bandwith: number,
    public jitter: number,
  ) {}

  public static fromDto(dto: any) {
    return new Connection(
      dto.connection_name ? dto.connection_name : '',
      dto.connection_id ? dto.connection_id : 0,
      dto.first_logical_interface_id ? dto.first_logical_interface_id : 0,
      dto.second_logical_interface_id ? dto.second_logical_interface_id : 0,
      dto.delay ? dto.delay : 0,
      dto.packet_loss ? dto.packet_loss : 0,
      dto.bandwith ? dto.bandwith : 0,
      dto.jitter ? dto.jitter : 0,
    )
  }

  public toDto() {
    return {
      connection_name: this.connectionName,
      connection_id: this.connectionId,
      first_logical_interface_id: this.firstLogicalInterfaceId,
      second_logical_interface_id: this.secondLogicalInterfaceId,
      delay: this.delay,
      packet_loss: this.packetLoss,
      bandwith: this.bandwith,
      jitter: this.jitter,
    }
  }
}
