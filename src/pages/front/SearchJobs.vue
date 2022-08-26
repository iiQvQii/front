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
      <!-- <pre>{{ jobs }}</pre> -->
      <div class="row q-col-gutter-md">
        <div v-for="job in jobs" :key="job._id" class="col-12 col-md-6 col-lg-4">
          <q-card class="full-height" flat bordered>
            <a :href="'#/jobs/' + job._id">
              <q-img :src="job.photos[0]" :ratio="4 / 3" />
            </a>
            <q-card-section>
              <div class="left">
                <q-avatar size="2rem">
                  <img :src="job.host.avatar">
                </q-avatar>
              </div>
              <div class="right">
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

              <!-- 換宿福利 -->
              <div class="q-pb-sm">
                <div class="text-overline text-orange-9">
                  {{ $t('job_welfare') }}
                </div>
                <q-chip v-for="(welfares, i) in job.welfare" :key="i" size=".6rem">{{ $t(welfares) }}
                </q-chip>
              </div>
              <!-- 工作內容 -->
              <div class="description text-caption text-grey">
                {{ job.description }}
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
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import { useQuasar } from 'quasar'

import { useRoute, useRouter } from 'vue-router'

import { apiAuth } from '../../boot/axios'
const $q = useQuasar()

const route = useRoute()
const router = useRouter()
const noData = ref(false)
const jobs = reactive([])

const form = reactive({
  title: route.query.title,
  city: route.query.city
})

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
    url.slice(0, -1)
    console.log(url)
    const { data } = await apiAuth.get(url)
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
