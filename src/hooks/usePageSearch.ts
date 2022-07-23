import { ref, computed } from 'vue'
import { getPageList } from '@/service/api/system'

export async function usePageSearch(url: string) {
  // 用户列表数据
  const pageData = ref()
  // let pageList = null
  // let pageCount = null
  const getPageData = async (queryInfo?: any) => {
    const { data } = await getPageList(url, {
      offset: 0,
      size: 100,
      ...queryInfo
    })
    pageData.value = data
  }

  await getPageData()
  const pageList = computed(() => pageData.value?.list)
  const pageCount = computed(() => pageData.value?.totalCount)

  // 重置
  const handleReset = () => {
    getPageData()
  }

  // 搜索
  const handleQuery = (queryInfo: any) => {
    getPageData(queryInfo)
  }

  return {
    pageList,
    pageCount,
    handleReset,
    handleQuery
  }
}
