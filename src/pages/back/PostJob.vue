<template>
  <q-page id="post_jobs">
    <div class="q-pa-xl q-mx-auto">
      <h3 class="text-center">{{ $t('new_jobs') }}</h3>
      <q-separator inset class="q-mb-lg" />

      <div class="q-mx-auto form_container">
        <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" @submit.prevent="submit">

          <div class="row justify-end">
            <div class="col q-pb-md text-right text-weight-bold">
              <q-toggle v-model="form.is_shown" :label="form.is_shown ? $t('is_shown') : $t('is_not_shown')" />
            </div>
          </div>

          <div>
            <!-- 職缺名稱 -->
            <q-input outlined v-model="form.title" :label="$t('job_title') + '*'" :rules="rules.title">
            </q-input>
            <!-- 時間job_time -->
            <q-input outlined v-model="date" :rules="rules.required" :label="$t('job_time')">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.date" range>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <!-- 縣市 -->
            <q-select outlined v-model="form.city" :options="cityOptions" :label="$t('city') + '*'" emit-value
              lazy-rules :rules="rules.required">
            </q-select>
            <!-- 區 -->
            <q-select outlined v-model="form.district" :options="districtOptions" :label="$t('district') + '*'"
              emit-value :rules="rules.required">
            </q-select>
            {{ idxZip.city }}
            <!-- 詳細地址 -->
            <q-input outlined type="text" v-model="form.address" :label="$t('address') + '*'" lazy-rules
              :rules="rules.address" />
          </div>

          <!-- 福利job_welfare -->
          <div>
            <h5>{{ $t('job_welfare') }}</h5>
            <div class="q-gutter-sm">
              <q-checkbox v-for="(welfareOption, i) in welfareOptions" :key="i" v-model="form.welfare"
                :val="welfareOption.value" :label="welfareOption.label" />
            </div>

          </div>

          <!-- 工作時數 -->
          <div>
            <h5>{{ $t('job_week_hours') }}</h5>
            <q-input v-model.number="form.week_hours" type="number" filled :rules="rules.required">
              <template v-slot:append>
                <p style="font-size: 1rem;margin: 0;">{{ $t('hours_a_week') }}</p>
              </template>
            </q-input>
          </div>

          <!-- 工作內容 -->
          <div>
            <h5>{{ $t('job_description') }}</h5>
            <QuillEditor v-model:content="form.description" contentType="html" theme="snow" toolbar="minimal"
              :placeholder="$t('write_down_what_the_helpers_need_to_do')" />
          </div>

          <!-- 照片 -->
          <div>
            <h5 v-if="isHost">{{ $t('photos_host') }}</h5>
            <q-file color="primary" accept=".jpg, image/*" :max-files="3" filled multiple v-model="form.photos"
              :label="$t('upload_file')" hint="最多上傳3張">
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

          <!-- 提問小幫手 -->
          <div>
            <h5>{{ $t('job_question') }}</h5>
            <q-input v-model="form.question" filled type="textarea" :hint="$t('job_question_hint')" />
          </div>

          <!-- 送出 -->
          <q-btn class="full-width q-mt-xl" color="primary" :label="$t('submit')" type="submit" :loading="loading" />
        </q-form>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useUserStore } from 'src/stores/user'
import dataEn from '../../address/data-en.js'
import dataZh from '../../address/data-zh.js'
import { apiAuth } from '../../boot/axios.js'
import { useRoute, useRouter } from 'vue-router'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const user = useUserStore()

const {
  role,
  isHost
} = storeToRefs(user)

const date = ref('')
const loading = ref(false)
const valid = ref(true)

// 第幾個city、第幾個district
const idxZip = reactive({
  city: '',
  district: ''
})

const form = reactive({
  _id: '',
  title: '',
  date: {},
  date_from: '',
  date_to: '',
  welfare: [],
  city: '',
  district: '',
  address: '',
  zipcode: '',
  role: role.value,
  description: '?',
  photos: [],
  question: '1. 請問你為什麼想要來',
  week_hours: 10,
  is_shown: true
})

watch(() => form.date, () => {
  date.value = form.date.from + '~' + form.date.to
})

const welfareOptions = computed(() => {
  return [
    { label: t('accommodation'), value: 'accommodation' },
    { label: t('vehicle'), value: 'vehicle' },
    { label: t('pocket_money'), value: 'pocket_money' },
    { label: t('insurance'), value: 'insurance' },
    { label: t('free_course'), value: 'free_course' },
    { label: t('meal'), value: 'meal' }

  ]
})

// 驗證規則(還沒翻譯)
const rules = reactive({
  title: [
    v => !!v || t('required'),
    v => (v.length >= 2 && v.length <= 30) || '名稱長度為 2 到 30 個字'
  ],
  // date_start: [
  //   v => !!v || t('required')
  // ],
  // date_end: [
  //   v => !!v || t('required'),
  //   v => date.isValid(v) || '日期格式錯誤',
  //   v => valid.value || '結束日期不得小於開始日'
  // ],
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
    const idxEn = dataEn.counties.findIndex(v => {
      return v === form.city
    })
    console.log(form.city)
    console.log(idxEn)
    return dataEn.districts[idxEn][0] || ''
  } else {
    return null
  }
})

// 語言更換時清掉已選地址，避免翻譯出錯
watch(() => locale.value, () => {
  form.city = ''
  form.district = ''
})

// 記第幾個位置
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

// 記第幾個位置 + 轉郵遞區號
watch(() => form.district, () => {
  if (locale.value === 'zh-TW') {
    console.log(idxZip.city)
    const idxDist = dataZh.districts[idxZip.city][0].findIndex(v => v === form.district)
    console.log(idxZip.city)
    console.log(idxDist)
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

// 新增工作
const submit = async () => {
  loading.value = true
  try {
    form.date_from = form.date.from
    form.date_to = form.date.to
    // 把地址存成中文
    if (locale.value === 'en-US') {
      form.city = dataZh.counties[idxZip.city]
      form.district = dataZh.districts[idxZip.city][0][idxZip.district]
    }
    const fd = new FormData()
    for (const key in form) {
      if (key === 'photos') {
        for (let i = 0; i < form[key].length; i++) {
          fd.append(key, form[key][i])
        }
      } else if (key === 'welfare') {
        for (let i = 0; i < form[key].length; i++) {
          fd.append(key, form[key][i])
        }
      } else {
        fd.append(key, form[key])
      }
    }
    await apiAuth.post('/jobs', fd)
    await Swal.fire({
      icon: 'success',
      title: '成功',
      text: '新增成功'
    })
    router.push('/admin/jobs')
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
    })
  }
  loading.value = false
}

</script>
