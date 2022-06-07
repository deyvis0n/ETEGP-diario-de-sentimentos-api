import { UserPostModel } from '../../../domain/model/user-post'
import { AllPosts } from '../../../domain/usercase/all-posts'
import { AllPostsController } from './all-posts-controller'
import { ok, serverError } from '../../helper/http/http-helper'

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

  test('Should return 500 if AllPosts throws', async () => {
    const { sut, allPostsStub } = makeSut()
    jest.spyOn(allPostsStub, 'findAll').mockImplementationOnce(() => { throw new Error() })
    const httpReponse = await sut.handle({})
    expect(httpReponse).toEqual(serverError())
  })

  test('Should return 200 and an post array on success', async () => {
    const { sut } = makeSut()
    const post1 = makeFakeUserPost()
    const post2 = makeFakeUserPost()
    const post3 = makeFakeUserPost()
    const postArray = await sut.handle({})
    expect(postArray).toEqual(ok([
      post1,
      post2,
      post3
    ]))
  })
})
