import { AccountModel } from '../../../domain/model/account'
import { UserPostModel } from '../../../domain/model/user-post'
import { FindAllUserPostByUseIdRepository } from '../../protocols/db/find-all-user-post-by-user-id'
import { LoadAccountByIdRepository } from '../../protocols/db/load-account-by-id-repository'
import { DbAllUserPost } from './db-all-user-post'

const makeFindAllUserPostByUseIdRepository = (): FindAllUserPostByUseIdRepository => {
  class FindAllUserPostByUseIdRepositoryStub implements FindAllUserPostByUseIdRepository {
    async findByUserId (userId: string): Promise<UserPostModel[]> {
      return [
        makeFakeUserPost(),
        makeFakeUserPost()
      ]
    }
  }
  return new FindAllUserPostByUseIdRepositoryStub()
}

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeFakeUserPost = (): UserPostModel => ({
  id: 'any_id',
  userId: 'any_user_id',
  userName: 'any_name',
  message: 'any_message',
  date: new Date(2022, 1, 1)
})

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'user_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

interface SutTypes {
  sut: DbAllUserPost
  findAllUserPostByUseIdRepositoryStub: FindAllUserPostByUseIdRepository
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const findAllUserPostByUseIdRepositoryStub = makeFindAllUserPostByUseIdRepository()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const sut = new DbAllUserPost(findAllUserPostByUseIdRepositoryStub, loadAccountByIdRepositoryStub)
  return {
    sut,
    findAllUserPostByUseIdRepositoryStub,
    loadAccountByIdRepositoryStub
  }
}

describe('DbAllUserPost', () => {
  test('Should call FindAllUserPostByUseIdRepository with correct values', async () => {
    const { sut, findAllUserPostByUseIdRepositoryStub } = makeSut()
    const findByUserIdSpy = jest.spyOn(findAllUserPostByUseIdRepositoryStub, 'findByUserId')
    await sut.find('any_id')
    expect(findByUserIdSpy).toBeCalledWith('any_id')
  })

  test('Should return thorws if FindAllUserPostByUseIdRepository throws', async () => {
    const { sut, findAllUserPostByUseIdRepositoryStub } = makeSut()
    jest.spyOn(findAllUserPostByUseIdRepositoryStub, 'findByUserId').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.find('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an UserPost array on success', async () => {
    const { sut } = makeSut()
    const userPostArray = await sut.find('any_id')
    const { name } = makeFakeAccount()
    const fakeUserPost1 = Object.assign(makeFakeUserPost(), { userName: name })
    const fakeUserPost2 = Object.assign(makeFakeUserPost(), { userName: name })
    expect(userPostArray).toEqual([
      fakeUserPost1,
      fakeUserPost2
    ])
  })

  test('Should call LoadAccountByIdRepository with correct value', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.find('any_id')
    expect(loadByIdSpy).toBeCalledWith('any_user_id')
  })
})
