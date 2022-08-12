<template>
  <q-page class="flex flex-center column">
    <h4>{{ $t('post_jobs') }}</h4>
    <div class="q-pa-md" style="min-width: 500px">
      <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" @submit.prevent="submit">
        <q-input outlined v-model="form.title" :label="$t('job_title') + '*'" :rules="rules.title">
        </q-input>
        <!-- 時間job_time -->
        {{ form.date }}
        <!-- <q-date v-model="form.date" range></q-date> -->
        <q-input filled v-model="form.date" :rules="['date']" :label="$t('job_time')" @update:model-value="a">
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
        <q-input filled v-model="form.date_start" mask="date" :rules="['date']" :label="$t('job_time_start')">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.date_start" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input filled v-model="form.date_end" mask="date" :rules="rules.date_end" :label="$t('job_time_end')">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.date_end" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <!-- 縣市 -->
        <q-select outlined v-model="form.city" :options="cityOptions" :label="$t('city') + '*'" emit-value lazy-rules
          :rules="rules.required">
        </q-select>
        <!-- 區 -->
        <q-select outlined v-model="form.district" :options="districtOptions" :label="$t('district') + '*'" emit-value
          :rules="rules.required">
        </q-select>

        <!-- 詳細地址 -->
        <q-input outlined type="text" v-model="form.address" :label="$t('address') + '*'" lazy-rules
          :rules="rules.address" />
        <!-- 福利job_welfare -->
        <h5>{{ $t('job_welfare') }}</h5>
        <div class="q-gutter-sm">
          <q-checkbox v-for="(welfareOption, i) in welfareOptions" :key="i" v-model="form.welfare"
            :val="welfareOption.value" :label="welfareOption.label" />
        </div>
        <!-- 工作時數 -->
        <h5>{{ $t('job_week_hours') }}</h5>
        <q-input v-model.number="form.week_hours" type="number" filled :rules="rules.required">
          <template v-slot:append>
            <p style="font-size: 1rem;margin: 0;">{{ $t('hours_a_week') }}</p>
          </template>
        </q-input>

        <!-- 工作內容 -->
        <h5>{{ $t('job_description') }}</h5>
        <QuillEditor v-model:content="form.description" contentType="html" theme="snow" toolbar="minimal"
          :placeholder="$t('write_down_what_the_helpers_need_to_do')" />
        <h5 v-if="isHost">{{ $t('photos_host') }}</h5>
        <sub>{{ '最多上傳3張' }}</sub>
        <q-file color="primary" accept=".jpg, image/*" :max-files="3" filled multiple v-model="form.photos"
          :label="$t('upload_file')">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <!-- 渲染上傳圖片 -->
        <div class="q-pa-md flex row">
          <div class="col-6 q-pa-xs " v-for="(photo, i) in photos" :key="i">
            <q-img :src="photo" :fit="cover" :ratio="4 / 3" spinner-color="white" />
          </div>
        </div>

        <q-btn class="full-width" color="primary" :label="$t('submit')" type="submit" :loading="loading" />
      </q-form>
    </div>

  </q-page>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import { useUserStore } from 'src/stores/user'
import dataEn from '../../address/data-en.js'
import dataZh from '../../address/data-zh.js'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { date } from 'quasar'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()

const user = useUserStore()

const {
  city,
  district,
  address,
  zipcode,
  role,
  isHost
} = storeToRefs(user)

const loading = ref(false)
const valid = ref(true)
const idxZip = reactive({
  city: '',
  district: ''
})

const date1 = ref({})

const form = reactive({
  title: '',
  category: '',
  date_start: '',
  date_end: '',
  date: { from: '2020/07/16', to: '2020/07/17' },
  welfare: [],
  city: city.value,
  district: district.value,
  address: address.value,
  zipcode: zipcode.value,
  role: role.value,
  description: '',
  photos: '',
  week_hours: 10
})

const welfareOptions = computed(() => {
  return [
    { label: t('dorm_bed'), value: 'dorm_bed' },
    { label: t('vehicle'), value: 'vehicle' },
    { label: t('pocket_money'), value: 'pocket_money' },
    { label: t('insurance'), value: 'insurance' },
    { label: t('free_course'), value: 'free_course' },
    { label: t('meal'), value: 'meal' }

  ]
})
// new Date('2022/08/30').valueOf()  => 1661788800000
// new Date(1661788800000).getFullYear() => 2022

// 驗證規則(還沒翻譯)
watch(() => form.date_end, () => {
  const dateStart = new Date(form.date_start).valueOf()
  const dateEnd = new Date(form.date_end).valueOf()

  if (dateEnd < dateStart) {
    valid.value = false
  } else {
    valid.value = true
  }
})

const rules = reactive({
  title: [
    v => !!v || t('required'),
    v => (v.length >= 2 && v.length <= 15) || '名稱長度為 2 到 15 個字'
  ],
  date_start: [
    v => !!v || t('required')
  ],
  date_end: [
    v => !!v || t('required'),
    v => date.isValid(v) || '日期格式錯誤',
    v => valid.value || '結束日期不得小於開始日'
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
    const idxEn = dataEn.counties.findIndex(v => {
      return v === form.city
    })
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
  // 把地址存成中文
  if (locale.value === 'en-US') {
    form.city = dataZh.counties[idxZip.city]
    form.district = dataZh.districts[idxZip.city][0][idxZip.district]
  }
  user.editUserInfo(form)
  loading.value = false
}

</script>
