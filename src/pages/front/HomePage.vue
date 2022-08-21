<template>
  <q-page>
    <!-- 上方banner區 ---------------------------------->
    <div id="banner" class="q-pa-none relative-position">
      <q-carousel animated v-model="slide" infinite :autoplay="autoplay" transition-prev="fade" transition-next="fade"
        @mouseenter="autoplay = false" @mouseleave="autoplay = true" transition-duration="1200" height="100%">
        <q-carousel-slide :name="1" img-src="../../assets/banner-1.jpg" style="backdrop-filter: sepia(90%)" />
        <q-carousel-slide :name="2" img-src="../../assets/banner-2.jpg" style="backdrop-filter: sepia(90%)" />
        <q-carousel-slide :name="3" img-src="../../assets/banner-3.jpg" style="backdrop-filter: grayscale(70%);" />
      </q-carousel>
      <div class="bg"></div>
      <!-- banner區塊內容 -->
      <div id="banner_info" class="flex column flex-center q-mx-auto text-center">
        <h3 class="q-mb-none">slogan</h3>
        <h1 class="logo text-center">
          <a href="#">Workweee我耶</a>
        </h1>
        <q-btn-group id="search_btn" unelevated spread>
          <q-btn color="white" text-color="primary" :label="$t('home')" />
          <q-btn color="white" text-color="primary" :label="$t('home')" />
          <q-btn color="white" text-color="primary" :label="$t('home')" />
        </q-btn-group>

        <q-input id="search" v-model="form.keyword" standout type="search" :placeholder="$t('search')" maxlength="30"
          color="dark" bg-color="white">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
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
