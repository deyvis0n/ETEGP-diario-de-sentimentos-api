export interface UpdateAccountAccessToken {
  updateAccessToken: (id: string, token: string) => Promise<void>
}
