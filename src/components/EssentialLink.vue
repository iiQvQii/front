<template>
  <q-item exact clickable tag="a" :to="link.to">
    <q-item-section v-if="link.icon" avatar>
      <q-icon :name="link.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ t(link.title) }}</q-item-label>
      <q-item-label caption>{{ link.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps([
  'link'
])

</script>
