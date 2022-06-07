import { UserPostModel } from '../../../domain/model/user-post'

export interface FindAllPosts {
  findAll: () => Promise<UserPostModel[]>
}
