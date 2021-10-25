class ConfigService {
  constructor(
    // eslint-disable-next-line no-restricted-globals
    private _hostURL: string = `${location.origin}/api/v1`,
  ) {}

  get hostURL(): string {
    return this._hostURL
  }
}

export default new ConfigService()
