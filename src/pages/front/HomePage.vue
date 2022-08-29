<template>
  <q-page>

    <!-- section_0 上方banner區 ---------------------------------->
    <div id="banner" class="q-pa-none relative-position">
      <q-carousel animated v-model="slide" infinite :autoplay="12000" transition-prev="fade" transition-next="fade"
        transition-duration="3000" height="100%">
        <q-carousel-slide :name="1" img-src="../../assets/banner-1.jpg" />
        <q-carousel-slide :name="2" img-src="../../assets/banner-2.jpg" />
        <q-carousel-slide :name="3" img-src="../../assets/banner-3.jpg" />
      </q-carousel>
      <div class="bg">
        <!-- <img id="logo_face" src="../../assets/logo-face.svg"> -->
      </div>
      <!-- banner區塊內容 -->
      <div id="banner_info" class="flex column flex-center q-mx-auto text-center" data-aos="fade-down">
        <h2 class="q-mb-none text-white">{{  $t('slogan')  }}</h2>
        <!-- logo ----------------------->
        <h1 class="logo text-center">
          <a href="#">Workweee我耶</a>
        </h1>
        <!-- 搜尋導覽按鈕 -->
        <q-btn-group id="search_btn_group" unelevated spread>
          <q-btn color="white" text-color="white" flat :label="$t('search_directly')" />
          <q-btn color="white" text-color="white" flat :label="$t('search_by_location')" @click="openLocationList" />
          <q-btn class="btn_right_none" color="white" text-color="white" flat :label="$t('search_by_time')"
            @click="openTimeList" />
        </q-btn-group>
        <!-- 直接搜尋 -->
        <div id="search">
          <q-input v-model="form.title" standout type="search" maxlength="30" color="dark" bg-color="white"
            :input-style="{ color: '#112B3C', fontSize: '1.1rem' }">
          </q-input>
          <q-btn id="search_btn" color="secondary" icon="search" @click="searchDirectly" />
        </div>

      </div>

    </div>
    <!-- 地區搜尋 -->
    <q-dialog v-model="locationDialog">
      <q-card class="q-ma-sm" style="width: 700px; max-width: 90vw;">
        <q-card-section>
          <h4 class="q-mb-none text-center">{{  $t('search_by_location')  }}</h4>
        </q-card-section>
        <q-separator inset class="q-my-sm" />
        <div class="row flex-center">
          <q-card-section class="q-pt-none col-12 q-gutter-md">
            <q-btn v-for="(city, idx) in cities" :key="idx" :label="city" color="primary" flat
              @click="searchDistrict(city)" />
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>

    <!-- 時間搜尋 -->
    <q-dialog v-model="timeDialog">
      <q-card class="q-ma-sm" style="width: 700px; max-width: 90vw;">
        <q-card-section>
          <h4 class="q-mb-none text-center">{{  $t('search_by_time')  }}</h4>
        </q-card-section>
        <q-separator inset class="q-my-sm" />
        <div class="row flex-center">
          <q-card-section class="q-pt-none col flex flex-center">
            <q-date v-model="form.date" range />
          </q-card-section>
        </div>
        <q-card-section class="q-pt-none col flex flex-center">
          <q-btn class="btn_borderd" :label="$t('search')" flat color="primary" @click="searchTime" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- section_1 找換宿工作/刊登換宿 -->
    <div id="section_1" class="container q-mx-auto section">
      <div class="row ">
        <div class="col-12" data-aos="fade-up">
          <h2 class="q-mb-xl">現在開始行動</h2>
        </div>
      </div>

      <div class="row action_area">
        <div class="col-6" data-aos="flip-left">
          <a href="#/jobs/search" class="flex">
            <div class="action guide_helper flex flex-center">
              <img src="../../assets/guide_helper.svg" />
              <h5>{{  $t('guide_helper')  }}</h5>
            </div>
          </a>

        </div>
        <div class="col-6" data-aos="flip-left">
          <a href="#/admin/jobs" class="flex justify-end">
            <div class="action guide_host flex flex-center">
              <img src="../../assets/guide_host.svg" />
              <h5>{{  $t('guide_host')  }}</h5>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- section_2 換宿優點 -->
    <div id="section_2" class="container q-mx-auto section">
      <div class="row">
        <div class="col" data-aos="fade-up">
          <h2>{{  $t('section_2')  }}</h2>
        </div>
      </div>
      <div class="row">
        <!-- 體驗在地生活 -->
        <div class="col-12 col-md-4" data-aos="fade-up">
          <q-card flat>
            <q-img src="../../assets/section_2_1.jpg" />
            <q-card-section>
              <h5 class="q-ma-none text-center">{{  '體驗在地生活'  }}</h5>
            </q-card-section>
          </q-card>
        </div>
        <!-- 拓展交友圈 -->
        <div class="col-12 col-md-4" data-aos="fade-up">
          <q-card flat>
            <q-img src="../../assets/section_2_2.jpg" />
            <q-card-section>
              <h5 class="q-ma-none text-center">{{  '拓展交友圈'  }}</h5>
            </q-card-section>
          </q-card>
        </div>
        <!-- 低成本旅遊 -->
        <div class="col-12 col-md-4" data-aos="fade-up">
          <q-card flat>
            <q-img src="../../assets/section_2_3.jpg" />
            <q-card-section>
              <h5 class="q-ma-none text-center">{{  '低成本旅遊'  }}</h5>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <!-- section_3 最新換宿 -->
    <div id="section_3">
      <div class="container q-mx-auto section">
        <div class="row">
          <div class="col" data-aos="fade-up">
            <h2>{{  $t('section_3')  }}</h2>
          </div>
        </div>
        <div class="row" data-aos="fade-right">
          <!-- 體驗在地生活 -->
          <div class="col-12">
            <swiper :slidesPerView="3" :spaceBetween="50" :slidesPerGroup="1" :loop="true"
              :loopFillGroupWithBlank="true" :pagination="{
                clickable: true,
              }"
              :breakpoints="{ 320: { slidesPerView: 1, spaceBetween: 20 }, 767: { slidesPerView: 2, spaceBetween: 30 }, 992: { slidesPerView: 3, spaceBetween: 50 } }"
              :navigation="true" :modules="modules" class="mySwiper">
              <swiper-slide v-for="(job, i) in latestJobs" :key="i">
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
                  </q-card-section>
                </q-card>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <!-- section_4 熱門換宿 -->
    <div id="section_4">
      <div class="container q-mx-auto section">
        <div class="row">
          <div class="col" data-aos="fade-up">
            <h2>{{  $t('section_4')  }}</h2>
          </div>
        </div>
        <div class="row" data-aos="fade-left">
          <!-- 體驗在地生活 -->
          <div class="col-12">
            <swiper :slidesPerView="3" :spaceBetween="50" :slidesPerGroup="1" :loop="true"
              :loopFillGroupWithBlank="true" :pagination="{
                clickable: true,
              }"
              :breakpoints="{ 320: { slidesPerView: 1, spaceBetween: 20 }, 767: { slidesPerView: 2, spaceBetween: 30 }, 992: { slidesPerView: 3, spaceBetween: 50 } }"
              :navigation="true" :modules="modules" class="mySwiper">
              <swiper-slide v-for="(job, i) in jobs" :key="i">
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
                  </q-card-section>
                </q-card>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>

    </div>

    <!--  -->
    <!-- banner -->
    <!-- 訂閱電子報 -->

  </q-page>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" icon="arrow_forward" class="rotate-270" />
  </q-page-sticky>

