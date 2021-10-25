class ConfigService {
  constructor(
    // eslint-disable-next-line no-restricted-globals
    private _hostURL: string = `http://${location.hostname}:8080/api/v1`,
  ) {}

  get hostURL(): string {
    return this._hostURL
  }
}

export default new ConfigService()
