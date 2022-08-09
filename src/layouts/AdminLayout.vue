<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-white text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" color="dark" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-btn to="/" flat style="width: 200px;">
            <img src="../assets/logo.svg" style="width: 300px;">
          </q-btn>
        </q-toolbar-title>
        <div class="btn q-gutter-sm q-px-md">
          <!--------------------  語言選項 --------------------------------->
          <q-btn icon="translate" flat color="dark" style="min-width: 30px">
            <q-menu anchor="bottom middle" self="top middle">
              <q-list style="min-width: 100px">
                <q-item-label header>
                  {{ $t('translate') }}
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
          <q-btn v-if="isLogin" icon="fa-solid fa-right-from-bracket" flat color="dark" @click="logout">
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="280" :mini="miniState"
      @mouseover="miniState = false" @mouseout="miniState = true">
      <q-btn class="lt-lg" flat icon="fa-solid fa-xmark" aria-label="Menu" color="dark" @click="toggleLeftDrawer" />
      <q-card flat class="text-center">
        <q-card-section>
          <q-avatar>
            <img :src="avatar">
          </q-avatar>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="text-weight-bold">{{ name }}</div>
          <div>{{ account }}</div>
        </q-card-section>
      </q-card>

      <q-list>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '../stores/user'

import { useI18n } from 'vue-i18n'
const user = useUserStore()
const { logout } = user
const {
  name,
  account,
  isLogin,
  isAdmin,
  isHost,
  isHelper,
  avatar
} = storeToRefs(user)

const { t } = useI18n()

const { locale } = useI18n({ useScope: 'global' })
const localeOptions = reactive([
  { value: 'en-US', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' }
])

locale.value = useQuasar().lang.getLocale()

const linksList = reactive([
  {
    title: t('my_info'),
    icon: 'mdi-face-man',
    to: '/admin'
  },
  {
    title: t('my_resume'),
    icon: 'mdi-file-account',
    to: '/admin/application_status'
  },
  {
    title: t('application_status'),
    icon: 'mdi-list-status',
    to: '/admin/application_status'
  },
  {
    title: t('post_jobs'),
    icon: 'mdi-note-plus',
    to: '/admin/jobs'
  }
])
const miniState = ref(true)
const leftDrawerOpen = ref(true)
const essentialLinks = ref(linksList)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
