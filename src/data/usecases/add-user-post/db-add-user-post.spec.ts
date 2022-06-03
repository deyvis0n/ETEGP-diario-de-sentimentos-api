import { AddUserPostRepository } from '../../protocols/db/add-user-post-repository'
import { DbAddAccountUserPost } from './db-add-user-post'
import { AddUserPostModel } from '../../../domain/usercase/add-user-post'

const makeAddUserPostRepository = (): AddUserPostRepository => {
  class AddUserPostRepositoryStub implements AddUserPostRepository {
    async add (userPost: AddUserPostModel): Promise<void> {}
  }
  return new AddUserPostRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccountUserPost
  AddUserPostRepositoryStub: AddUserPostRepository
}

const makeSut = (): SutTypes => {
  const AddUserPostRepositoryStub = makeAddUserPostRepository()
  const sut = new DbAddAccountUserPost(AddUserPostRepositoryStub)
  return {
    sut,
    AddUserPostRepositoryStub
  }
}

describe('DbAddUserPost', () => {
  test('Should call LoaAddUserPostRepository with correct values', async () => {
    const { sut, AddUserPostRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(AddUserPostRepositoryStub, 'add')
    const userPost = ({
      userId: 'any_id',
      message: 'any_message'
    })
    await sut.add(userPost)
    expect(addSpy).toBeCalledWith(userPost)
  })

  test('Should return throws if Hasher throws', async () => {
    const { sut, AddUserPostRepositoryStub } = makeSut()
    jest.spyOn(AddUserPostRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const userPost = ({
      userId: 'any_id',
      message: 'any_message'
    })
    const promise = sut.add(userPost)
    await expect(promise).rejects.toThrow()
  })
})
