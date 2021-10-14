class ConfigService {
  constructor(private _host: string = 'http://10.18.10.10:80') {}

  get host(): string {
    return this._host
  }
}

export default new ConfigService()
