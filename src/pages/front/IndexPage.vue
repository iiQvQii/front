<template>
  <q-page>
    <div class="q-pa-none relative-position">
      <q-carousel animated v-model="slide" infinite :autoplay="autoplay" transition-prev="fade" transition-next="fade"
        @mouseenter="autoplay = false" @mouseleave="autoplay = true" transition-duration="1200" height="85vh">
        <q-carousel-slide :name="1" img-src="../../assets/banner-1.jpg" />
        <q-carousel-slide :name="2" img-src="../../assets/banner-2.jpg" />
        <q-carousel-slide :name="3" img-src="../../assets/banner-3.jpg" />
      </q-carousel>
      <div class="bg"></div>
      <q-input id="search" v-model="keyword" rounded standout type="search" :placeholder="$t('search')" maxlength="30"
        color="dark" bg-color="white" style="min-width:600px;">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

  </q-page>

</template>

<script setup>
import { ref, reactive, watch } from 'vue'

import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'

import { useI18n } from 'vue-i18n'

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
