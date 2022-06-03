import { UserPostModel } from '../model/user-post'

export interface AllUserPost {
  find: (id: string) => Promise<UserPostModel[]>
}
