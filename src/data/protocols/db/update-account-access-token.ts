export interface UpdateAccountAccessToken {
  update: (value: string, token: string) => Promise<void>
}
