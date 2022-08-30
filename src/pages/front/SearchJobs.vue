<template>
  <q-page :key="componentKey">
    <div id="find_job">
      <div class="main_banner">
        <q-img class="main_banner" src="../../assets/banner-2.jpg" width="100%" />
        <div class="bg"></div>
        <h2 class="text-dark text-center">
          {{  $t('find_jobs')  }}
        </h2>
      </div>
      <!-- 麵包屑 -->
      <div class="container q-mx-auto">
        <div class="row q-py-lg">
          <q-breadcrumbs class="col-12">
            <q-breadcrumbs-el exact :label="$t('home')" to="/" />
            <q-breadcrumbs-el exact :label="$t('find_jobs')" to="/jobs/search" />
          </q-breadcrumbs>
        </div>
      </div>

      <!-- 工作卡片 -------------------------------------------------->
      <div class="container job_card_container q-mx-auto">
        <div class="row q-col-gutter-md">
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
                      {{  job.city + ' ' + job.district  }}
                    </div>
                    <!-- 工作名稱 -->
                    <div class="text-h5 q-mt-sm q-mb-xs title">
                      {{  job.title  }}

                    </div>
                  </div>
                </div>
                <div class="row">
                  <!-- 換宿福利 -->
                  <div class="col-12 q-py-sm">
                    <div class="text-overline text-orange-9">
                      {{  $t('job_welfare')  }}
                    </div>
                    <q-chip v-for="(welfares, i) in job.welfare" :key="i" size=".6rem">{{  $t(welfares)  }}
                    </q-chip>
                  </div>
                </div>
                <div class="row">
                  <!-- 工作內容 -->
                  <div class="col-12 description text-caption text-grey">
                    {{  job.description  }}
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
      </div>

      <div v-if="noData" class="row flex-center">
        <div class="col-12">
          <h4 class="text-center text-accent"><i>{{  $t('no_results_label')  }}</i></h4>
        </div>
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
const searchDate = reactive({
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

watch(() => searchDate.date, () => {
  date.value = searchDate.date.from + '~' + searchDate.date.to
  form.date_from = searchDate.date.from.replace(/\//g, '-')
  form.date_to = searchDate.date.to.replace(/\//g, '-')
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

// const search = async () => {
//   try {
//     form.
//   } catch (error) {

//   }
// }

const search = async () => {

}

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
    // console.log(url)
    const slicedUrl = url.slice(0, -1)
    console.log(slicedUrl)
    const { data } = await apiAuth.get(slicedUrl)
    // // router.replace({ path: '/' })
    // jobs = []
    jobs.push(...data.result)
    // console.log(jobs)
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
