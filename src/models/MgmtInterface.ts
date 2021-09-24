export class MgmtInterface {
    constructor(
        public id: string,
        public physicalName: string
    ) {}

    public static fromDto(dto: any) {
        return new MgmtInterface(
            dto.ip ? dto.ip : "",
            dto.physical_name ? dto.physical_name : ""
        )
    }
}
