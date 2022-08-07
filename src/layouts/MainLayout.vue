<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-white text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn to="/" flat style="width: 200px;">
            <img src="../assets/logo.svg" style="width: 300px;">
          </q-btn>
        </q-toolbar-title>

        <div class="btn q-gutter-sm q-px-md">
          <!------------------- 登入/註冊 -------------------------------->
          <q-btn v-if="!isLogin" to="/login" outline rounded>
            {{ $t('login') }}
          </q-btn>
          <q-btn v-if="!isLogin" to="/register" flat rounded color="white">
            {{ $t('register') }}
          </q-btn>
          <!--------------------  語言選項 --------------------------------->
          <q-btn icon="translate" flat color="dark" style="min-width: 30px">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item-label header>
                  {{ $t('manage_profile') }}
                </q-item-label>
                <q-item clickable v-ripple v-for="(localeOption, i) in localeOptions" :key='localeOption.value'
                  :value="localeOption.value" v-model="locale" @click="locale = localeOptions[i].value"
                  :active="locale === localeOptions[i].value">
                  <q-item-section>
                    {{ localeOption.label }}
                  </q-item-section>

                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <!-- <q-btn-dropdown icon="translate" flat>
          <q-list>
            <q-item-label header>
              {{ $t('manage_profile') }}
            </q-item-label>
            <q-item clickable v-ripple :value="localeOptions[0].value" @click="locale = localeOptions[0].value"
              :active="locale === localeOptions[0].value">
              <q-item-section>
                <q-item-label>{{ localeOptions[0].label }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :value="localeOptions[1].value" @click="locale = localeOptions[1].value"
              :active="locale === localeOptions[1].value">
              <q-item-section>
                <q-item-label>{{ localeOptions[1].label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->

        <!-- 大頭貼 -->
        <q-btn v-if="isLogin" flat>
          <q-avatar>
            <img :src="avatar">
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item to="/admin" clickable v-close-popup>
                <q-item-section>{{ $t('manage_profile') }}</q-item-section>
              </q-item>
              <q-item to="/admin" clickable v-close-popup>
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

    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 100]">
        <q-btn round color="primary" icon="arrow_forward" class="rotate-270" />
      </q-page-sticky>
    </q-page-container>

  </q-layout>
</template>
<script setup>
import { reactive } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

import { useI18n } from 'vue-i18n'

// i18n語言
const { locale } = useI18n({ useScope: 'global' })
const localeOptions = reactive([
  { value: 'en-US', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' }
])
locale.value = useQuasar().lang.getLocale()

// 登入
const user = useUserStore()
const { isLogin, isAdmin, isHost, isHelper, avatar } = storeToRefs(user)
const { logout } = user

</script>

<style scoped>
</style>
