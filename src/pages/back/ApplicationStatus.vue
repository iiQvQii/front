<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 1200px">
      <q-card>
        <q-tabs v-model="tab" class="text-grey q-pa-sm" active-color="primary" indicator-color="primary"
          narrow-indicator align="left">
          <q-tab name="isShown" :label="$t('is_shown')" />
          <q-tab name="notShown" :label="$t('is_not_shown')" />
        </q-tabs>

        <q-separator />

        <!-- // 1審核中/2通過/3未通過/4取消報名 -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="isShown">
            <!-- 小幫手的table --------------------------------------------------------------------------------->
            <q-table v-if="isHelper" :rows="jobs" :columns="helperColumns" row-key="name" :loading="loading"
              no-data-label="I didn't find anything for you">
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
                    <a :href="'#/jobs/' + props.row.job._id">
                      <q-img :src="props.value" spinner-color="white" style="height: 140px; min-width: 150px" />
                    </a>
                  </div>
                </q-td>
              </template>
              <!-- 職缺名稱 -->
              <template v-slot:body-cell-title="props">
                <q-td :props="props">
                  <div>
                    <a :href="'#/jobs/' + props.row.job._id">
                      {{ props.value }}
                    </a>
                  </div>
                </q-td>

              </template>
              <!-- 業主 -->
              <template v-slot:body-cell-host="props">
                <q-td :props="props">
                  <a :href="'#/hosts/' + props.row.job.host">
                    {{ props.value }}
                  </a>
                </q-td>
              </template>
              <!-- status 報名狀態 -->
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <!-- 1審核中 -->
                  <p v-if="props.value === 1" class="q-mb-none">{{ $t('status_1') }}</p>
                  <!-- 2通過 -->
                  <p v-if="props.value === 2" class="q-mb-none text-teal">{{ $t('status_2') }}</p>
                  <!-- 3未通過 -->
                  <p v-if="props.value === 3" class="q-mb-none"><i class="text-red">{{ $t('status_3') }}</i></p>
                  <!-- 4取消報名 -->
                  <p v-if="props.value === 4" class="q-mb-none text-grey">{{ $t('status_4') }}</p>
                  <!-- 5業主關閉職缺 -->
                  <p v-if="props.value === 5" class="q-mb-none text-grey">{{ $t('status_5') }}</p>
                </q-td>
              </template>
              <!-- cancel 取消報名 -->
              <template v-slot:body-cell-cancel="props">
                <q-td :props="props">
                  <q-btn round flat color="primary" icon="mdi-close-circle-outline" @click="dialog = true"></q-btn>
                  {{ props.row._id }}
                  <q-dialog v-model="dialog" persistent>
                    <div>
                      <q-form @submit.prevent="cancelApply(props.row._id)">
                        <q-card style="min-width: 350px">
                          <q-card-section>
                            <div class="text-h6">{{ $t('are_you_sure') }}</div>
                          </q-card-section>

                          <q-card-actions align="right" class="text-primary">
                            <q-btn padding="sm lg" flat :label="$t('no')" v-close-popup @click="dialog = false" />
                            <q-btn padding="sm lg" color="primary" :label="$t('yes')" v-close-popup type="submit"
                              :loading="loading" />
                          </q-card-actions>
                        </q-card>
                      </q-form>
                    </div>
                  </q-dialog>
                </q-td>
              </template>
              <!-- loading -->
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>
            </q-table>

            <!-- 業主的table --------------------------------------------------------------------------------->
            <q-table v-if="isHost" :rows="jobs" :columns="hostColumns" row-key="name" :loading="loading"
              no-data-label="I didn't find anything for you">
              <template v-slot:body-cell="props">
                <q-td :props="props">
                  {{ props.value }}
                </q-td>
              </template>
              <!-- photos 民宿照片 -->
              <template v-slot:body-cell-photos="props">
                <q-td :props="props">
                  <div>
                    <a :href="'#/jobs/' + props.row.job._id">
                      <q-img :src="props.value" spinner-color="white" style="height: 140px; min-width: 150px" />
                    </a>
                  </div>
                </q-td>
              </template>
              <!-- 職缺名稱 -->
              <template v-slot:body-cell-title="props">
                <q-td :props="props">
                  <div>
                    <a :href="'#/jobs/' + props.row.job._id">
                      {{ props.value }}
                    </a>
                  </div>
                </q-td>
              </template>
              <!-- 小幫手 -->
              <template v-slot:body-cell-helper="props">
                <q-td :props="props">
                  <a :href="'#/helpers/' + props.row.helper._id">
                    {{ props.value }}
                  </a>
                </q-td>
              </template>
              <!-- status 報名狀態 -->
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <!-- 1審核中 -->
                  <p v-if="props.value === 1" class="q-mb-none">{{ $t('status_1') }}</p>
                  <!-- 2通過 -->
                  <p v-if="props.value === 2" class="q-mb-none text-teal">{{ $t('status_2') }}</p>
                  <!-- 3未通過 -->
                  <p v-if="props.value === 3" class="q-mb-none"><i class="text-red">{{ $t('status_3') }}</i></p>
                  <!-- 4取消報名 -->
                  <p v-if="props.value === 4" class="q-mb-none text-grey">{{ $t('status_4') }}</p>
                  <!-- 5業主關閉職缺 -->
                  <p v-if="props.value === 5" class="q-mb-none text-grey">{{ $t('status_5') }}</p>
                </q-td>
              </template>
              <!-- review 審核報名 -->
              <template v-slot:body-cell-review="props">
                <q-td :props="props">
                  <q-btn v-if="props.row.review === 4 ? false : true" round flat color="primary" icon="spellcheck"
                    @click="dialog = true" />
                  <q-dialog v-model="dialog" persistent>
                    <div>
                      <q-form @submit.prevent="apply">
                        <q-card style="min-width: 350px">
                          <q-card-section>
                            <div class="text-h6"> 請選擇審核結果 </div>

                          </q-card-section>
                          <q-card-section>
                            <q-select v-model="form.review" :options="reviewOptions" />
                          </q-card-section>
                          <q-card-actions align="right" class="text-primary">
                            <q-btn padding="sm lg" flat :label="$t('cancel')" v-close-popup @click="dialog = false" />
                            <q-btn padding="sm lg" color="primary" :label="$t('yes')" v-close-popup type="submit"
                              :loading="loading" @click="reviewSubmit(props.row._id)" />
                          </q-card-actions>
                        </q-card>
                      </q-form>
                    </div>
                  </q-dialog>
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
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

