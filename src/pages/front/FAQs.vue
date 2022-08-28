<template>
  <q-page>
    <q-img src="../../assets/banner-5.jpg" width="100%" height="300px">
      <h2 class="text-dark text-center">
        {{ $t('faqs') }}
      </h2>
    </q-img>

    <!-- <q-parallax src="../../assets/banner-4.jpg" :height="250">

    </q-parallax> -->
    <div class="container q-mx-auto">
      <!-- 麵包屑 -->
      <div class="row q-pb-md">
        <q-breadcrumbs class="col-12">
          <q-breadcrumbs-el exact :label="$t('home')" to="/" />
          <q-breadcrumbs-el exact :label="$t('faqs')" to="/faqs" />
        </q-breadcrumbs>
      </div>
      <div class="row faqs">
        <div class="col">
          <q-list bordered class="rounded-borders">
            <q-expansion-item model-value="true" expand-separator icon="mdi-comment-question"
              header-class="text-primary" label="1. 什麼是打工換宿？">
              <q-card>
                <q-card-section>
                  所謂「打工換宿」就是以勞力或是專業技能換取住宿，有些地方還會供應三餐、船票、課程，或是獎勵零用金。
                  <br>
                  「打工換宿」主要分為兩種，一般換宿門檻低，多是勞力活，比如整理環境打掃等。
                  <br>
                  第二種則是門檻較高的「專長換宿」，最常見的工作有攝影、畫畫、行銷，或是擔任翻譯。建議在應徵時提出自己的專長技能，或直接寫在履歷表上，錄取機率會大幅提升。
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item model-value="true" expand-separator icon="mdi-comment-question"
              header-class="text-secondary" label="2. 打工換宿的資格？">
              <q-card>
                <q-card-section>
                  打工換宿沒有年齡限制，不管是高中剛畢業，或是出社會已久的人都能嘗試。
                  <br>
                  且出社會後較難有機會可以深度旅遊，不妨透過這個管道，跳脫舒適圈去認識不同樣貌的人。
                  <br>
                  現在也有許多社會人士在轉換跑道期間去打工換宿，體驗不一樣的人生。
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item model-value="true" expand-separator icon="mdi-comment-question"
              header-class="text-primary" label="3. 打工換宿的優點">
              <q-card>
                <q-card-section>
                  1.省旅費：在台灣住宿費並不便宜，背包客棧一個床位一晚最低也要500元，離島更是700元起跳。打工換宿可以省下住宿費，降低旅行總花費，是不少人省錢的好選擇。
                  <br>
                  2.體驗在地生活：沒有什麼比實際在一個地方長期生活，更能了解當地的方式了。雖然若只有打工換宿兩周或一個月，嚴格來說也不算很長的時間，但與一般觀光客相比，能獲得更深度的旅行體驗，適合嚮往慢節奏旅行步調的人。
                  <br>
                  3.認識更多相同興趣的朋友：有時候，你本身的好朋友可能並不是適合旅行的旅伴，但你在打工換宿能認識的人，多半會是相同理想、愛旅遊、敢挑戰自我、樂於冒險的人。在這裡結交志同道合的朋友，未來還能結伴一起出遊。
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item expand-separator icon="mdi-comment-question" header-class="text-secondary"
              label="4. 打工換宿的缺點">
              <q-card>
                <q-card-section>
                  打工換宿沒有完整的勞健保資格，若是工作途中受傷，並沒有法律的保障，得靠自己本身提前保的保險。
                  <br>
                  有些店家也會表明要投保後才可前往，也是對自己的保障。
                  <br>
                  再來，網路上的店家資訊不一定百分之百正確，絕對要做足功課多方確認。第三點，打工換宿就是去工作，跟平時純旅遊有很大的落差，建議絕對要調整好心態再前往。
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator icon="mdi-comment-question" header-class="text-primary"
              label="5. 打工換宿有哪些職業選擇？">
              <q-card>
                <q-card-section>
                  最常見的工作內容可以分為以下 3 類，另外還有酒吧、路邊攤、露營區、小木屋、衝浪店多種職業可以做選擇。
                  <br>
                  民宿：旅客接待、整理床鋪、打掃房間、公共空間。
                  <br>
                  餐廳：點餐送餐、製作餐點、環境清理和餐具清洗。
                  <br>
                  潛店：接待客人、清洗裝備、跟著教練時間上下班。
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator icon="mdi-comment-question" header-class="text-secondary"
              label=" 6. 台灣打工換宿熱門推薦地點">
              <q-card>
                <q-card-section>
                  1.喜歡陽光、沙灘、大海、海上活動：墾丁、小琉球、花蓮、綠島
                  2.喜歡人文風情濃厚：蘭嶼、金門、馬祖
                  3.喜歡便利性：澎湖、宜蘭
                  4.喜歡山區：南投清境、台北北投
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item icon="mdi-comment-question" header-class="text-primary" label="7. 需要會的技能有什麼？">
              <q-card>
                <q-card-section>
                  想要打工換宿，建議要有駕照比較好。很多地方會需要常常以機車作為代步工具，若是不會騎的話，還需要別人載來載去，就會比較麻煩。且有些小幫手的工作可能會包含接送客人和載送行李的服務，店家可能就會要求必須要有「汽車駕照」。
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </div>

  </q-page>

</template>