</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useUserStore } from '../../stores/user'
import dataZh from '../../address/data-zh'
import dataEn from '../../address/data-en'
import { apiAuth } from 'src/boot/axios'
import { useRouter } from 'vue-router'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper'

const router = useRouter()
const autoplay = ref(12000)
const slide = ref(1)
// 登入
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

const locationDialog = ref(false)
const timeDialog = ref(false)
const modules = reactive([Pagination, Navigation])
// const swiper = new Swiper('.swiper', {
//   // Default parameters
//   slidesPerView: 1,
//   spaceBetween: 10,
//   // Responsive breakpoints
//   breakpoints: {
//     // when window width is >= 320px
//     320: {
//       slidesPerView: 2,
//       spaceBetween: 20
//     },
//     // when window width is >= 480px
//     480: {
//       slidesPerView: 3,
//       spaceBetween: 30
//     },
//     // when window width is >= 640px
//     640: {
//       slidesPerView: 4,
//       spaceBetween: 40
//     }
//   }
// })
const jobs = reactive([])
const latestJobs = reactive([])

const form = reactive({
  title: '',
  date: {}
})

const cities = reactive(dataZh.counties)

const searchDistrict = (city) => {
  console.log(city)
  // const city = dataZh.counties[idx]
  // /jobs/search?title=&city=' + city + 'district=&welfare
  router.push('/jobs/search?city=' + city)
}
const searchTime = () => {
  if (!form.date.from) return
  const dateFrom = form.date.from.replace(/\//g, '-')
  const dateTo = form.date.to.replace(/\//g, '-')
  router.push('/jobs/search?date_from=' + dateFrom + '&date_to=' + dateTo)
}

const searchDirectly = () => {
  if (!form.title) {
    router.push('/jobs/search')
  } else {
    router.push('/jobs/search?title=' + form.title)
  }
}

const openLocationList = () => {
  locationDialog.value = true
}

const openTimeList = () => {
  timeDialog.value = true
}

const getHotJob = async () => {
  try {
    const { data } = await apiAuth.get('/jobs/hot')
    jobs.push(...data.result)
    jobs.reverse()
    // 處理 Date-8 小 福利陣列 描述去tag
    jobs.map(v => {
      v.date_from = new Date(v.date_from).toLocaleDateString()
      v.date_to = new Date(v.date_to).toLocaleDateString()
      v.description = v.description.replace(/<(?:.|\s)*?>/g, '')
      return v
    })
  } catch (error) {
    console.log(error)
  }
}
getHotJob()

const getLatestJobs = async () => {
  try {
    const { data } = await apiAuth.get('/jobs/latest')
    latestJobs.push(...data.result)
    latestJobs.reverse()
    // 處理 Date-8 小 福利陣列 描述去tag
    latestJobs.map(v => {
      v.date_from = new Date(v.date_from).toLocaleDateString()
      v.date_to = new Date(v.date_to).toLocaleDateString()
      v.description = v.description.replace(/<(?:.|\s)*?>/g, '')
      return v
    })
  } catch (error) {
    console.log(error)
  }
}
getLatestJobs()

</script>
