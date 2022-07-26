import request from '../index'
import { Data } from '../types'

export function getPageList(url: string, query: any) {
  return request.post<Data>({
    url,
    data: query
  })
}

// url: /xxx/id
export function deletePageData(url: string) {
  return request.delete<Data>({
    url: url
  })
}
