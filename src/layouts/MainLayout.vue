<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          {{ $t('title_1') }}
        </q-toolbar-title>
        <div class="btn q-gutter-sm q-px-md">
          <q-btn flat color="white" icon="fa-solid fa-user-plus" size=".8rem" />
        </div>
        <q-select v-model="locale" :options="localeOptions" dense borderless emit-value map-options options-dense
          style="min-width: 100px;" />
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

import { useI18n } from 'vue-i18n'

// i18n語言
const { locale } = useI18n({ useScope: 'global' })
const localeOptions = reactive([
  { value: 'en-US', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' }
])
locale.value = useQuasar().lang.getLocale()

// 登入

</script>

<style scoped>
</style>
