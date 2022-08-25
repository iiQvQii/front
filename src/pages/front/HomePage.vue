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
          <q-btn outline color="white" text-color="white" :label="$t('search_by_location')" />
          <q-btn outline color="white" text-color="white" :label="$t('search_by_time')" />
        </q-btn-group>
        <!-- search bar -->
        <q-input id="search" v-model="form.keyword" standout type="search" :placeholder="$t('search')" maxlength="30"
          color="dark" bg-color="white">
        </q-input>
        <q-btn id="search_btn" color="secondary" :label="$t('search')" icon="search" />
      </div>
    </div>
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
import { ref, reactive } from 'vue'

import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'

const autoplay = ref(true)
const slide = ref(1)
// 登入
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

const form = reactive({
  keyword: ''
})

</script>
