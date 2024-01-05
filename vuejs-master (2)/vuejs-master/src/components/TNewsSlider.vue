<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import TButton from './TButton.vue'
import NewsSliderCard, { type NewsCardType } from './NewsSliderCard.vue'
import { useI18nStore } from '@@/repository/I18n'
import { Browser_Screens } from '@@/repository/Browser'

const i18n = useI18nStore()

defineProps<{
  /** خبر ها */
  newses: NewsCardType[]
}>()

/** ⁧اطلاعات carousel⁩ */
const carousel = ref()

/** ⁧برای چپ و راست شدن carousel در زبان انگلیسی و فارسی⁩ */
const dir = computed(() => i18n.languageConfig[i18n.currentLanguage].rtl ? 'rtl' : 'ltr')

/** در هر سایز چقدر از اسلاید ها را نمایش دهد */
const breakpoints = {
  // 1024 and up
  1024: {
    itemsToShow: 1.4,
  },
}

/** مدت زمان حرکت اسلاید ها */
const autoplay = ref(2500)

/** رفتن به کارت بعدی */
function next() {
  return carousel.value.next()
}

/** رفتن به کارت قبلی */
function prev() {
  return carousel.value.prev()
}

</script>

<template>
  <div class="flex items-center justify-between mx-auto">
    <TButton
      v-if="carousel"
      :icon="require('@@/assets/icons/tt-arrow-right.svg')"
      :size="Browser_Screens.sm ? 'large' : 'xmedium'"
      color="gray"
      style-type="text"
      btn-corners="curve"
      class="gradient-2 border-none ltr:mirror"
      :action="prev"
    />
    <div class="gradient-2 rounded-48px mx-2 grow pe-1 relative overflow-hidden">
      <Carousel
        ref="carousel"
        :items-to-show="1"
        :wrap-around="true"
        :breakpoints="breakpoints"
        :autoplay="autoplay"
        pause-autoplay-on-hover
        :dir="dir"
      >
        <Slide
          v-for="(news, index) in newses"
          :key="index"
          :card="news"
        >
          <NewsSliderCard v-model="autoplay" :news="news" />
        </Slide>
      </Carousel>
      <div v-if="Browser_Screens.lg" class="absolute w-20% start-0 h-full newsSliderBackground top-0 rtl:mirror pointer-events-none" />
      <div v-if="Browser_Screens.lg" class="absolute w-20% end-0 h-full newsSliderBackground top-0 pointer-events-none" />
    </div>
    <TButton
      v-if="carousel"
      :icon="require('@@/assets/icons/tt-arrow-right.svg')"
      :size="Browser_Screens.sm ? 'large' : 'xmedium'"
      color="gray"
      style-type="text"
      btn-corners="curve"
      class="rtl:mirror gradient-2 border-none"
      :action="next"
    />
  </div>
</template>
