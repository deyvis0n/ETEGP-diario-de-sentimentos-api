import { LoadAccountByToken, LoadAccountByTokenResult } from '../../../domain/usercase/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByIdRepository } from '../../protocols/db/load-account-by-id-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async load (accessToken: string): Promise<LoadAccountByTokenResult> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const account = await this.loadAccountByIdRepository.loadById(token)
      if (account) {
        return account
      }
    }
    return null
  }
}
