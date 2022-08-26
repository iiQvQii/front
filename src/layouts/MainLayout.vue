<template>
  <q-layout view="hHh Lpr lff" id="main_layout">
    <q-header reveal class="bg-white text-dark">
      <q-toolbar class="toolbar">
        <!-- 漢堡 --------------------------------------->
        <q-toolbar-title shrink class="flex">
          <q-btn class="lt-lg" flat dense round icon="menu" aria-label="Menu" color="dark" @click="toggleLeftDrawer" />
        </q-toolbar-title>
        <h1 class="logo">
          <a href="#">Workweee我耶</a>
        </h1>
        <q-tabs class="gt-md" shrink stretch align="left">
          <q-route-tab to="/about_us" name="about_us" :label="$t('about_us')" />
          <q-route-tab to="/jobs/search?title=&city=" name="jobs" :label="$t('find_jobs')" />
          <q-route-tab to="/faqs" name="faqs" :label="$t('faqs')" />
          <q-route-tab to="/contact_us" name="contact_us" :label="$t('contact_us')" />
        </q-tabs>
        <q-space />

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

        <!-- 大頭貼 ------------------------------------>
        <q-btn v-if="isLogin" class="gt-md" flat>
          <q-avatar>
            <img :src="avatar">
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item to="/admin" clickable v-close-popup>
                <q-item-section>{{ $t('manage_profile') }}</q-item-section>
              </q-item>
              <q-item to="/admin/application_status" clickable v-close-popup>
                <q-item-section>{{ $t('application_status') }}</q-item-section>
              </q-item>
              <q-item v-if="isHost" to="/admin/jobs" clickable v-close-popup>
                <q-item-section>{{ $t('post_jobs') }}</q-item-section>
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
    <!-- footer -->
    <q-footer class="footer bg-white text-dark container q-mx-auto" bordered>
      <!-- footer內容區 -->
      <div class="row justify-center">
        <div class="col-3 q-pr-lg">
          <a href="#">
            <q-img class="footer_logo" src="../assets/logo.svg" spinner-color="white" />
          </a>
          <div class="q-py-md">
            <q-btn flat round color="dark" icon="fa-brands fa-facebook-f" size=".7rem" />
            <q-btn flat round color="dark" icon="fa-brands fa-twitter" size=".7rem" />
            <q-btn flat round color="dark" icon="fa-brands fa-instagram" size=".7rem" />
          </div>
        </div>
        <!-- 換宿機會 -->
        <div class="col-2  q-pr-lg">
          <h6 class="q-my-md">{{ $t('find_jobs') }}</h6>
          <p>{{ $t('find_jobs') }}</p>
          <p>{{ $t('hot_jobs') }}</p>
          <p>{{ $t('latest_jobs') }}</p>

        </div>
        <!-- 關於我們 -->
        <div class="col-2  q-pr-lg">
          <h6 class="q-my-md">{{ $t('about_work_exchange') }}</h6>
          <p>{{ $t('about_us') }}</p>
          <p>{{ $t('faqs') }}</p>

        </div>
        <!-- 會員中心 -->
        <div class="col-2  q-pr-lg">
          <h6 class="q-my-md">{{ $t('member') }}</h6>
          <p>{{ $t('manage_profile') }}</p>
          <p>{{ $t('check_application_status') }}</p>
          <p>{{ $t('post_jobs') }}</p>
        </div>
        <!-- 幫助 -->
        <div class="col-2  q-pr-lg">
          <h6 class="q-my-md">{{ $t('support') }}</h6>
          <p>{{ $t('terms_of_service') }}</p>
          <p>{{ $t('privacy_policy') }}</p>
          <p>{{ $t('contact_us') }}</p>
        </div>
        <!-- 版權宣告 -->
        <div class="col-12 text-center text-grey q-pt-md">
          {{ $t('copyright') + ' ©' + year + ' Workweee我耶. All rights reserved.' }}
        </div>
      </div>

      <div></div>
    </q-footer>
    <!-- rwd drawer --------------------------------------------------------------------------------------------------------------->
    <q-drawer v-model="leftDrawerOpen" overlay bordered no-swipe-open no-swipe-close class="lt-lg bg-white"
      :breakpiont="767">
      <q-btn class="lt-lg q-py-md" flat icon="fa-solid fa-xmark" aria-label="Menu" color="dark"
        @click="toggleLeftDrawer" />
      <!----------------------------------------------------------- 大頭貼 --------------------------------------------->
      <div v-if="isLogin" class="flex flex-center q-py-lg">
        <q-avatar size="80px">
          <img :src="avatar">
        </q-avatar>
      </div>
      <q-list v-if="isLogin">
        <q-item to="/admin" clickable>
          <q-item-section class="text-h5 text-center text-weight-bold">{{ $t('manage_profile') }}</q-item-section>
        </q-item>
      </q-list>
      <div class="flex flex-center q-py-lg q-gutter-lg">
        <!------------------- 登入/註冊 -------------------------------->
        <q-btn v-if="!isLogin" to="/login" outline rounded size="1rem">
          {{ $t('login') }}
        </q-btn>
        <q-btn v-if="!isLogin" to="/register" outline rounded size="1rem">
          {{ $t('register') }}
        </q-btn>
      </div>
      <q-separator inset />
      <q-list>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" :link="link" />
      </q-list>
      <q-separator inset />
      <q-list>
        <!-- 語言選項 -->
        <q-expansion-item expand-separator icon="translate" :label="t('translate')" class="text-h6">
          <q-list style="min-width: 100px">
            <q-item clickable v-ripple v-for="(localeOption, i) in localeOptions" :key='localeOption.value'
              :value="localeOption.value" v-model="lang" @click="locale = localeOptions[i].value"
              :active="locale === localeOptions[i].value">
              <q-item-section>
                <q-item-label class="text-h6">{{ localeOption.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- 登出 -->
        <q-item v-if="isLogin" clickable tag="a" @click="logout">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-right-from-bracket" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ $t('logout') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn round color="primary" icon="arrow_forward" class="rotate-270" />
      </q-page-sticky>
    </q-page-container>

  </q-layout>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import EssentialLink from 'components/EssentialLink.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 登入
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

let year = ref('')
year = new Date().getFullYear()

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const linksList = reactive([
  {
    title: 'home',
    icon: 'home',
    to: '/',
    font_size: 'text-h5',
    isHost: true
  },
  {
    title: 'about_us',
    icon: 'mdi-face-man',
    to: '/about_us',
    font_size: 'text-h5',
    isHost: true
  },
  {
    title: 'find_jobs',
    icon: 'work',
    to: '/jobs',
    font_size: 'text-h5',
    isHost: true
  },
  {
    title: 'faqs',
    icon: 'mdi-chat-question',
    to: '/faqs',
    font_size: 'text-h5',
    isHost: true
  },
  {
    title: 'contact_us',
    icon: 'mdi-form-select',
    to: '/contact_us',
    font_size: 'text-h5',
    isHost: true
  }
])

const essentialLinks = ref(linksList)

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
