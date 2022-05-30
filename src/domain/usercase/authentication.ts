export interface AuthenticationModel {
  email: string
  password: string
}

export interface Result {
  name: string
  accessToken: string
}

export interface Authentication {
  auth: (authentication: AuthenticationModel) => Promise<Result>
}
