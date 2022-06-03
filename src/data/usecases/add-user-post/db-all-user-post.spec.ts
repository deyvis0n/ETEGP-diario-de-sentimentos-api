import { UserPostModel } from '../../../domain/model/user-post'
import { FindAllUserPostByUseIdRepository } from '../../protocols/db/find-all-user-post-by-user-id'
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

const makeFakeUserPost = (): UserPostModel => ({
  id: 'any_id',
  userId: 'any_user_id',
  message: 'any_message',
  date: new Date(2022, 1, 1)
})

interface SutTypes {
  sut: DbAllUserPost
  findAllUserPostByUseIdRepositoryStub: FindAllUserPostByUseIdRepository
}

const makeSut = (): SutTypes => {
  const findAllUserPostByUseIdRepositoryStub = makeFindAllUserPostByUseIdRepository()
  const sut = new DbAllUserPost(findAllUserPostByUseIdRepositoryStub)
  return {
    sut,
    findAllUserPostByUseIdRepositoryStub
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
    const fakeUserPost1 = makeFakeUserPost()
    const fakeUserPost2 = makeFakeUserPost()
    expect(userPostArray).toEqual([
      fakeUserPost1,
      fakeUserPost2
    ])
  })
})
