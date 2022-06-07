import { UserPostModel } from '../../../domain/model/user-post'
import { FindAllPosts } from '../../protocols/db/find-all-posts'
import { DbAllPosts } from './db-all-posts'
import { LoadAccountByIdRepository } from '../../protocols/db/load-account-by-id-repository'
import { AccountModel } from '../../../domain/model/account'

const makeFindAllPosts = (): FindAllPosts => {
  class FindAllPostsStub implements FindAllPosts {
    async findAll (): Promise<UserPostModel[]> {
      return [
        makeFakeUserPost(),
        makeFakeUserPost(),
        makeFakeUserPost()
      ]
    }
  }
  return new FindAllPostsStub()
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
  sut: DbAllPosts
  findAllPostsStub: FindAllPosts
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const findAllPostsStub = makeFindAllPosts()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const sut = new DbAllPosts(findAllPostsStub, loadAccountByIdRepositoryStub)
  return {
    sut,
    findAllPostsStub,
    loadAccountByIdRepositoryStub
  }
}

describe('DbAllPosts', () => {
  test('Should calls FindAllPosts one or more times', async () => {
    const { sut, findAllPostsStub } = makeSut()
    const findAllSpy = jest.spyOn(findAllPostsStub, 'findAll')
    await sut.findAll()
    expect(findAllSpy).toBeCalled()
  })

  test('Should return an empty array if no find any post', async () => {
    const { sut, findAllPostsStub } = makeSut()
    jest.spyOn(findAllPostsStub, 'findAll').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const arrayPost = await sut.findAll()
    expect(arrayPost).toEqual([])
  })

  test('Should calls LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.findAll()
    expect(loadByIdSpy).toBeCalledWith('any_id')
  })
})
