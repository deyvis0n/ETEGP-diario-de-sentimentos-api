import { AddUserPostModel } from '../../../domain/usercase/add-user-post'

export interface AddUserPostRepository {
  add: (userPost: AddUserPostModel) => Promise<void>
}
