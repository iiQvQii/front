<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" to="/">
          </q-avatar>
        </q-toolbar-title>

        <div class="btn q-gutter-sm q-px-md">
          <q-btn v-if="!isLogin" to="/login" flat color="white" icon="fa-solid fa-user" size=".8rem">
            <q-tooltip>
              {{ $t('login') }}
            </q-tooltip>
          </q-btn>
          <q-btn v-if="isAdmin" to="/login" flat color="white" icon="fa-solid fa-chalkboard-user" size=".8rem" />
        </div>
        <q-select id="locale" class="gt-md" v-model="locale" :options="localeOptions" dense borderless emit-value
          map-options options-dense style="min-width: 100px;" />
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
const { isLogin, isAdmin } = storeToRefs(user)

</script>

<style scoped>
</style>
