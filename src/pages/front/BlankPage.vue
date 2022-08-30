<template>
      <!-- search bar ----------------------------------------------->
      <div class="container q-mx-auto">
        <div class="row">
          <div class="col">
            <div id="job_search_area">
              <div class="row flex-center q-col-gutter-md">
                <!-- 地區 -->
                <div class="col-3">
                  <q-select outlined v-model="form.city" :options="cityOptions" :label="$t('city') + '*'" emit-value
                    lazy-rules bg-color="white" />
                </div>
                <!-- 時間 -->
                <div class="col-3">
                  <q-input outlined v-model="date" :label="$t('job_time')" bg-color="white">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="searchDate.date" range>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <!-- 直接搜尋(title) -->
                <div class="col-5">
                  <q-input v-model="form.title" outlined type="search" maxlength="20" bg-color="white"
                    :label="$t('search')" :input-style="{ color: '#112B3C', fontSize: '1.1rem' }">
                  </q-input>
                </div>
                <div class="col-1">
                  <q-btn id="search_btn" class="full-width" color="primary" icon="search" @click="search" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const search = async () => {
  router.push('/blank')
}
</script>
