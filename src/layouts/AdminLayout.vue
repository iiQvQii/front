<template>
  <q-layout view="hHh Lpr lff" id="admin_layout">
    <q-header elevated class="bg-white text-white">
      <q-toolbar>
        <q-btn class="lt-lg" flat dense round icon="menu" aria-label="Menu" color="dark" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-btn to="/" flat style="width: 200px;">
            <img src="../assets/logo.svg" style="width: 300px;">
          </q-btn>
        </q-toolbar-title>
        <div class="btn q-gutter-sm q-px-md">
          <!--------------------  語言選項 --------------------------------->
          <q-btn class="gt-md" icon="translate" flat color="dark" style="min-width: 30px">
            <q-menu anchor="bottom middle" self="top middle">
              <q-list style="min-width: 100px">
                <q-item-label header>
                  {{ t('translate') }}
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
          <q-btn v-if="isLogin" class="gt-md" icon="fa-solid fa-right-from-bracket" flat color="dark" @click="logout">
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <!-- footer -->
    <q-footer class="footer bg-white text-dark q-mx-auto" bordered>
      <div class="container q-mx-auto">
        <div class="row justify-center">
          <div class="col-12 col-md-4 q-px-lg">
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
          <div class="col-6 col-md-4 col-lg-2 q-px-lg">
            <h6 class="q-my-md">{{ $t('find_jobs') }}</h6>
            <p>{{ $t('all_jobs') }}</p>
            <p>{{ $t('hot_jobs') }}</p>
            <p>{{ $t('latest_jobs') }}</p>

          </div>
          <!-- 關於我們 -->
          <div class="col-6 col-md-4 col-lg-2 q-px-lg">
            <h6 class="q-my-md">{{ $t('about_work_exchange') }}</h6>
            <p>{{ $t('about_us') }}</p>
            <p>{{ $t('faqs') }}</p>

          </div>
          <!-- 會員中心 -->
          <div class="col-6 col-md-8 col-lg-2 q-px-lg member">
            <h6 class="q-my-md">{{ $t('member') }}</h6>
            <p>{{ $t('manage_profile') }}</p>
            <p>{{ $t('check_application_status') }}</p>
            <p>{{ $t('post_jobs') }}</p>
          </div>
          <!-- 幫助 -->
          <div class="col-6 col-md-4 col-lg-2 q-px-lg">
            <h6 class="q-my-md">{{ $t('support') }}</h6>
            <p>{{ $t('terms_of_service') }}</p>
            <p>{{ $t('privacy_policy') }}</p>
            <p>{{ $t('contact_us') }}</p>
          </div>
          <!-- 版權宣告 -->
          <div class="col-12 text-center text-grey q-pt-xl">
            {{ $t('copyright') + ' ©' + year + ' Workweee我耶. All rights reserved.' }}
          </div>
        </div>
      </div>

    </q-footer>
    <!-- drawer 側選單 ------------------------------>
    <q-drawer v-model="leftDrawerOpen">
      <q-btn class="lt-lg" flat icon="fa-solid fa-xmark" aria-label="Menu" color="dark" @click="toggleLeftDrawer" />
      <q-card flat class="text-center q-py-lg">
        <!-- 大頭貼 -->
        <q-card-section>
          <div id="avatar">
            <q-file v-model="myAvatar" label="Pick one file" filled ref="avatarFile"
              @update:model-value="changeAvatar" />
          </div>
          <q-avatar size="5rem">
            <img :src="avatar">
            <q-btn id="camera" round icon="fa-solid fa-camera" color="dark" size=".6rem" @click="openFile" />
          </q-avatar>

        </q-card-section>
        <q-separator inset />

        <q-card-section>
          <div class="text-weight-bold">{{ name }}</div>
          <div>{{ account }}</div>
        </q-card-section>
      </q-card>

      <!-- 選單 -->
      <q-list>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" :link="link" />
      </q-list>
      <q-separator inset />
      <q-list>
        <q-expansion-item class="lt-lg text-h6" expand-separator icon="translate" :label="t('translate')">
          <q-list style="min-width: 100px">
            <q-item clickable v-ripple v-for="(localeOption, i) in localeOptions" :key='localeOption.value'
              :value="localeOption.value" v-model="lang" @click="locale = localeOptions[i].value"
              :active="locale === localeOptions[i].value">
              <q-item-section class="text-h6">
                {{ localeOption.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item class="lt-lg" clickable tag="a" @click="logout">
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
        <q-btn round color="primary" icon="arrow_forward" class="rotate-270" @click="backToTop" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

import { apiAuth } from '../../src/boot/axios.js'
import { useRouter } from 'vue-router'

import { useUserStore } from '../stores/user'

import { useI18n } from 'vue-i18n'
const $q = useQuasar()
const user = useUserStore()
const router = useRouter()

// actions
const { logout, getUser } = user
const {
  name,
  account,
  isLogin,
  isAdmin,
  isHost,
  isHelper,
  avatar,
  lang
} = storeToRefs(user)
const avatarFile = ref(null)

const { t } = useI18n()

const { locale } = useI18n({ useScope: 'global' })
const localeOptions = reactive([
  { value: 'en-US', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' }
])

locale.value = lang.value || useQuasar().lang.getLocale()
lang.value = locale.value

const form = reactive({
  avatar: []
})

let year = ref('')
year = new Date().getFullYear()

const linksList = reactive([
  {
    title: 'my_info',
    icon: 'mdi-face-man',
    to: '/admin',
    isHost: true
  },
  {
    title: 'application_status',
    icon: 'mdi-list-status',
    to: '/admin/application_status',
    isHost: true
  },
  {
    title: 'manage_jobs',
    icon: 'mdi-note-plus',
    to: '/admin/jobs',
    isHost: isHost.value // true

  }
])

const leftDrawerOpen = ref(true)
const essentialLinks = ref(linksList)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

watch(() => locale.value, () => {
  lang.value = locale.value
})

const openFile = () => {
  avatarFile.value.pickFiles()
}

// 更換大頭貼
const changeAvatar = async (val) => {
  $q.loading.show({
    delay: 400
  })
  try {
    form.avatar = val
    const fd = new FormData()
    for (const key in form) {
      if (key === 'avatar') fd.append(key, form[key])
    }
    console.log('ok')
    await apiAuth.patch('/users/avatar', fd)
    Swal.fire({
      icon: 'success',
      title: '成功',
      text: '新增成功'
    })
    getUser()
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
    })
  }
  $q.loading.hide()
}
const backToTop = () => {
  // window.scrollTo(0, 0)
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

</script>
