<template>
  <!-- lHh Lpr lFf -->
  <q-layout view="lHh Lpr lFf" id="home_layout">
    <q-header reveal class="text-white">
      <q-toolbar>
        <!-- 漢堡 --------------------------------------->
        <q-toolbar-title shrink>
          <q-btn class="lt-lg" flat dense round icon="menu" aria-label="Menu" color="white" @click="toggleLeftDrawer" />

        </q-toolbar-title>
        <q-tabs class="gt-md" shrink stretch align="left">
          <q-route-tab to="/about_us" name="about_us" :label="$t('about_us')" />
          <q-route-tab to="/jobs" name="jobs" :label="$t('find_jobs')" />
          <q-route-tab to="/faqs" name="faqs" :label="$t('faqs')" />
          <q-route-tab to="/contact_us" name="contact_us" :label="$t('contact_us')" />
        </q-tabs>
        <q-space />

        <div class="btn q-gutter-sm q-px-md">
          <!------------------- 登入/註冊 -------------------------------->
          <q-btn v-if="!isLogin" to="/login" class="gt-lg" outline rounded>
            {{ $t('login') }}
          </q-btn>
          <q-btn v-if="!isLogin" to="/register" class="gt-lg" flat rounded>
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

        <!------------------------------------------- 大頭貼 ----------------------------------------------------->
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
    <q-footer bordered>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <!-- rwd drawer --------------------------------------------------------------------------------------------------------------->
    <q-drawer v-model="leftDrawerOpen" overlay bordered class="lt-lg bg-white">
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
    <q-page-container class="home_page_container">
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
