import { AccountModel } from '../../../domain/model/account'

export interface LoadAccountByIdRepository {
  loadById: (id: string) => Promise<AccountModel>
}
