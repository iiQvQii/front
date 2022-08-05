<template>
  <q-page class="flex flex-center column">
    <h4>{{ $t('role_admin') + $t('login') }}</h4>
    <div class="q-pa-md">
      <q-form class="q-gutter-md " v-model="valid" @submit.prevent="login">
        <q-input outlined v-model="form.account" :label="$t('account') + '*'" :rules="rules.account">
        </q-input>
        <q-input outlined type="password" v-model="form.password" :label="$t('password') + '*'" lazy-rules
          :rules="rules.password" />
        <q-btn class="full-width" color="primary" :label="$t('login')" type="submit" :loading="loading" />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from 'src/stores/user'

const { t } = useI18n()
const user = useUserStore()

const valid = ref(false)
const loading = ref(false)

const form = reactive({
  account: '',
  password: '',
  role: 0
})

// 驗證規則(還沒翻譯)
const rules = reactive({
  account: [
    v => !!v || t('required'),
    v => (v.length >= 4 && v.length <= 20) || '帳號長度為 4 到 20 個字',
    v => /^[a-zA-Z0-9]+$/.test(v) || '帳號只能由英數字組成'
  ],
  password: [
    v => !!v || '密碼必填',
    v => (v.length >= 4 && v.length <= 20) || '密碼長度為 4 到 20 個字',
    v => /^[a-zA-Z0-9]+$/.test(v) || '密碼只能由英數字組成'
  ],
  role: [
    v => !!v || '請選擇註冊會員身分'
  ]
})

const login = () => {
  user.login(form)
}

</script>
