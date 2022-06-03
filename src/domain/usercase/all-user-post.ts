import { UserPostModel } from '../model/user-post'

export interface AllUserPost {
  find: (userId: string) => Promise<UserPostModel[]>
}
