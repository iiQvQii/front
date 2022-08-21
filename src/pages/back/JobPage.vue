<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 1200px">
      <q-card>
        <q-tabs v-model="tab" class="text-grey q-pa-sm" active-color="primary" indicator-color="primary"
          narrow-indicator align="left">
          <q-tab name="isShown" :label="$t('is_shown')" />
          <q-tab name="notShown" :label="$t('is_not_shown')" />
          <q-btn class="absolute q-ma-lg" flat round color="primary" icon="mdi-plus-circle-outline" style="right: 0;"
            size="1rem" to="/admin/jobs_post" />

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="isShown">
            <q-table :rows="jobs" :columns="columns" row-key="name" :loading="loading" flat>
              <template v-slot:body-cell="props">
                <!-- <pre>{{ props.row }}</pre> -->
                <q-td :props="props">
                  {{ props.value }}
                </q-td>
              </template>
              <!-- photos 民宿照片 -->
              <template v-slot:body-cell-photos="props">
                <q-td :props="props">
                  <div>
                    <q-img :src="props.value" spinner-color="white" style="height: 140px; min-width: 150px" />
                  </div>
                </q-td>
              </template>
              <!-- edit 編輯 -->
              <template v-slot:body-cell-edit="props">
                <q-td :props="props">
                  <q-btn round flat color="primary" icon="edit" :to="'/admin/jobs/' + props.row._id" />
                </q-td>
              </template>
              <!-- delete 刪除 -->
              <template v-slot:body-cell-delete="props">
                <q-td :props="props">
                  <q-btn round flat color="primary" icon="delete" to="'/admin/jobs/' + props.row._id" />
                </q-td>
              </template>
              <!-- loading -->
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="notShown">

          </q-tab-panel>

        </q-tab-panels>

      </q-card>

    </div>
  </div>
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
      label: t('job_place'),
      field: row => row.city + row.district
    },
    {
      name: 'edit',
      align: 'center',
      label: t('edit')
    },
    {
      name: 'delete',
      align: 'center',
      label: t('delete')
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
