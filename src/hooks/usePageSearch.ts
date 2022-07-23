import { ref } from 'vue'
import PageTable from '@/components/page-table'
import PageSearch from '@/components/page-search'

export async function usePageSearch() {
  const pageTableRef = ref<InstanceType<typeof PageTable>>()
  const pageSearchRef = ref<InstanceType<typeof PageSearch>>()

  // 重置
  const handleReset = () => {
    pageTableRef.value.getPageData()
  }

  // 搜索
  const handleQuery = (queryInfo: any) => {
    pageTableRef.value.getPageData(queryInfo)
  }

  // 分页改变
  const handlePageChange = () => {
    handleQuery(pageSearchRef.value.formData)
  }

  return {
    pageTableRef,
    pageSearchRef,
    handleReset,
    handleQuery,
    handlePageChange
  }
}
