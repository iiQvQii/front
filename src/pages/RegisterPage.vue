<template>
  <q-page class="flex flex-center column">
    <h4>{{ $t('register_membership') }}</h4>
    <div class="q-pa-md">
      <q-form class="q-gutter-md" v-model="valid" @submit.prevent="register" @reset="onReset">
        <q-stepper v-model="step" ref="stepper" color="primary" animated alternative-labels style="min-width: 400px">
          <q-step :name="1" prefix="1" title="會員帳號資料" icon="settings" :done="step > 1">
            <q-input outlined v-model="form.account" :label="$t('account')" :rules="rules.account" ref="account" />
            <q-input outlined type="password" v-model="form.password" :label="$t('password')" lazy-rules
              :rules="rules.password" ref="password" />
            <q-input outlined type="password" v-model="form.confirmpassword" :label="$t('confirm_password')" lazy-rules
              :rules="rules.confirmPassword" ref="confirmPassword" />
            {{ $t('select_role') }}
            <q-btn-toggle v-model="form.role" toggle-color="primary" :options="options" spread ref="role"
              :rules="rules.role" />
          </q-step>
          <q-step :name="2" prefix="2" title="基本資料" icon="fa-solid fa-file-pen" :done="step > 2">
            {{ form.role }}
            <q-input v-if="form.role === 'role_helper'" outlined type="text" v-model="form.name" :label="$t('name')"
              lazy-rules :rules="rules.name" ref="name" />
            <q-input v-if="form.role === 'role_host'" outlined type="text" v-model="form.name" :label="$t('name')"
              lazy-rules :rules="rules.name" ref="name" />
            <q-select v-if="form.role === 'role_helper'" outlined v-model="form.gender" :options="genderOptions"
              :label="$t('gender')" emit-value :display-value="$t(form.gender)" lazy-rules :rules="rules.gender"
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
            <q-input outlined type="text" v-model="form.email" :label="$t('email')" lazy-rules :rules="rules.email"
              ref="email" />
            <q-select v-if="form.role === 'role_host'" outlined v-model="form.city" :options="cityOptions"
              :label="$t('city')" emit-value :display-value="$t(form.city)" lazy-rules :rules="rules.gender"
              ref="gender">
            </q-select>
            <q-select v-if="form.role === 'role_host'" outlined v-model="form.district" :options="districtOptions"
              :label="$t('city')" emit-value :display-value="$t(form.city)" lazy-rules :rules="rules.gender"
              ref="gender">
            </q-select>
            <q-input outlined type="text" v-model="form.address" :label="$t('address')" lazy-rules
              :rules="rules.address" />
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
import { ref, reactive, computed } from 'vue'
import { isEmail } from 'validator'
import { api } from '../boot/axios.js'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter()

const valid = ref(false)
const loading = ref(false)
const step = ref(1)
const account = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const role = ref(null)
const email = ref(null)
const name = ref(null)

const stepper = ref(null)

const form = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  role: '',
  name: '',
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

const cityOptions = reactive(['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', '基隆市', '新竹市', '嘉義市'])

const districtOptions = computed(() => {
  if (form.city === '臺北市') return ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區']
})

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
  ],
  name: [
    v => !!v || '姓名必填',
    v => (v.length >= 2 && v.length <= 15) || '帳號長度為 2 到 15 個字'
  ],
  gender: [
    v => !!v || '性別必填'
  ],
  birthday: [
    v => !!v || '生日必填'
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
  }
}

const next = () => {
  if (account.value.validate() && password.value.validate() && confirmPassword.value.validate() && form.role !== '') {
    stepper.value.next()
  }
}

const register = async () => {
  if (!valid.value) return
  loading.value = true
  try {
    if (form.role === 'role_host') {
      await api.post('/hosts/register', form)
    } else {
      await api.post('/hepler/register', form)
    }
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
