<template>
  <router-view />
</template>

<script setup>
import { useUserStore } from './stores/user'
import { createApp } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp()
app.component('QuillEditor', QuillEditor)

// localstorage抓使用者資料
useUserStore().getUser()
</script>
