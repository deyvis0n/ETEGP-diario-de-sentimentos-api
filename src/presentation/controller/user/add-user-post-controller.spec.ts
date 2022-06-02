import { AddUserPostModel, AddUserPost } from '../../../domain/usercase/add-user-post'
import { AddUserPostController } from './add-user-post-controller'

const makeAddUserPost = (): AddUserPost => {
  class AddUserPostStub implements AddUserPost {
    async add (userPost: AddUserPostModel): Promise<void> {}
  }
  return new AddUserPostStub()
}

interface SutTypes {
  sut: AddUserPostController
  addUserPostStub: AddUserPost
}

const makeSut = (): SutTypes => {
  const addUserPostStub = makeAddUserPost()
  const sut = new AddUserPostController(addUserPostStub)
  return {
    sut,
    addUserPostStub
  }
}

describe('AddUserPostController', () => {
  test('Should call AddUserPost with correct values', async () => {
    const { sut, addUserPostStub } = makeSut()
    const addSpy = jest.spyOn(addUserPostStub, 'add')
    const httpRequest = ({
      body: {
        id: 'any_id',
        message: 'any_message'
      }
    })
    await sut.handle(httpRequest)
    expect(addSpy).toBeCalledWith(httpRequest.body)
  })
})
