<template>
  <q-page class="flex flex-center column">
    <h4>{{ $t('register') }}</h4>
    <div class="q-pa-md">
      <q-form class="q-gutter-md" v-model="valid" @submit.prevent="register" @reset="onReset">
        <q-stepper v-model="step" ref="stepper" color="primary" animated alternative-labels style="min-width: 400px">
          <q-step :name="1" prefix="1" :title="$t('step1')" icon="settings" :done="step > 1">
            <q-input outlined v-model="form.account" :label="$t('account') + '*'" :rules="rules.account" ref="account">
            </q-input>
            <q-input outlined type="password" v-model="form.password" :label="$t('password') + '*'" lazy-rules
              :rules="rules.password" ref="password" />
            <q-input outlined type="password" v-model="form.confirmPassword" :label="$t('confirm_password') + '*'"
              lazy-rules :rules="rules.confirmPassword" ref="confirmPassword" />
            <p>{{ $t('register_as') + '*' }}</p>
            <q-btn-toggle v-model="form.role" toggle-color="primary" :options="options" spread ref="role"
              :rules="rules.role" />
          </q-step>
          <!----------------- 第二步 --------------------------->
          <q-step :name="2" prefix="2" :title="$t('step2')" icon="fa-solid fa-file-pen" :done="step > 2">
            <q-input v-if="form.role === 'role_helper'" outlined type="text" v-model="form.name"
              :label="$t('name') + '*'" lazy-rules :rules="rules.name" />
            <q-input v-if="form.role === 'role_host'" outlined type="text" v-model="form.name"
              :label="$t('host_name') + '*'" lazy-rules :rules="rules.name" />
            <q-input outlined type="tel" v-model="form.tel" :label="$t('tel')" :rules="rules.tel" mask="(##)####-####"
              unmasked-value />
            <q-input outlined type="text" v-model="form.mobile" :label="$t('mobile') + '*'" lazy-rules
              :rules="rules.mobile" mask="####-###-###" unmasked-value />
            <q-select v-if="form.role === 'role_helper'" outlined v-model="form.gender" :options="genderOptions"
              :label="$t('gender') + '*'" emit-value :display-value="$t(form.gender)" lazy-rules :rules="rules.gender"
              ref="gender">
            </q-select>
            <q-input v-if="form.role === 'role_helper'" filled v-model="form.birthday" mask="date" :rules="['date']"
              :label="$t('birthday')">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.birthday">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input outlined type="text" v-model="form.email" :label="$t('email') + '*'" lazy-rules
              :rules="rules.email" />

            <q-select v-if="form.role === 'role_host'" outlined v-model="form.city" :options="cityOptions"
              :label="$t('city') + '*'" emit-value lazy-rules :rules="rules.city">
            </q-select>
            <q-select v-if="form.role === 'role_host'" outlined v-model="form.district" :options="districtOptions"
              :label="$t('district') + '*'" emit-value :rules="rules.district">
            </q-select>
            <q-input v-if="form.role === 'role_host'" outlined type="text" v-model="form.address"
              :label="$t('address') + '*'" lazy-rules :rules="rules.address" />
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation class="flex flex-center">
              <q-btn v-if="step === 1" class="q-mx-md" @click="next" color="primary" :label="$t('next')" />
              <q-btn v-if="step === 2" class="q-mx-md" @click="register" color="primary" :label="$t('submit')"
                type="submit" :loading="loading" />
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" :label="$t('back')"
                class="q-mx-md" />
              <q-btn class="q-mx-md" :label="$t('reset')" type="reset" color="primary" flat />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { isEmail } from 'validator'
import { api } from '../boot/axios.js'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
import dataEn from '../address/data-en.js'
import dataZh from '../address/data-zh.js'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()

const router = useRouter()

const valid = ref(false)
const loading = ref(false)
const step = ref(1)
const account = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const role = ref(null)

