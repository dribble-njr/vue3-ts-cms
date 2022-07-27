<template>
  <div class="base-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemLayout"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="updateValue(item.field, $event)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="updateValue(item.field, $event)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.title"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="updateValue(item.field, $event)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { FormItem } from '../types'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<FormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemLayout: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
})

const emit = defineEmits(['update:modelValue'])

// 1.
// 子组件不能直接修改父组件传过来的数据 modelValue
// 否则违背单向数据流
// 因此用中间数据接收
// const formData = ref({
//   ...props.modelValue
// })
// // const formData = Object.assign({}, props.modelValue)
// watch(
//   formData,
//   (newValue) => {
//     console.log(newValue)

//     emit('update:modelValue', newValue)
//   },
//   {
//     deep: true
//   }
// )

// 2. 修改默认@update:modelValue方法
const updateValue = (field: string, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style scoped>
.base-form {
  padding-top: 22px;
}
</style>
