import request from '../index'

export function getPageList(url: string, query: any) {
  return request.post<any>({
    url,
    data: query
  })
}