import { apiAuth } from '../../boot/axios.js'
import { useUserStore } from 'src/stores/user'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()
const router = useRouter()

const tab = ref('isShown')
const loading = ref(false)
const dialog = ref(false)
const jobs = reactive([])
const form = reactive({
  review: ''
})
const user = useUserStore()
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

const reviewOptions = reactive([
  '錄取', '未錄取'
])
// table head -------------------------------------
const helperColumns = computed(() => {
  return [
    {
      name: 'photos',
      label: '',
      align: 'center',
      field: row => row.job.photos[0]
    },
    {
      name: 'title',
      required: true,
      label: t('job_title'),
      align: 'center',
      field: row => row.job.title,
      sortable: true
    },
    {
      name: 'host',
      required: true,
      label: t('host_name'),
      align: 'center',
      field: row => row.host.name,
      sortable: true
    },
    {
      name: 'job_time',
      align: 'center',
      label: t('job_time'),
      field: row => row.job.date_from + '~' + row.job.date_to,
      sortable: true
    },
    {
      name: 'apply_time',
      align: 'center',
      label: t('apply_time'),
      field: row => row.applied_time,
      sortable: true

    },
    {
      name: 'status',
      align: 'center',
      label: t('application_status'),
      field: row => row.review,
      sortable: true
    },
    {
      name: 'cancel',
      align: 'center',
      label: t('cancel') + t('apply')
    }

  ]
})

const hostColumns = computed(() => {
  return [
    {
      name: 'photos',
      label: '',
      align: 'center',
      field: row => row.job.photos[0]
    },
    {
      name: 'title',
      required: true,
      label: t('job_title'),
      align: 'center',
      field: row => row.job.title,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'helper',
      required: true,
      label: t('name'),
      align: 'center',
      field: row => row.helper.name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'job_time',
      align: 'center',
      label: t('job_time'),
      field: row => row.job.date_from + '~' + row.job.date_to,
      sortable: true
    },
    {
      name: 'apply_time',
      align: 'center',
      label: t('apply_time'),
      field: row => row.applied_time,
      sortable: true

    },
    {
      name: 'status',
      align: 'center',
      label: t('application_status'),
      field: row => row.review,
      sortable: true
    },
    {
      name: 'review',
      align: 'center',
      label: t('review')
    }

  ]
})

const getMyOrders = async () => {
  loading.value = true
  try {
    const { data } = await apiAuth.get('/orders/my_orders')
    console.log(data)
    jobs.push(...data.result)
    // 處理 Date-8 小
    jobs.map(v => {
      v.job.date_from = new Date(v.job.date_from).toLocaleDateString()
      v.job.date_to = new Date(v.job.date_to).toLocaleDateString()
      v.applied_time = new Date(v.applied_time).toLocaleString('zh-TW', { hour12: false })
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
getMyOrders()

const reviewSubmit = async (_id) => {
  try {
    // <!-- 1審核中 / 2通過 / 3未通過 / 4取消報名 / 5履歷關閉 -->
    form._id = _id
    form.review === '錄取' ? form.review = 2 : form.review = 3
    await apiAuth.patch('/orders/host', form)
    Swal.fire({
      icon: 'success',
      title: '成功',
      text: '審核成功'
    })
    router.push('/admin/application_status')
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤!'
    })
  }
}

// 後台還沒寫
const cancelApply = async (_id) => {
  // <!-- 1審核中 / 2通過 / 3未通過 / 4取消報名 / 5履歷關閉 -->
  console.log(_id)
  form._id = _id
  form.review = 4
  console.log(_id)
  try {
    await apiAuth.patch('/orders', form)
    Swal.fire({
      icon: 'success',
      title: '取消成功',
      text: '取消報名'
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
</script>
