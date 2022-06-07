import { LoadAccountByToken, LoadAccountByTokenResult } from '../../../domain/usercase/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (accessToken: string): Promise<LoadAccountByTokenResult> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
