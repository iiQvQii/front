<template>
  <q-page class="flex flex-center column">
    <h1>{{ $t('register') }}</h1>
    <h1>{{ form.zipcode }}</h1>
    <div class="q-pa-md">
      <q-form class="q-gutter-md" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false"
        ref="registerForm" @submit.prevent="register" @reset="onReset">
        <q-stepper v-model="step" ref="stepper" color="primary" animated alternative-labels style="min-width: 400px">
          <q-step :name="1" prefix="1" :title="$t('step1')" icon="settings" :done="step > 1">
            <q-input outlined v-model="form.account" :label="$t('account') + '*'" :rules="rules.account" ref="account">
            </q-input>
            <q-input outlined type="password" v-model="form.password" :label="$t('password') + '*'" lazy-rules
              :rules="rules.password" ref="password" />
            <q-input outlined type="password" v-model="form.confirmPassword" :label="$t('confirm_password') + '*'"
              lazy-rules :rules="rules.confirmPassword" ref="confirmPassword" />
            <p :style="warningStyle">{{ $t('register_as') + '*' }}</p>
            <q-btn-toggle v-model="form.role" toggle-color="primary" :options="options" spread ref="role"
              :rules="rules.required" />
          </q-step>
          <!----------------- 第二步 --------------------------->
          <q-step :name="2" prefix="2" :title="$t('step2')" icon="fa-solid fa-file-pen" :done="step > 2">
            <!-- 姓名 -->
            <q-input outlined type="text" v-model="form.name"
              :label="form.role === 'role_helper' ? $t('name') + '*' : $t('host_name') + '*'" lazy-rules
              :rules="rules.name" />
            <!-- 性別 -->
            <q-select v-if="form.role === 'role_helper'" outlined v-model="form.gender" :options="genderOptions"
              :label="$t('gender') + '*'" emit-value :display-value="$t(form.gender)" lazy-rules :rules="rules.required"
              ref="gender">
            </q-select>
            <!-- 電話 -->
            <q-input outlined type="tel" v-model="form.tel" :label="$t('tel')" :rules="rules.tel" mask="(##)####-####"
              unmasked-value />
            <!-- 手機 -->
            <q-input outlined type="text" v-model="form.mobile" :label="$t('mobile') + '*'" lazy-rules
              :rules="rules.mobile" mask="####-###-###" unmasked-value />
            <!-- 生日 -->
            <q-input v-if="form.role === 'role_helper'" filled v-model="form.birth" mask="date" :rules="['date']"
              :label="$t('birthday')">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.birth">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <!-- email -->
            <q-input outlined type="text" v-model="form.email" :label="$t('email') + '*'" lazy-rules
              :rules="rules.email" />
            <!-- 縣市 -->
            <q-select v-if="form.role === 'role_host'" outlined v-model="form.city" :options="cityOptions"
              :label="$t('city') + '*'" emit-value lazy-rules :rules="rules.required">
            </q-select>
            <!-- 區 -->
            <q-select v-if="form.role === 'role_host'" outlined v-model="form.district" :options="districtOptions"
              :label="$t('district') + '*'" emit-value :rules="rules.required">
            </q-select>
            <!-- 詳細地址 -->
            <q-input v-if="form.role === 'role_host'" outlined type="text" v-model="form.address"
              :label="$t('address') + '*'" lazy-rules :rules="rules.address" />
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation class="flex flex-center">
              <q-btn v-if="step === 1" class="q-mx-md" @click="next" color="primary" :label="$t('next')" />
              <q-btn v-if="step === 2" class="q-mx-md" color="primary" :label="$t('submit')" type="submit"
                :loading="loading" />
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
import { api } from '../../boot/axios.js'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
import dataEn from '../../address/data-en.js'
import dataZh from '../../address/data-zh.js'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()

const router = useRouter()

const registerForm = ref(null)
const loading = ref(false)
const step = ref(1)
const account = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const role = ref(null)
const warning = ref(false)
const idxZip = reactive({
  city: '',
  district: ''
})

const stepper = ref(null)

const form = reactive({
  account: '1234',
  password: '1234',
  confirmPassword: '1234',
  role: '',
  name: '老王',
  tel: '0922390046',
  mobile: '8686868755',
  gender: 'male',
  birth: '1995/01/01',
  email: '6786@eagr.rger',
  city: '',
  district: '',
  address: '86777776',
  zipcode: ''
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
    return dataZh.counties
  } else {
    return dataEn.counties
  }
})

