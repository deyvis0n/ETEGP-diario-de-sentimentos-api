import { UserPostModel } from '../../../domain/model/user-post'
import { AllPosts } from '../../../domain/usercase/all-posts'
import { AllPostsController } from './all-posts-controller'

const makeAllPosts = (): AllPosts => {
  class AllPostsStub implements AllPosts {
    async findAll (): Promise<UserPostModel[]> {
      return [
        makeFakeUserPost(),
        makeFakeUserPost(),
        makeFakeUserPost()
      ]
    }
  }
  return new AllPostsStub()
}

const makeFakeUserPost = (): UserPostModel => ({
  id: 'any_id',
  userId: 'any_user_id',
  userName: 'any_name',
  message: 'any_message',
  date: new Date(2022, 1, 1)
})

interface SutTypes {
  sut: AllPostsController
  allPostsStub: AllPosts
}

const makeSut = (): SutTypes => {
  const allPostsStub = makeAllPosts()
  const sut = new AllPostsController(allPostsStub)
  return {
    sut,
    allPostsStub
  }
}

describe('AllPostsController', () => {
  test('Should call AllPosts is called', async () => {
    const { sut, allPostsStub } = makeSut()
    const findAllSpy = jest.spyOn(allPostsStub, 'findAll')
    await sut.handle({})
    expect(findAllSpy).toBeCalled()
  })
})
