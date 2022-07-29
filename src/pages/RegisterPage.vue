<template>
  <q-page class="flex flex-center column">
    <h4>註冊業主會員</h4>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit.prevent="register" @reset="onReset" class="q-gutter-md">
        <q-input outlined v-model="form.account" :label="$t('account')" lazy-rules :rules="rules.account" />

        <q-input outlined type="password" v-model="form.password" :label="$t('password')" lazy-rules
          :rules="rules.password" />
        <q-input outlined type="password" v-model="form.confirmpassword" :label="$t('confirm_password')" lazy-rules
          :rules="rules.confirmPassword" />
        <q-input outlined type="text" v-model="form.email" :label="$t('email')" lazy-rules :rules="rules.email" />
        <div class="q-px-sm">
          Your selection is: <strong>{{ role }}</strong>
        </div>
        <div class="q-gutter-sm">
          <q-radio v-model="role" val="1" :label="$t('role_host')" />
          <q-radio v-model="role" val="2" :label="$t('role_helper')" />
        </div>
        <q-toggle v-model="accept" label="I accept the license and terms" />
        <div class="q-mx-auto">
          <q-btn :label="$t('submit')" type="submit" color="primary" :loading="loading" />
          <q-btn :label="$t('reset')" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { isEmail } from 'validator'
import { api } from '../boot/axios.js'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const accept = ref(false)
const valid = ref(false)
const loading = ref(false)
const role = ref()

const form = reactive({
  email: '',
  account: '',
  password: '',
  confirmPassword: '',
  role: ''
})
// const a = reactive([this.$t('role_host')])

// 驗證規則(還沒翻譯)
const rules = reactive({
  email: [
    v => !!v || '信箱必填',
    v => isEmail(v) || '信箱格式錯誤'
  ],
  account: [
    v => !!v || '帳號必填',
    v => (v.length >= 4 && v.length <= 20) || '帳號長度為 4 到 20 個字',
    v => /^[a-zA-Z0-9]+$/.test(v) || '帳號只能由英數字組成'
  ],
  password: [
    v => !!v || '密碼必填',
    v => (v.length >= 4 && v.length <= 20) || '密碼長度為 4 到 20 個字',
    v => /^[a-zA-Z0-9]+$/.test(v) || '密碼只能由英數字組成'
  ],
  confirmPassword: [
    v => !!v || '請輸入確認密碼',
    v => v === form.password || '密碼不一致'
  ],
  role: [
    v => !!v || '請選擇註冊會員身分'
  ]
})

const register = async () => {
  if (!valid.value) return
  loading.value = true
  try {
    await api.post('/hosts/register', form)
    await Swal.fire({
      icon: 'success',
      title: '成功',
      text: '註冊成功'
    })
    router.push('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
    })
  }
  loading.value = false
}

</script>
