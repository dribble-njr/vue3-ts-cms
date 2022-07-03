<template>
  <div class="login-account">
    <el-form labelWidth="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose } from 'vue'
import { ElForm } from 'element-plus'

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const account = reactive({
  name: '',
  password: ''
})

const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名为5~10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须是3位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}

const login = () => {
  formRef.value?.validate((isValid: boolean) => {
    if (isValid) {
      console.log('登录')
    }
  })
}

defineExpose({
  login
})
</script>

<style scoped></style>
