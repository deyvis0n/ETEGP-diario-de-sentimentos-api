import { Authentication, AuthenticationModel } from '../../../domain/usercase/authentication'
import { HasherCompare } from '../../protocols/criptography/hasher-compare'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HasherCompare
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      await this.hashCompare.compare(authentication.password, account.password)
    }
    return null
  }
}
