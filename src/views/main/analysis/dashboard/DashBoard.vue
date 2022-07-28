<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <base-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </base-card>
      </el-col>
      <el-col :span="10">
        <base-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </base-card>
      </el-col>
      <el-col :span="7">
        <base-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </base-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <base-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </base-card>
      </el-col>
      <el-col :span="12">
        <base-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </base-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import BaseCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

import { useAnalysis } from '@/stores/analysis'

const analysisStore = useAnalysis()
// 请求数据
await analysisStore.getDashboardDataAction()

// 获取数据
const categoryGoodsCount = computed(() => {
  return analysisStore.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const categoryGoodsSale = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsSale = analysisStore.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return { xLabels, values }
})

const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsFavor = analysisStore.categoryGoodsFavor
  for (const item of categoryGoodsFavor) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }
  return { xLabels, values }
})

const addressGoodsSale = computed(() => {
  return analysisStore.addressGoodsSale.map((item: any) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
