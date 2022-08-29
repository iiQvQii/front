<template>
  <q-page>
    <div id="about_us">
      <div class="main_banner">
        <q-img class="main_banner" src="../../assets/banner-2.jpg" width="100%" height="300px" />
        <div class="bg"></div>
        <h2 class="text-dark text-center">
          {{ $t('about_us') }}
        </h2>
      </div>

      <div class="container q-mx-auto">
        <!-- 麵包屑 -->
        <div class="row q-py-lg">
          <q-breadcrumbs class="col-12">
            <q-breadcrumbs-el exact :label="$t('home')" to="/" />
            <q-breadcrumbs-el exact :label="$t('about_us')" to="/about_us" />
          </q-breadcrumbs>
        </div>
      </div>
      <div class="container q-mx-auto q-pa-md">
        <div class="row justify-center q-pb-xl">
          <div class="col-4">
            <q-img src="../../assets/banner-7.jpg" :ratio="4 / 2.5" />
          </div>
          <div class="col-8">
            <div class="q-pl-md">
              <h3>一群幫助你追尋自我的人</h3>
              <h6>
                Workweee我耶為，是一個希望可以幫助臺灣打工換宿市場更加友善與方便的平台，希望能透過換工的方式達到互助旅遊的目的，用自身的專長與民宿或農場主人交流，進行食宿的交換；每個主人的需求不一，每位換宿者的專長也不一，期待能帶給雙方最大的價值。
              </h6>
            </div>

          </div>
        </div>
        <div class="row justify-center q-py-xl">
          <div class="col-8">
            <div class="q-pr-md">
              <h3>追求生活與工作平衡</h3>
              <h6>Work-Life-Balance!雖然「平衡人生」是當今顯學，但話說回來，你有沒有遇到過一個有趣的人——或說一個充滿激情的人——他是平衡的？想想你自己的經歷。當你覺得最有活力的時候，你能否感到平衡？
                對我們（作者二人）來說，答案是否定的。無論是墜入情網、徒步雪山、撰寫書籍或運動集訓，在這些充實的生活中，我們是完全深陷其中的。就算力圖平衡——將等量的時間和精力投入到其他生活領域中——也會減損我們深刻的體驗。這種感受，我們並不孤單。
              </h6>
            </div>

          </div>
          <div class="col-4">
            <q-img src="../../assets/banner-8.jpg" :ratio="4 / 2.5" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-parallax
              src="https://res.cloudinary.com/dfteusw8m/image/upload/c_fill,g_auto,h_1200,w_1600/v1661749229/banner-6_hnvr6l.jpg"
              :speed=".7" :height="300">
              <h3 class="text-white">Workweee我耶</h3>
            </q-parallax>
          </div>
        </div>
      </div>
    </div>

  </q-page>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" icon="arrow_forward" class="rotate-270" />
  </q-page-sticky>

</template>

<script setup>
import { ref, reactive } from 'vue'

import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'

const autoplay = ref(true)
const slide = ref(1)
// 登入
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, isHost, isHelper, avatar, lang } = storeToRefs(user)

const form = reactive({
  keyword: ''
})

</script>
