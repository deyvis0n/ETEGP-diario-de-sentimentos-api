export interface AddUserPostModel {
  userId: string
  message: string
}

export interface AddUserPost {
  add: (userPost: AddUserPostModel) => Promise<void>
}
