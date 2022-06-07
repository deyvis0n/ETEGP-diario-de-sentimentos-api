export interface LoadAccountByTokenResult {
  id: string
}

export interface LoadAccountByToken {
  load: (accessToken: string) => Promise<LoadAccountByTokenResult>
}
