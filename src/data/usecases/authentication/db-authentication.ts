import { Authentication, AuthenticationModel } from '../../../domain/usercase/authentication'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { HasherCompare } from '../../protocols/criptography/hasher-compare'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HasherCompare,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const hash = await this.hashCompare.compare(authentication.password, account.password)
      if (!hash) {
        return null
      }
      await this.encrypter.generate(account.id)
    }
    return null
  }
}
