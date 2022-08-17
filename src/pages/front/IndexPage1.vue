<template>
  <q-page>
    <div class="q-pa-none">
      <q-carousel animated v-model="slide" infinite :autoplay="autoplay" transition-prev="fade" transition-next="fade"
        @mouseenter="autoplay = false" @mouseleave="autoplay = true" transition-duration="1200" height="85vh">
        <q-carousel-slide :name="1" img-src="../../assets/banner-1.jpg" />
        <q-carousel-slide :name="2" img-src="../../assets/banner-2.jpg" />
        <q-carousel-slide :name="3" img-src="../../assets/banner-3.jpg" />
      </q-carousel>
      <div class="bg"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const autoplay = ref(false)
const slide = ref(1)

</script>
