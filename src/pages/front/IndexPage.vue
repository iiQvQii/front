<template>
  <q-layout view="hHh Lpr lff">
    <q-header reveal class="text-white">
      <q-toolbar id="toolbar">
        <q-btn class="lt-lg" flat dense round icon="menu" aria-label="Menu" color="white" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-btn to="/" flat style="width: 200px;">
            <img src="../../assets/logo.svg" style="width: 300px;">
          </q-btn>
          <ul class="gt-md">
            <li><a href="#/about_us"> {{ $t('about_us') }}</a></li>
            <li><a href="#/jobs"> {{ $t('find_jobs') }}</a></li>
            <li><a href="#/faqs"> {{ $t('faqs') }}</a></li>
            <li><a href="#/contact_us"> {{ $t('contact_us') }}</a></li>
          </ul>
        </q-toolbar-title>

        <div class="btn q-gutter-sm q-px-md">
          <!------------------- 登入/註冊 -------------------------------->
          <q-btn v-if="!isLogin" to="/login" outline rounded>
            {{ $t('login') }}
          </q-btn>
          <q-btn v-if="!isLogin" to="/register" class="gt-md" flat rounded>
            {{ $t('register') }}
          </q-btn>
          <!--------------------  語言選項 --------------------------------->
          <q-btn class="gt-md" icon="translate" flat color="white" style="min-width: 30px">
            <q-menu anchor="bottom middle" self="top middle">
              <q-list style="min-width: 100px">
                <q-item-label header>
                  {{ $t('translate') }}
                </q-item-label>
                <q-item clickable v-ripple v-for="(localeOption, i) in localeOptions" :key='localeOption.value'
                  :value="localeOption.value" v-model="lang" @click="locale = localeOptions[i].value"
                  :active="locale === localeOptions[i].value">
                  <q-item-section>
                    {{ localeOption.label }}
                  </q-item-section>

                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <!-- 大頭貼 -->
        <q-btn v-if="isLogin" class="gt-md" flat>
          <q-avatar>
            <img :src="avatar">
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item to="/admin" clickable v-close-popup>
                <q-item-section>{{ $t('manage_profile') }}</q-item-section>
              </q-item>
              <q-item to="/admin/jobs" clickable v-close-popup>
                <q-item-section>{{ $t('post_jobs') }}</q-item-section>
              </q-item>
              <q-item to="/admin/application_status" clickable v-close-popup>
                <q-item-section>{{ $t('application_status') }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item @click="logout" clickable v-close-popup>
                <q-item-section>{{ $t('logout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page>
      <div class="q-pa-none">
        <q-carousel animated v-model="slide" infinite :autoplay="autoplay" transition-prev="fade" transition-next="fade"
          @mouseenter="autoplay = false" @mouseleave="autoplay = true" transition-duration="1200" height="85vh">
          <q-carousel-slide :name="1" img-src="../../assets/banner-1.jpg" />
          <q-carousel-slide :name="2" img-src="../../assets/banner-2.jpg" />
          <q-carousel-slide :name="3" img-src="../../assets/banner-3.jpg" />
        </q-carousel>
        <div class="bg"></div>
      </div>
    </q-page>
  </q-layout>

</template>

<script setup>
import { ref, reactive, watch } from 'vue'

import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'

import { useI18n } from 'vue-i18n'

const autoplay = ref(false)
const slide = ref(1)
// 登入
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

// i18n語言
const { locale } = useI18n({ useScope: 'global' })
const localeOptions = reactive([
  { value: 'en-US', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' }
])
locale.value = lang.value || useQuasar().lang.getLocale()
lang.value = locale.value

watch(() => locale.value, () => {
  lang.value = locale.value
})

</script>
