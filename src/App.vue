<template>
  <router-view />
</template>

<script setup>
// localstorage抓使用者資料
import { useUserStore } from './stores/user'
useUserStore().getUser()
</script>
