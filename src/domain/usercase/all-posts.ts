import { UserPostModel } from '../model/user-post'

export interface AllPosts {
  findAll: () => Promise<UserPostModel[]>
}
