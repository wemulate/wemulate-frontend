class ConfigService {
  constructor(private _host: string = 'http://localhost:8000') {}

  get host(): string {
    return this._host
  }
}

export default new ConfigService()
