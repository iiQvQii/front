<template>
  <q-layout view="hHh Lpr lff" id="home_layout">
    <q-header reveal class="text-white">
      <q-toolbar>
        <!-- 漢堡 --------------------------------------->
        <q-toolbar-title shrink>
          <q-btn class="lt-lg" flat dense round icon="menu" aria-label="Menu" color="white" @click="toggleLeftDrawer" />

        </q-toolbar-title>
        <q-tabs class="gt-lg" shrink stretch align="left">
          <q-route-tab to="/about_us" name="about_us" :label="$t('about_us')" />
          <q-route-tab to="/jobs" name="jobs" :label="$t('find_jobs')" />
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
    <q-footer bordered>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <!-- rwd drawer --------------------------------->
    <q-drawer v-model="leftDrawerOpen" :width="280" :breakpoint="700" bordered class="bg-grey-3">
      <q-btn class="lt-lg" flat icon="fa-solid fa-xmark" aria-label="Menu" color="dark" @click="toggleLeftDrawer" />
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

import { useI18n } from 'vue-i18n'
// 登入
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

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
