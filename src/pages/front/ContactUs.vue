<template>
  <q-page>
    <div id="contact_us">
      <div class="main_banner">
        <q-img class="main_banner" src="../../assets/banner-2.jpg" width="100%" height="300px" />
        <div class="bg"></div>
        <h2 class="text-dark text-center">
          {{ $t('contact_us') }}
        </h2>
      </div>
      <!-- 麵包屑 -->
      <div class="container q-mx-auto">
        <div class="row q-py-lg">
          <q-breadcrumbs class="col-12">
            <q-breadcrumbs-el exact :label="$t('home')" to="/" />
            <q-breadcrumbs-el exact :label="$t('contact_us')" to="/contact_us" />
          </q-breadcrumbs>
        </div>
      </div>
      <!-- 內容 -->
      <div class="container q-mx-auto q-pa-md">
        <div class="row">
          <div class="col-12 col-lg-7">
            <div class="q-pt-xl">
              <h3 class="text-secondary">GET IN <br> TOUCH <br> WITH US</h3>
              <h4 class="text-primary">{{ $t('send_us') }}</h4>
              <h6 class="q-my-sm">{{ $t('contact_info') }}</h6>
              <h6 class="q-my-sm">workweee-service@gmail.com</h6>
            </div>
          </div>
          <!-- 表格 -->
          <div class="col-12 col-lg-5">
            <div class="q-mx-auto">
              <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false"
                @submit.prevent="submit">
                <div class="row flex-center">
                  <!-- 姓名 -->
                  <div class="col-12">
                    <h5>{{ $t('name') }}</h5>
                  </div>
                  <div class="col-12">
                    <q-input outlined v-model="form.name" :rules="rules.required" dense />
                  </div>
                  <!-- email -->
                  <div class="col-12">
                    <h5>{{ $t('email') }}</h5>
                  </div>
                  <div class="col-12">
                    <q-input v-model="form.email" outlined :hint="$t('contact_email')" />
                  </div>
                  <!-- email -->
                  <div class="col-12">
                    <h5>{{ $t('message') }}</h5>
                  </div>
                  <div class="col-12">
                    <q-input v-model="form.message" outlined type="textarea" :hint="$t('contact_message')" />
                  </div>
                  <div class="col-6 flex flex-center">
                    <!-- 送出 -->
                    <q-btn class="q-my-xl" color="primary" :label="$t('submit')" type="submit" :loading="loading" />
                  </div>
                </div>

              </q-form>
            </div>
          </div>

        </div>
      </div>

    </div>

  </q-page>

</template>
<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const rules = reactive({
  required: [
    v => !!v || t('required')
  ]
})

const form = reactive({
  title: '',
  question: ''
})
</script>