const stepper = ref(null)

const form = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  role: '',
  name: '',
  tel: '',
  mobile: '',
  gender: '',
  birthday: '1995/01/01',
  email: '',
  city: '',
  district: '',
  address: ''
})
const options = computed(() => {
  return [
    { label: t('role_host'), value: 'role_host' },
    { label: t('role_helper'), value: 'role_helper' }
  ]
})
const genderOptions = computed(() => {
  return [
    { label: t('male'), value: 'male' },
    { label: t('female'), value: 'female' },
    { label: t('rahter_not_say'), value: 'Rather not say' }
  ]
})

const cityOptions = computed(() => {
  if (locale.value === 'zh-TW') {
    return dataZh.cities
  } else {
    return dataEn.cities
  }
})

const districtOptions = computed(() => {
  if (locale.value === 'zh-TW') {
    const idxZh = dataZh.cities.findIndex(v => {
      return v === form.city
    })
    return dataZh.districts[idxZh]
  } else {
    const idxEn = dataEn.cities.findIndex(v => {
      return v === form.city
    })
    return dataEn.districts[idxEn]
  }
})

watch(() => locale.value, () => {
  if (locale.value === 'zh-TW') {
    const idxCity = dataEn.cities.findIndex(v => v === form.city)
    if (idxCity > -1) {
      form.city = dataZh.cities[idxCity]
      form.district = dataZh.districts[idxCity][dataEn.districts[idxCity].findIndex(v => v === form.district)]
    }
    console.log(idxCity, form.city)
  } else {
    const idxCity = dataZh.cities.findIndex(v => v === form.city)
    if (idxCity > -1) {
      form.city = dataEn.cities[idxCity]
      form.district = dataEn.districts[idxCity][dataZh.districts[idxCity].findIndex(v => v === form.district)]
    }
  }
})

// 驗證規則(還沒翻譯)
const rules = reactive({
  email: [
    v => !!v || '必填',
    v => isEmail(v) || '信箱格式錯誤'
  ],
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
  confirmPassword: [
    v => !!v || '請輸入確認密碼',
    v => v === form.password || '密碼不一致'
  ],
  role: [
    v => !!v || '請選擇註冊會員身分'
  ],
  name: [
    v => !!v || '姓名必填',
    v => (v.length >= 2 && v.length <= 15) || '帳號長度為 2 到 15 個字'
  ],
  gender: [
    v => !!v || '性別必填'
  ],
  tel: [
    v => (v.length >= 9 && v.length <= 10) || '含區碼長度為 9 或 10 個字，ex:02-1234-5678 或 03-1234-567'
  ],
  mobile: [
    v => !!v || '手機必填',
    v => (v.length = 10) || '請輸入10位手機'
  ],
  birthday: [
    v => !!v || '生日必填'
  ],
  city: [
    v => !!v || '縣市必填'
  ],
  district: [
    v => !!v || '鄉鎮區必填'
  ],
  address: [
    v => !!v || '詳細地址必填',
    v => (v.length >= 5) || '請填寫正確詳細地址資訊'

  ]
})

const onReset = () => {
  if (step.value === 1) {
    form.account = null
    form.password = null
    form.confirmPassword = null
    form.role = null
  } else {
    form.name = null
    form.gender = null
    form.birthday = '1995/01/01'
    form.email = null
    form.city = null
    form.district = null
    form.address = null
  }
}

const next = () => {
  if (account.value.validate() && password.value.validate() && confirmPassword.value.validate() && form.role !== '') {
    stepper.value.next()
  }
}

const register = async () => {
  // if (!valid.value) return
  loading.value = true
  try {
    await api.post('/users/register', form)
    await Swal.fire({
      icon: 'success',
      title: '成功',
      text: '註冊成功'
    })
    router.push('/')
  } catch (error) {
    console.log(form.role)
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
    })
    router.push('/')
  }
  loading.value = false
}
</script>
