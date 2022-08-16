<template>
  <q-page-container>
    <q-page padding class="container">
      <div class="q-col-gutter-md row items-start">
        <!-- 麵包屑 -->
        <q-breadcrumbs class="col-12">
          <q-breadcrumbs-el exact :label="$t('home')" to="/" />
          <q-breadcrumbs-el exact :label="$t('find_jobs')" to="/jobs" />
          <q-breadcrumbs-el exact :label="$t('find_jobs')" to="/jobs" />
        </q-breadcrumbs>
        <div v-for="job in jobs" :key="job._id" class="col-12 col-md-6 col-lg-3">
          <q-card class="my-card" flat bordered>
            <q-img :src="job.photos[0]" :ratio="4 / 3" />

            <q-card-section>
              <!-- {{ jobs }} -->
              <div class="text-overline text-orange-9">
                <q-icon name="pin_drop" size="1.1rem" />
                {{ job.city + ' ' + job.district }}
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs">
                {{ job.title }}
              </div>
              <div class="text-caption text-grey">
                {{ job.description }}
              </div>
              <div class="text-caption text-grey">
                <q-chip v-for="(welfares, i) in job.welfare" :key="i">{{ $t(welfares) }}</q-chip>
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn flat color="primary" :label="$t('more')" />
            </q-card-actions>
          </q-card>
        </div>
      </div>

    </q-page>
  </q-page-container>
</template>
<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../../boot/axios'
const jobs = reactive([])

const getAllJob = async () => {
  try {
    const { data } = await apiAuth.get('/jobs')
    jobs.push(...data.result)
    // 處理 Date-8 小
    jobs.map(v => {
      v.date_from = new Date(v.date_from).toLocaleDateString()
      v.date_to = new Date(v.date_to).toLocaleDateString()
      v.welfare = v.welfare[0] ? v.welfare[0].split(',') : ''
      return v
    })
    console.log(jobs)
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤!'
    })
  }
}
getAllJob()
</script>
