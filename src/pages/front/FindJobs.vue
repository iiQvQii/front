<template>
  <q-page>
    <div id="find_job" class="container q-mx-auto ">
      <div class="row q-pb-md">
        <!-- 麵包屑 -->
        <q-breadcrumbs class="col-12">
          <q-breadcrumbs-el exact :label="$t('home')" to="/" />
          <q-breadcrumbs-el exact :label="$t('find_jobs')" to="/jobs" />
        </q-breadcrumbs>
      </div>

      <!-- search bar ----------------------------------------------->
      <div class="row">
        <div class="col">
          <div id="job_search_area" class="q-my-md">
            <div class="row">
              <!-- 直接搜尋(title) -->
              <div class="col">
                <q-input v-model="form.keyword" standout type="search" maxlength="20" color="dark" bg-color="white"
                  :input-style="{ color: '#112B3C', fontSize: '1.1rem' }">
                </q-input>
                <q-btn id="search_btn" color="secondary" :label="$t('search')" icon="search" />
              </div>
            </div>
            <div class="row">
              <!-- 地區 -->
              <div class="col-6">
                <!-- 縣市 -->
                <q-select outlined v-model="form.city" :options="cityOptions" :label="$t('city') + '*'" emit-value
                  lazy-rules />
              </div>
              <!-- 時間 -->
              <div class="col-6">
                <q-btn icon="event" round color="primary">
                  <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="proxyDate">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- 工作卡片 -------------------------------------------------->
      <div class="row q-col-gutter-md q-my-xl">
        <div v-for="job in jobs" :key="job._id" class="col-12 col-md-6 col-lg-4">
          <q-card class="job_card" flat bordered>
            <a :href="'#/jobs/' + job._id">
              <q-img :src="job.photos[0]" :ratio="4 / 3" />
            </a>
            <q-card-section>
              <div class="row">
                <div class="col-2 flex align-center">
                  <q-avatar class="q-mt-xs" size="2.5rem">
                    <img :src="job.host.avatar">
                  </q-avatar>
                </div>
                <div class="col-10">
                  <!-- 地點 -->
                  <div class="text-overline text-orange-9">
                    <q-icon name="pin_drop" size="1.1rem" />
                    {{ job.city + ' ' + job.district }}
                  </div>
                  <!-- 工作名稱 -->
                  <div class="text-h5 q-mt-sm q-mb-xs title">
                    {{ job.title }}

                  </div>
                </div>
              </div>
              <div class="row">
                <!-- 換宿福利 -->
                <div class="col-12 q-py-sm">
                  <div class="text-overline text-orange-9">
                    {{ $t('job_welfare') }}
                  </div>
                  <q-chip v-for="(welfares, i) in job.welfare" :key="i" size=".6rem">{{ $t(welfares) }}
                  </q-chip>
                </div>
              </div>
              <div class="row">
                <!-- 工作內容 -->
                <div class="col-12 description text-caption text-grey">
                  {{ job.description }}
                </div>
              </div>
            </q-card-section>

            <!-- more btn -->
            <q-card-actions>
              <q-btn class="full-width" flat color="primary" :label="$t('more')" :to="('/jobs/' + job._id)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div v-if="noData" class="row q-col-gutter-md">
        <h4>{{ $t('no_results_label') }}</h4>

      </div>
    </div>

  </q-page>
</template>
<script setup>
import { ref, reactive, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

import { useRoute, useRouter } from 'vue-router'

import { apiAuth } from '../../boot/axios'
import dataEn from 'src/address/data-en'
import dataZh from 'src/address/data-zh'

const $q = useQuasar()
const { locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const noData = ref(false)
const jobs = reactive([])
const date = ref('')
const qDate = reactive({
  date: {}
})

const form = reactive({
  title: route.query.title,
  city: route.query.city,
  date_from: route.query.date_from,
  date_to: route.query.date_to
})

const cityOptions = computed(() => {
  if (locale.value === 'zh-TW') {
    return dataZh.counties
  } else {
    return dataEn.counties
  }
})

// watch(() => qDate, () => {
//   date.value = qDate.value.from + '~' + qDate.value.to
// })

// const getAllJob = async () => {
//   try {
//     const { data } = await apiAuth.get('/jobs')
//     jobs.push(...data.result)
//     jobs.reverse()
//     // 處理 Date-8 小 福利陣列 描述去tag
//     jobs.map(v => {
//       v.date_from = new Date(v.date_from).toLocaleDateString()
//       v.date_to = new Date(v.date_to).toLocaleDateString()
//       v.description = v.description.replace(/<(?:.|\s)*?>/g, '')
//       return v
//     })
//   } catch (error) {
//     console.log(error)
//     Swal.fire({
//       icon: 'error',
//       title: '失敗',
//       text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
//     })
//   }
// }
// getAllJob()
// console.log(route.query.city)


const searchJob = async () => {
  $q.loading.show({
    delay: 400 // ms
  })

  try {
    // search?title=工作&city=&district=&welfare
    let url = '/jobs/search?'
    for (const key in form) {
      url += key + '=' + (form[key] || '') + '&'
    }
    console.log(url)
    const slicedUrl = url.slice(0, -1)
    console.log(slicedUrl)
    const { data } = await apiAuth.get(slicedUrl)
    // // router.replace({ path: '/' })
    // jobs = []
    jobs.push(...data.result)
    console.log(jobs)
    // 處理 Date-8 小 福利陣列 描述去tag
    jobs.map(v => {
      v.date_from = new Date(v.date_from).toLocaleDateString()
      v.date_to = new Date(v.date_to).toLocaleDateString()
      v.description = v.description.replace(/<(?:.|\s)*?>/g, '')
      return v
    })
    jobs.reverse()
    // 如果找不到資料show no data
    if (jobs.length === 0) {
      noData.value = true
    }

    $q.loading.hide()
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
    })
  }
}
searchJob()

</script>
