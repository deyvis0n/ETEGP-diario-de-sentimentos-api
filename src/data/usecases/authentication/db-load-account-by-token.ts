import { LoadAccountByToken, LoadAccountByTokenResult } from '../../../domain/usercase/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (accessToken: string): Promise<LoadAccountByTokenResult> {
    try {
      await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
  }
}
