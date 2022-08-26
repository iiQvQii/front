<template>
  <q-page>
    <!-- 上方banner區 ---------------------------------->
    <div id="banner" class="q-pa-none relative-position">
      <q-carousel animated v-model="slide" infinite :autoplay="autoplay" transition-prev="fade" transition-next="fade"
        @mouseenter="autoplay = false" @mouseleave="autoplay = true" transition-duration="3000" height="100%">
        <q-carousel-slide :name="1" img-src="../../assets/banner-1.jpg" />
        <q-carousel-slide :name="2" img-src="../../assets/banner-2.jpg" />
        <q-carousel-slide :name="3" img-src="../../assets/banner-3.jpg" />
      </q-carousel>
      <div class="bg"></div>
      <!-- banner區塊內容 -->
      <div id="banner_info" class="flex column flex-center q-mx-auto text-center">
        <h2 class="q-mb-none text-white">{{ $t('slogan') }}</h2>
        <!-- logo ----------------------->
        <h1 class="logo text-center">
          <a href="#">Workweee我耶</a>
        </h1>
        <!-- 搜尋導覽按鈕 -->
        <q-btn-group id="search_btn_group" unelevated spread>
          <q-btn color="white" text-color="primary" :label="$t('search_directly')" />
          <q-btn outline color="white" text-color="white" :label="$t('search_by_location')" @click="openLocationList" />
          <q-btn outline color="white" text-color="white" :label="$t('search_by_time')" @click="openTimeList" />
        </q-btn-group>
        <!-- search bar -->
        <div id="search">
          <q-input v-model="form.keyword" standout type="search" maxlength="30" color="dark" bg-color="white"
            :input-style="{ color: '#112B3C', fontSize: '1.1rem' }">
          </q-input>
          <q-btn id="search_btn" color="secondary" :label="$t('search')" icon="search" />
        </div>

      </div>
    </div>
    <!-- 地區搜尋 -->
    <q-dialog v-model="locationDialog">
      <q-card style="width: 700px; max-width: 90vw;">
        <q-card-section>
          <h5 class="q-mb-none text-center">{{ $t('search_by_location') }}</h5>
        </q-card-section>
        <q-separator inset class="q-my-md" />
        <div class="row flex-center">
          <q-card-section class="q-pt-none col-12 q-gutter-md ">
            <q-btn v-for="(city, idx) in cities" :key="idx" :label="city" color="primary" flat
              @click="searchDistrict(city)" />
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
    {{ form.district }}

    <!-- 時間搜尋 -->
    <!-- <q-dialog v-model="timeDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <q-option-group :options="districtOptions" type="checkbox" v-model="form.district" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('submit')" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

    <!-- 找換宿工作/刊登換宿 -->
    <!-- 熱門換宿 -->
    <div class="row">
      <div class="col">
        <q-carousel v-model="slide" swipeable animated :control-type="controlType" control-color="purple" navigation
          padding arrows height="300px" class="text-purple rounded-borders">
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md text-center text-black">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md text-center text-black">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center">
            <q-icon name="layers" size="56px" />
            <div class="q-mt-md text-center text-black">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center">
            <q-icon name="terrain" size="56px" />
            <div class="q-mt-md text-center text-black">
              {{ lorem }}
            </div>
          </q-carousel-slide>
        </q-carousel>
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
const autoplay = ref(true)
const slide = ref(1)
// 登入
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

const locationDialog = ref(false)
const timeDialog = ref(false)

const form = reactive({
  keyword: '',
  district: []
})

const cities = reactive(dataZh.counties)

const searchDistrict = (city) => {
  console.log(city)
  // const city = dataZh.counties[idx]
  // /jobs/search?title=&city=' + city + 'district=&welfare
  router.push('/jobs/search?title=&city=' + city)
}

const openLocationList = () => {
  locationDialog.value = true
}

const openTimeList = () => {
  timeDialog.value = true
}
</script>
