export interface AddUserPostModel {
  id: string
  message: string
}

export interface AddUserPost {
  add: (userPost: AddUserPostModel) => Promise<void>
}
