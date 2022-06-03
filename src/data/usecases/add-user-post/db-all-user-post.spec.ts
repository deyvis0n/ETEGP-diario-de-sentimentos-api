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
})
