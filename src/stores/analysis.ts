import { defineStore } from 'pinia'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/api/analysis'

export const useAnalysis = defineStore('analysis', {
  state: () => {
    return {
      categoryGoodsCount: <any[]>[],
      categoryGoodsSale: <any[]>[],
      categoryGoodsFavor: <any[]>[],
      addressGoodsSale: <any[]>[]
    }
  },
  actions: {
    async getDashboardDataAction() {
      const categoryCountResult = await getCategoryGoodsCount()
      this.categoryGoodsCount = categoryCountResult.data

      const categorySaleResult = await getCategoryGoodsSale()
      this.categoryGoodsSale = categorySaleResult.data

      const categoryFavorResult = await getCategoryGoodsFavor()
      this.categoryGoodsFavor = categoryFavorResult.data

      const addressGoodsResult = await getAddressGoodsSale()
      this.addressGoodsSale = addressGoodsResult.data
    }
  }
})
