<template>
  <q-page-container>
    <q-page>
      <div class="">
        <div class="row">
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <q-carousel thumbnails animated v-model="slide" arrows infinite :autoplay="autoplay"
                  transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
                  @mouseleave="autoplay = true">
                  <q-carousel-slide v-for="(photo, i) in job.photos" :key="i" :name="i" :img-src="photo" />
                </q-carousel>
              </q-card-section>
              <q-card-section>
                <h3>{{ job.title }}</h3>
                <q-chip v-for="(welfares, i) in job.welfare" :key="i" size=".8rem">{{ $t(welfares) }}
                </q-chip>
              </q-card-section>
              <q-card-section>
                <h5>{{ $t('job_time') }}</h5>
                {{ job.date_from + ' ~ ' + job.date_to }}
                <h5>{{ $t('job_week_hours') }}</h5>
                {{ job.week_hours }}
              </q-card-section>
              <q-card-section>
                <h5>{{ $t('job_description') }}</h5>
                <div v-html="job.description"></div>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn padding="sm lg" size="1rem" color="primary" @click.prevent="openDialog">
                  {{ $t('apply') }}
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <!---------------------------------------- 提問 ------------------------------------------>

      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from 'src/stores/user'
import { apiAuth } from '../../boot/axios'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const user = useUserStore()

const {
  description,
  role,
  isHost,
  isHelper,
  isLogin,
  lang
} = storeToRefs(user)

const job = reactive({
  _id: '',
  host: '',
  title: '',
  city: '',
  district: '',
  address: '',
  zipcode: '',
  date_from: '',
  date_to: '',
  description: '',
  photos: [],
  welfare: [],
  week_hours: '',
  published_time: '',
  is_shown: '',
  question: ''
})
const form = reactive({
  job: '',
  answer: ''
})

const autoplay = ref(true)
const slide = ref(0)
const loading = ref(false)
const dialog = ref(false)
const openDialog = () => {
  if (isLogin.value) {
    dialog.value = true
  } else {
    router.push('/login')
  }
}

// 取小幫手資料
// const getJob = async () => {
//   try {
//     const { data } = await apiAuth.get('/helper/' + route.params.id)
//     job._id = data.result._id
//     job.host = data.result.host
//     job.title = data.result.title
//     job.city = data.result.city
//     job.district = data.result.district
//     job.address = data.result.address
//     job.zipcode = data.result.zipcode
//     job.date_from = new Date(data.result.date_from).toLocaleDateString()
//     job.date_to = new Date(data.result.date_to).toLocaleDateString()
//     job.description = data.result.description
//     job.photos = data.result.photos
//     job.welfare = data.result.welfare[0]?.split(',')
//     job.week_hours = data.result.week_hours
//     job.published_time = data.result.published_time
//     job.question = data.result.question
//     job.is_shown = data.result.is_shown
//   } catch (error) {
//     console.log(error)
//     Swal.fire({
//       icon: 'error',
//       title: '失敗',
//       text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤!'
//     })
//   }
// }
// getJob()

</script>
