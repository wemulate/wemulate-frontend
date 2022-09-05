export class Settings {
  constructor(
    public delay: number,
    public packetLoss: number,
    public bandwidth: number,
    public jitter: number,
  ) {}

  public static fromDto(dto: any) {
    return new Settings(
      dto.delay ? dto.delay : 0,
      dto.packet_loss ? dto.packet_loss : 0,
      dto.bandwidth ? dto.bandwidth : 0,
      dto.jitter ? dto.jitter : 0,
    )
  }

  public toDto() {
    return {
      delay: this.delay,
      packet_loss: this.packetLoss,
      bandwidth: this.bandwidth,
      jitter: this.jitter,
    }
  }
}
