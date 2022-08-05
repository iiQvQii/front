<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn to="/">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
          </q-btn>
        </q-toolbar-title>

        <div class="btn q-gutter-sm q-px-md">
          <!-- 登入/註冊 -->
          <q-btn v-if="!isLogin" to="/login" rounded size=".8rem">
            {{ $t('login') }}
          </q-btn>
          <q-btn v-if="!isLogin" to="/register" outline rounded color="white" size=".8rem">
            {{ $t('register') }}
          </q-btn>
        </div>
        <q-btn icon="translate" flat size=".8rem">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item v-close-popup>
                <q-item-section>
                  {{ $t('manage_profile') }}
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup v-for="localeOption in localeOptions" :key='localeOption.value'
                :value="localeOption.value" v-model="locale">
                <q-item-section>
                  {{ localeOption.label }}
                </q-item-section>
                <q-separator />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-select id="locale" class="gt-md" v-model="locale" :options="localeOptions" dense borderless emit-value
          map-options options-dense style="min-width: 100px;" />
        <!-- 大頭貼 -->
        <q-btn v-if="isLogin">
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
