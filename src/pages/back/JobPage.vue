<template>
  <q-page>
    <div class="q-pa-xl q-mx-auto" style="max-width: 1200px">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center q-mb-none">{{ $t('manage_jobs') }}</h2>
        </div>
      </div>
      <!-- 新增工作btn -->
      <div class="row justify-end">
        <div class="col-12 q-pb-sm text-right">
          <q-btn id="plus" flat color="primary" icon="mdi-plus-circle-outline" :label="$t('post_jobs')"
            to="/admin/jobs_post" />
        </div>
      </div>
      <q-separator class="q-mb-lg" />

      <q-table id="job_table" :rows="jobs" :columns="columns" row-key="name" :loading="loading" :grid="$q.screen.lt.lg"
        :hide-bottom="$q.screen.lt.lg" :filter="filter" :no-data-label="$t('no_data_label')"
        :no-results-label="$t('no_results_label')">
        <template v-slot:body-cell="props">
          <!-- <pre>{{ props.row }}</pre> -->
          <q-td :props="props">
            {{ props.value }}
          </q-td>
        </template>
        <!-- 表頭 -->
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class=" text-primary">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <!-- photos 民宿照片 -->
        <template v-slot:body-cell-photos="props">
          <q-td :props="props">
            <div>
              <q-img :src="props.value" spinner-color="white" :ratio="4 / 3" style="min-width: 150px" />
            </div>
          </q-td>
        </template>
        <!-- edit 編輯 -->
        <template v-slot:body-cell-edit="props">
          <q-td :props="props">
            <q-btn round flat color="primary" icon="edit" :to="'/admin/jobs/' + props.row._id" />
          </q-td>
        </template>
        <!-- loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <!--  grid slot --------------------------->
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>

              <!-- 圖片 ------------------>
              <q-card-section class="text-center">
                <a :href="'#/jobs/' + props.row._id">
                  <q-img :src="props.row.photos[0]" spinner-color="white" :ratio="4 / 3" style="min-width: 150px;" />
                </a>
              </q-card-section>
              <q-separator inset />
              <q-card-section class="q-pb-none">
                <div style="height:160px">
                  <!-- 工作名稱 -->
                  <div class="q-pb-md">
                    <a class="text-h5" :href="'#/jobs/' + props.row._id">
                      {{ props.row.title }}
                    </a>
                  </div>
                  <!-- 工作時間 -->
                  <div class="q-pb-xs">
                    <p class="text-h6 text-primary"> {{ $t('job_time') }} </p>
                    <p>
                      {{ props.row.date_from + '~' + props.row.date_to }}
                    </p>
                  </div>
                  <!-- 工作地點 -->
                  <div class="q-pb-xs">
                    <p class="text-h6 text-primary"> {{ $t('job_location') }} </p>
                    <p>
                      {{ props.row.city + props.row.district }}
                    </p>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <!-- edit 編輯 -->
                <q-btn class="full-width" outline color="primary" :label="$t('edit')" icon="edit"
                  :to="'/admin/jobs/' + props.row._id" />
              </q-card-section>

            </q-card>
          </div>
        </template>
      </q-table>

    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'

import { apiAuth } from '../../boot/axios.js'
import { useRoute } from 'vue-router'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()
const route = useRoute()

const tab = ref('isShown')
const loading = ref(false)
const jobs = reactive([])
// table head -------------------------------------
const columns = computed(() => {
  return [
    {
      name: 'photos',
      label: '',
      align: 'center',
      field: row => row.photos[0]
    },
    {
      name: 'title',
      required: true,
      label: t('job_title'),
      align: 'center',
      field: row => row.title,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'job_time',
      align: 'center',
      label: t('job_time'),
      field: row => row.date_from + '~' + row.date_to,
      sortable: true
    },
    {
      name: 'place',
      align: 'center',
      label: t('job_location'),
      field: row => row.city + row.district
    },
    {
      name: 'edit',
      align: 'center',
      label: t('edit')
    }
  ]
})

const getMyJob = async () => {
  loading.value = true
  try {
    const { data } = await apiAuth.get('/jobs/my_job')
    jobs.push(...data.result)
    // 處理 Date-8 小
    jobs.map(v => {
      v.date_from = new Date(v.date_from).toLocaleDateString()
      v.date_to = new Date(v.date_to).toLocaleDateString()
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
  loading.value = false
}
getMyJob()

const deleteJob = async () => {
  try {
    const { data } = await apiAuth.delete('/jobs/' + route.params.id)
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤!'
    })
  }
}

</script>
