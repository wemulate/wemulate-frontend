class ConfigService {
  private _host: string
  private _port: string
  private _socketAddress: string

  constructor() {
    this._host = 'localhost'
    this._port = '8000'
    this._socketAddress = `http://${this._host}:${this._port}`
  }

  get socketAddress(): string {
    return this._socketAddress
  }
}

export default new ConfigService()
