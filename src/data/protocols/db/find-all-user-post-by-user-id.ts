import { UserPostModel } from '../../../domain/model/user-post'

export interface FindAllUserPostByUseIdRepository {
  findByUserId: (userId: string) => Promise<UserPostModel[]>
}