const districtOptions = computed(() => {
  if (locale.value === 'zh-TW' && form.city) {
    const idxZh = dataZh.counties.findIndex(v => {
      return v === form.city
    })
    return dataZh.districts[idxZh][0]
  } else {
    if (form.city) {
      const idxEn = dataEn.counties.findIndex(v => {
        return v === form.city
      })
      return dataEn.districts[idxEn][0]
    }
    return null
  }
})

watch(() => locale.value, () => {
  if (locale.value === 'zh-TW') {
    // 改為中文時
    const idxCity = dataEn.counties.findIndex(v => v === form.city)
    if (idxCity > -1) {
      form.city = dataZh.counties[idxCity]
      const distList = dataEn.districts[idxCity][0]
      const idxDist = distList.findIndex(v => v === form.district)
      form.district = dataZh.districts[idxCity][0][idxDist]
    }
    // 改為英文時
  } else {
    const idxCity = dataZh.counties.findIndex(v => v === form.city)
    if (idxCity > -1) {
      form.city = dataEn.counties[idxCity]
      const distList = dataZh.districts[idxCity][0]
      const idxDist = distList.findIndex(v => v === form.district)
      form.district = dataEn.districts[idxCity][0][idxDist]
    }
  }
})

watch(() => form.city, () => {
  if (locale.value === 'zh-TW') {
    const idxCity = dataZh.counties.findIndex(v => v === form.city)
    if (idxCity > -1) {
      idxZip.city = idxCity
    }
  } else {
    const idxCity = dataEn.counties.findIndex(v => v === form.city)
    if (idxCity > -1) {
      idxZip.city = idxCity
    }
  }
})
watch(() => form.district, () => {
  if (locale.value === 'zh-TW') {
    const idxDist = dataZh.districts[idxZip.city][0].findIndex(v => v === form.district)
    if (idxDist > -1) {
      idxZip.district = idxDist
      form.zipcode = dataZh.districts[idxZip.city][1][idxDist]
    }
  } else {
    const idxDist = dataEn.districts[idxZip.city][0].findIndex(v => v === form.district)
    if (idxDist > -1) {
      idxZip.district = idxDist
      form.zipcode = dataZh.districts[idxZip.city][1][idxDist]
    }
  }
})

const warningStyle = computed(() => {
  if (warning.value && !form.role) return { color: 'red' }
  else return { color: 'black' }
})

// 驗證規則(還沒翻譯)
const rules = reactive({
  email: [
    v => !!v || t('required'),
    v => isEmail(v) || '信箱格式錯誤'
  ],
  account: [
    v => !!v || t('required'),
    v => (v.length >= 4 && v.length <= 20) || '帳號長度為 4 到 20 個字',
    v => /^[a-zA-Z0-9]+$/.test(v) || '帳號只能由英數字組成'
  ],
  password: [
    v => !!v || t('required'),
    v => (v.length >= 4 && v.length <= 20) || '密碼長度為 4 到 20 個字',
    v => /^[a-zA-Z0-9]+$/.test(v) || '密碼只能由英數字組成'
  ],
  confirmPassword: [
    v => !!v || '請輸入確認密碼',
    v => v === form.password || '密碼不一致'
  ],
  name: [
    v => !!v || t('required'),
    v => (v.length >= 2 && v.length <= 15) || '名稱長度為 2 到 15 個字'
  ],
  tel: [
    v => v.length <= 10 || '含區碼長度為 9 或 10 個字，ex:02-1234-5678 或 03-1234-567'
  ],
  mobile: [
    v => !!v || t('required'),
    v => v.length === 10 || '請輸入10位手機'
  ],
  address: [
    v => !!v || t('required'),
    v => (v.length >= 5) || '請填寫正確詳細地址資訊'
  ],
  required: [
    v => !!v || t('required')
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
    form.tel = null
    form.mobile = null
    form.birthday = '1995/01/01'
    form.email = null
    form.city = null
    form.district = null
    form.address = null
  }
}

const next = () => {
  if (!form.role) {
    warning.value = true
    return
  }
  if (account.value.validate() && password.value.validate() && confirmPassword.value.validate()) {
    stepper.value.next()
  }
}

const register = async () => {
  if (!registerForm.value.validate()) return
  loading.value = true
  // 把地址存成中文
  if (locale.value === 'en-US') {
    form.city = dataZh.counties[idxZip.city]
    form.district = dataZh.districts[idxZip.city][0][idxZip.district]
  }
  form.role === 'role_host' ? form.role = 1 : form.role = 2
  try {
    await api.post('/users/register', form)
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
    router.push('/')
  }
  loading.value = false
}
</script>
