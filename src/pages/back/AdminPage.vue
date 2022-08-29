<template>
  <q-page>
    <div class="q-pa-xl q-mx-auto">
      <h2 class="text-center">{{ $t('manage_profile') }}</h2>
      <q-separator inset class="q-mb-lg" />

      <div class="q-mx-auto form_container">
        <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" @submit.prevent="submit">
          <div class="row">
            <div class="col-12">
              <h5>{{ $t('info') }}</h5>

            </div>
            <div class="col-12 col-md-6">

              <q-input outlined v-model="form.name" :label="isHelper ? $t('name') + '*' : $t('host_name') + '*'"
                :rules="rules.name">
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.email" :label="$t('email') + '*'" :rules="rules.email">
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <!-- 性別 -->
              <q-select v-if="isHelper" outlined v-model="form.gender" :options="genderOptions"
                :label="$t('gender') + '*'" emit-value :display-value="$t(form.gender)" lazy-rules
                :rules="rules.required" />
            </div>
            <div class="col-12 col-md-6">
              <!-- 生日 -->
              <q-input v-if="isHelper" outlined v-model="form.birth" :rules="['date']" :label="$t('birthday')">
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
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.tel" :label="$t('tel')" :rules="rules.tel">
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.mobile" :label="$t('mobile') + '*'" :rules="rules.mobile">
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-select v-if="isHost" outlined v-model="form.city" :options="cityOptions" :label="$t('city') + '*'"
                emit-value lazy-rules :rules="rules.required">
              </q-select>
            </div>
            <div class="col-12 col-md-6">
              <!-- 區 -->
              <q-select v-if="isHost" outlined v-model="form.district" :options="districtOptions"
                :label="$t('district') + '*'" emit-value :rules="rules.required">
              </q-select>
            </div>
            <div class="col-12">
              <!-- 詳細地址 -->
              <q-input v-if="isHost" outlined type="text" v-model="form.address" :label="$t('address') + '*'" lazy-rules
                :rules="rules.address" />
            </div>
            <!-- 關於我的故事 -->
            <div class="col-12">
              <h5>{{ $t('story_of_my_life') }}</h5>
              <div class="editor">
                <QuillEditor v-model:content="form.description" contentType="html" theme="snow" toolbar="minimal"
                  class="ql" :placeholder="$t('tell_me_someting_about_you')" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h5 v-if="isHelper">{{ $t('photos') }}</h5>
              <h5 v-if="isHost">{{ $t('photos_host') }}</h5>
              <q-file color="primary" accept=".jpg, image/*" :max-files="3" filled multiple v-model="form.photos"
                :label="$t('upload_file')" :hint="$t('max_upload')">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
              <!-- 渲染上傳圖片 -->
              <div class="q-pa-md flex row">
                <div class="col-6 q-pa-xs " v-for="(photo, i) in photos" :key="i">
                  <q-img :src="photo" :ratio="4 / 3" spinner-color="white" />
                </div>
              </div>

            </div>
          </div>
          <q-btn class="full-width q-mt-lg" color="primary" :label="$t('submit')" type="submit" :loading="loading" />
        </q-form>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { isEmail } from 'validator'
import Swal from 'sweetalert2'
import { apiAuth } from '../../boot/axios.js'
import { useUserStore } from 'src/stores/user'
import dataEn from '../../address/data-en.js'
import dataZh from '../../address/data-zh.js'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()

const user = useUserStore()

const {
  name,
  gender,
  birth,
  tel,
  mobile,
  email,
  city,
  district,
  address,
  zipcode,
  description,
  photos,
  role,
  isHost,
  isHelper,
  lang
} = storeToRefs(user)

const loading = ref(false)
const idxZip = reactive({
  city: '',
  district: ''
})

const form = reactive({
  name: name.value,
  avatar: '',
  gender: gender.value,
  birth: birth.value,
  tel: tel.value,
  mobile: mobile.value,
  email: email.value,
  city: city.value,
  district: district.value,
  address: address.value,
  zipcode: zipcode.value,
  role: role.value,
  description: description.value,

  photo_1: '',
  photo_2: '',
  photo_3: '',
  photos: []
})

const genderOptions = computed(() => {
  return [
    { label: t('male'), value: 'male' },
    { label: t('female'), value: 'female' },
    { label: t('rahter_not_say'), value: 'rahter_not_say' }
  ]
})

const options = computed(() => {
  return [
    { label: t('role_host'), value: 'role_host' },
    { label: t('role_helper'), value: 'role_helper' }
  ]
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
  } else if (locale.value === 'en-US' && form.city) {
    console.log(form.city)
    const idxEn = dataEn.counties.findIndex(v => {
      return v === form.city
    })
    if (idxEn === -1) {
      const idxEn = dataZh.counties.findIndex(v => {
        return v === form.city
      })
      return dataEn.districts[idxEn][0]
    }
    // console.log(idxEn)
    return dataEn.districts[idxEn][0]
  } else {
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
  form.district = ''
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

const submit = () => {
  loading.value = true
  console.log(form.photos)
  // 把地址存成中文
  if (locale.value === 'en-US') {
    form.city = dataZh.counties[idxZip.city]
    form.district = dataZh.districts[idxZip.city][0][idxZip.district]
  }

  user.editUserInfo(form)
  loading.value = false
}
</script>
