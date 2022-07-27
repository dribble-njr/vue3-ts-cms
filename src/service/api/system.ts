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

export function createPageData(url: string, newData: any) {
  return request.post<Data>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return request.patch<Data>({
    url: url,
    data: editData
  })
}
