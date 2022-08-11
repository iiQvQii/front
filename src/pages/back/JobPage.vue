<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 1200px">
      <q-card>
        <q-tabs v-model="tab" class="text-grey q-pa-sm" active-color="primary" indicator-color="primary"
          narrow-indicator align="left">
          <q-tab name="isShown" label="已啟用" />
          <q-tab name="notShown" label="未啟用" />
          <q-btn class="absolute q-ma-lg" flat round color="primary" icon="mdi-plus-circle-outline" style="right: 0;"
            size="1rem" to="/admin/jobs_post" />

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="isShown">
            <q-table :rows="rows" :columns="columns" row-key="name" />
          </q-tab-panel>

          <q-tab-panel name="notShown">

          </q-tab-panel>

        </q-tab-panels>

      </q-card>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { isEmail } from 'validator'
import Swal from 'sweetalert2'
import { useUserStore } from 'src/stores/user'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const { locale } = useI18n({ useScope: 'global' })
const { t } = useI18n()

const tab = ref('isShown')

// table head -------------------------------------
const columns = reactive([
  {
    name: 'name',
    required: true,
    label: '工作名稱',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'calories',
    align: 'center',
    label: '工作時間',
    field: 'calories',
    sortable: true
  },
  {
    name: 'fat',
    label: '地點',
    field: 'fat',
    sortable: true
  },
  {
    name: 'carbs',
    label: '已報名人數',
    field: 'carbs'
  },
  {
    name: 'edit',
    label: '編輯',
    field: 'edit'
  },
  {
    name: 'delete',
    label: '刪除',
    field: 'delete'
  }
])

// 內容 -------------------------------
const rows = reactive([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    edit: 4.0,
    delete: 87
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    edit: 4.3,
    delete: 129
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    edit: 6.0,
    delete: 337
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    edit: 4.3,
    delete: 413
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    edit: 3.9,
    delete: 327
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    edit: 0.0,
    delete: 50
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    edit: 0,
    delete: 38
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    edit: 6.5,
    delete: 562
  }
])
</script>
