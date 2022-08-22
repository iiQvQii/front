<template>

  <q-page>
    <div class="container q-mx-auto">

      <div class="row q-pb-md">
        <!-- 麵包屑 -->
        <q-breadcrumbs class="col-12">
          <q-breadcrumbs-el exact :label="$t('home')" to="/" />
          <q-breadcrumbs-el exact :label="$t('find_jobs')" to="/jobs" />
        </q-breadcrumbs>
      </div>
      <div class="row q-col-gutter-md">
        <div v-for="job in jobs" :key="job._id" class="col-12 col-md-6 col-lg-4">
          <q-card class="full-height" flat bordered>
            <q-img :src="job.photos[0]" :ratio="4 / 3" />

            <q-card-section>
              <!-- {{ jobs }} -->
              <div class="text-overline text-orange-9">
                <q-icon name="pin_drop" size="1.1rem" />
                {{ job.city + ' ' + job.district }}
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs title">
                {{ job.title }}
              </div>
              <div>
                <q-chip v-for="(welfares, i) in job.welfare" :key="i" size=".8rem">{{ $t(welfares) }}
                </q-chip>
              </div>
              <div class="description text-caption text-grey">
                {{ job.description }}
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn class="full-width" flat color="primary" :label="$t('more')" :to="('/jobs/' + job._id)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
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
    // 處理 Date-8 小 福利陣列 描述去tag
    jobs.map(v => {
      v.date_from = new Date(v.date_from).toLocaleDateString()
      v.date_to = new Date(v.date_to).toLocaleDateString()
      v.welfare = v.welfare[0]?.split(',')
      v.description = v.description.replace(/<(?:.|\s)*?>/g, '')
      return v
    })
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

// const description = getElementById('')
</script>
