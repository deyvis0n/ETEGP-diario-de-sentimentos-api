import { UserPostModel } from '../../../domain/model/user-post'
import { FindAllPosts } from '../../protocols/db/find-all-posts'
import { DbAllPosts } from './db-all-posts'

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

const makeFakeUserPost = (): UserPostModel => ({
  id: 'any_id',
  userId: 'any_user_id',
  userName: 'any_name',
  message: 'any_message',
  date: new Date(2022, 1, 1)
})

interface SutTypes {
  sut: DbAllPosts
  findAllPostsStub: FindAllPosts
}

const makeSut = (): SutTypes => {
  const findAllPostsStub = makeFindAllPosts()
  const sut = new DbAllPosts(findAllPostsStub)
  return {
    sut,
    findAllPostsStub
  }
}

describe('DbAllPosts', () => {
  test('Should calls FindAllPosts one or more times', async () => {
    const { sut, findAllPostsStub } = makeSut()
    const findAllSpy = jest.spyOn(findAllPostsStub, 'findAll')
    await sut.findAll()
    expect(findAllSpy).toBeCalled()
  })
})
