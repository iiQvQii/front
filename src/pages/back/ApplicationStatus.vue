<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 1200px">
      <!-- 小幫手的table ------------------------------------------------------------------------------------------------------------------------------>
      <h3 class="text-center">{{ $t('application_status') }}</h3>
      <q-separator />
      <q-table v-if="isHelper" :rows="jobs" :columns="helperColumns" row-key="name" :loading="loading"
        :grid="$q.screen.lt.md" no-data-label="I didn't find anything for you">
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
                <q-img :src="props.value" spinner-color="white" :ratio="4 / 3" />
              </a>
            </div>
          </q-td>
        </template>
        <!-- 職缺名稱 -->
        <template v-slot:body-cell-title="props">
          <q-td :props="props" :auto-width="false">
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
            <a :href="'#/host/' + props.row.job.host">
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
            <q-btn v-if="props.row.review === 1 ? true : false" round flat color="primary"
              icon="mdi-close-circle-outline" @click="cancelApply(props.row._id)">
            </q-btn>
          </q-td>
        </template>
        <!-- loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>

      <!-- 業主的table ---------------------------------------------------------------------------------------------------------------------------------->
      <q-table v-if="isHost" :rows="jobs" :columns="hostColumns" row-key="name" :loading="loading"
        no-data-label="I didn't find anything for you" :grid="$q.screen.lt.md">
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
        <template v-slot:body-cell-detail="props">
          <q-td :props="props">
            <q-btn round flat color="primary" icon="question_answer"
              @click="showDetail(props.row.helper, props.row.answer)" />
          </q-td>

        </template>
        <!-- review 審核報名 -->
        <template v-slot:body-cell-review="props">
          <q-td :props="props">
            <q-btn v-if="props.row.review === 4 ? false : true" round flat color="primary" icon="spellcheck"
              @click="reviewSubmit(props.row._id)" />
          </q-td>
        </template>
        <!-- loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
      <q-dialog v-model="alert">
        <q-card class="my-card">
          <q-card-section>
            <q-carousel height="250px" padding navigation animated v-model="slide" arrows infinite :autoplay="autoplay"
              transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
              @mouseleave="autoplay = true">
              <q-carousel-slide v-for="(photo, i) in  detail.helper.photos" :key="i" :name="i" :img-src="photo" />
            </q-carousel>
          </q-card-section>
          <q-card-section>
            <div class="text-h6">{{ detail.helper.name }}</div>
          </q-card-section>

          <q-markup-table class="helper_info">
            <tbody>
              <tr>
                <td class="text-left">{{ $t('gender') }}</td>
                <td>{{ t(detail.helper.gender) }}</td>
              </tr>
              <tr>
                <td class="text-left">{{ $t('birth') }}</td>
                <td>{{ detail.helper.birth }}</td>
              </tr>
              <tr>
                <td class="text-left">{{ $t('tel') }}</td>
                <td>{{ detail.helper.tel }}</td>
              </tr>
              <tr>
                <td class="text-left">{{ $t('mobile') }}</td>
                <td>{{ detail.helper.mobile }}</td>
              </tr>
              <tr>
                <td class="text-left">{{ $t('email') }}</td>
                <td>{{ detail.helper.email }}</td>
              </tr>
              <tr>
                <td class="text-left">{{ $t('description') }}</td>
                <td>
                  <span v-html="detail.helper.description">
                  </span>
                </td>
              </tr>
              <tr>
                <td class="text-left">{{ $t('answer') }}</td>
                <td>{{ detail.answer }}</td>
              </tr>
            </tbody>
          </q-markup-table>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>

      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import { apiAuth } from '../../boot/axios.js'
import { useUserStore } from 'src/stores/user'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()
const router = useRouter()
const $q = useQuasar()

const tab = ref('isShown')
const loading = ref(false)
const alert = ref(false)
const autoplay = ref(true)
const slide = ref(0)
const detail = reactive({
  helper: '',
  answer: ''
})

const jobs = reactive([])
const form = reactive({
  review: ''
})
const user = useUserStore()
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

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
      style: 'width: 40px',
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
      field: row => row.job.date_from + '~' + row.job.date_to
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
      name: 'detail',
      align: 'center',
      label: t('helper_info'),
      field: row => row.review
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
      v.applied_time = new Date(v.applied_time).toLocaleDateString()
      v.helper.birth = new Date(v.helper.birth).toLocaleDateString()
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

const showDetail = async (helper, answer) => {
  alert.value = true
  detail.helper = helper
  detail.answer = answer
}

const reviewSubmit = async (_id) => {
  $q.dialog({
    title: t('review_application'),
    style: 'color: #545454; text-align: center;',
    ok: {
      label: t('comfirm'),
      push: false,
      color: 'primary',
      padding: 'sm md'
    },
    cancel: {
      label: t('no'),
      color: 'dark',
      flat: true,
      padding: 'sm md'
    },
    persistent: true,
    options: {
      type: 'radio',
      model: 2,
      items: [
        { label: t('status_2'), value: 2, color: 'positive' },
        { label: t('status_3'), value: 3, color: 'negative' }
      ]
    }
  }).onOk((result) => {
    try {
      form._id = _id
      form.review = result
      apiAuth.patch('/orders/host', form)
      Swal.fire({
        icon: 'success',
        title: '審核成功',
        text: '審核成功'
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
      })
    }
  })
}

const cancelApply = (_id) => {
  //   // <!-- 1審核中 / 2通過 / 3未通過 / 4取消報名 / 5履歷關閉 -->

  $q.dialog({
    title: t('are_you_sure'),
    html: true,
    style: 'color: #545454; text-align: center;',
    ok: {
      label: t('comfirm'),
      push: false,
      color: 'primary',
      padding: 'sm md'
    },
    cancel: {
      label: t('no'),
      push: true,
      color: 'dark',
      flat: true,
      padding: 'sm md'
    },
    persistent: true
  }).onOk(() => {
    try {
      form._id = _id
      form.review = 4
      apiAuth.patch('/orders', form)
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
        text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
      })
    }
  }
  )
}

</script>
