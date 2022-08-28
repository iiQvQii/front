<template>
  <q-page>

    <!-- 上方banner區 ---------------------------------->
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
      <div id="banner_info" class="flex column flex-center q-mx-auto text-center">
        <h2 class="q-mb-none text-white">{{ $t('slogan') }}</h2>
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
        <!-- search bar -->
        <div id="search">
          <q-input v-model="form.keyword" standout type="search" maxlength="30" color="dark" bg-color="white"
            :input-style="{ color: '#112B3C', fontSize: '1.1rem' }">
          </q-input>
          <q-btn id="search_btn" color="secondary" icon="search" />
        </div>

      </div>

    </div>
    <!-- 地區搜尋 -->
    <q-dialog v-model="locationDialog">
      <q-card class="q-ma-sm" style="width: 700px; max-width: 90vw;">
        <q-card-section>
          <h4 class="q-mb-none text-center">{{ $t('search_by_location') }}</h4>
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
          <h4 class="q-mb-none text-center">{{ $t('search_by_time') }}</h4>
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

    <!-- 找換宿工作/刊登換宿 -->
    <div id="guide" class="container q-mx-auto ">
      <div class="row ">
        <div class="col-12">
          <h2 class="q-mb-xl">現在開始行動</h2>
        </div>
      </div>

      <div class="row action_area">
        <div class="col-6">
          <div class="action guide_helper flex column flex-center">
            <img src="../../assets/guide_helper.svg" />
            <h5>{{ $t('guide_helper') }}</h5>
          </div>

        </div>
        <div class="col-6">
          <div class="action guide_host flex column flex-center">
            <img src="../../assets/guide_host.svg" />
            <h5>{{ $t('guide_host') }}</h5>

          </div>

        </div>
      </div>
    </div>

    <!-- 熱門換宿 -->
    <!-- 換宿優點 -->
    <div class="container q-mx-auto">

      <div class="row">
        <div class="col">
          <h2>{{ $t('slogan1') }}</h2>
        </div>
      </div>
      <div class="row">
        <!-- 體驗在地生活 -->
        <div class="col-12 col-md-4">
          <q-card class="my-card" flat>
            <q-card-section>
              <q-img img-class="feature" src="../../assets/7176.jpg" />
            </q-card-section>
            <q-card-section>
              <h5>{{ '體驗在地生活' }}</h5>
            </q-card-section>
          </q-card>
        </div>
        <!-- 拓展交友圈 -->
        <div class="col-12 col-md-4">
          <q-card class="my-card" flat>
            <q-card-section>
              <q-img img-class="feature" src="https://cdn.quasar.dev/img/parallax2.jpg" />
            </q-card-section>
            <q-card-section>
              <h5>{{ '拓展交友圈' }}</h5>
            </q-card-section>
          </q-card>
        </div>
        <!-- 低成本旅遊 -->
        <div class="col-12 col-md-4">
          <q-card class="my-card" flat>
            <q-card-section>
              <q-img img-class="feature" src="https://cdn.quasar.dev/img/parallax2.jpg" />
            </q-card-section>
            <q-card-section>
              <h5>{{ '低成本旅遊' }}</h5>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- 最新換宿 -->
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
import { useUserStore } from '../../stores/user'
import dataZh from '../../address/data-zh'
import dataEn from '../../address/data-en'
import { apiAuth } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const autoplay = ref(12000)
const slide = ref(1)
// 登入
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

const locationDialog = ref(false)
const timeDialog = ref(false)

const form = reactive({
  keyword: '',
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

const openLocationList = () => {
  locationDialog.value = true
}

const openTimeList = () => {
  timeDialog.value = true
}
</script>
