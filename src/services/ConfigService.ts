class ConfigService {
  private _hostURL: string

  constructor() {
    this._hostURL =
      process.env.NODE_ENV === 'production'
        ? // eslint-disable-next-line no-restricted-globals
          `${location.origin}/api/v1`
        : `${process.env.REACT_APP_BACKEND_URL_DEV}/api/v1`
  }

  get hostURL(): string {
    return this._hostURL
  }
}

export default new ConfigService()
