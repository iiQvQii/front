<template>
  <router-view />
</template>

<script setup>
import { useUserStore } from './stores/user'
import AOS from 'aos'
import { createApp, ref, provide, nextTick } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'aos/dist/aos.css' // You can also use <link> for styles
// ..
AOS.init({ duration: 1500 })
const app = createApp()
app.component('QuillEditor', QuillEditor)
// const isRouterAlive = ref(true)
// const reload = () => {
//   isRouterAlive.value = false
// }
// localstorage抓使用者資料
useUserStore().getUser()
</script>
