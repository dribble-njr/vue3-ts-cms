import request from '../index'

interface Account {
  name: string
  password: string
}

interface Data<T = any> {
  code: number
  data: T
}

interface LoginResult {
  id: number
  name: string
  token: string
}

enum LoginAPI {
  accountLogin = '/login',
  getUserInfo = '/users/',
  getUserMenu = '/role/'
}

export function accountLoginRequest(account: Account) {
  return request.post<Data<LoginResult>>({
    url: LoginAPI.accountLogin,
    data: account
  })
}

export function getUserInfoById(id: number) {
  return request.get<Data>({
    url: LoginAPI.getUserInfo + id,
    loading: false
  })
}

export function getUserMenuById(id: number) {
  return request.get<Data>({
    url: LoginAPI.getUserMenu + id + '/menu',
    loading: false
  })
}
