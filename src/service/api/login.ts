import request from '../index'

interface Account {
  name: string
  password: string
}

enum LoginAPI {
  accountLogin = '/login'
}

export function accountLoginRequest(account: Account) {
  return request.post({
    url: LoginAPI.accountLogin,
    data: account
  })
}
