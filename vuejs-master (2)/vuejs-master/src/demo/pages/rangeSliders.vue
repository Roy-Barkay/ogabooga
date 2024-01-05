<script setup lang="ts">
import TRangeSlider from '@@/components/TRangeSlider.vue'

const minValue = ref(1655380548188)
const maxValue = ref(1655387748188)

const minNumberValue = ref(0)
const maxNumberValue = ref(100)
</script>

<template>
  <div class="p-3">
    <p class="@text-h2 my-4">
      اسلایدرها
    </p>
    <p class="@text-body">
      توضیحات: دقت شود که اگر نوع اسلایدر از نوع تایم‌استمپ بود حتما باید ورودی‌های min, max, minValue, maxValue باید تایم‌استمپ باشند.
    </p>

    <p class="@text-title my-4">
      ورودی‌ها:
    </p>

    <p><strong>min: </strong>حد پایین مجاز اسلایدر</p>
    <p><strong>max: </strong>حد بالای مجاز اسلایدر</p>
    <p><strong>minValue: </strong>مقدار مینیمم فعلی اسلایدر</p>
    <p><strong>maxValue: </strong>مقدار ماکزیمم فعلی اسلایدر</p>
    <p><strong>رنگ (color): </strong>primary | secondary | tertiary (default: primary)</p>
    <p><strong>نوع (type): </strong>date | number (default: number)</p>

    <p class="@text-title mt-12">
      رنگ: secondary , نوع: date
    </p>
    <TRangeSlider
      v-model:min-value="minValue"
      v-model:max-value="maxValue"
      :min="1655380548188"
      :max="1655387748188"
      :step="1"
      type="date"
      color="secondary"
    />

    <p class="@text-title mt-12">
      رنگ: primary , نوع: date
    </p>
    <TRangeSlider
      v-model:min-value="minValue"
      v-model:max-value="maxValue"
      :min="1655380548188"
      :max="1655387748188"
      :step="1"
      type="date"
      color="primary"
    />

    <p class="@text-title mt-12">
      رنگ: tertiary , نوع: date
    </p>
    <TRangeSlider
      v-model:min-value="minValue"
      v-model:max-value="maxValue"
      :min="1655380548188"
      :max="1655387748188"
      :step="1"
      type="date"
      color="tertiary"
    />

    <p class="@text-title mt-12">
      رنگ: secondary , نوع: number
    </p>
    <TRangeSlider
      v-model:min-value="minNumberValue"
      v-model:max-value="maxNumberValue"
      :min="0"
      :max="100"
      :step="1"
      color="secondary"
    />

    <p class="@text-title mt-12">
      رنگ: primary , نوع: number
    </p>
    <TRangeSlider
      v-model:min-value="minNumberValue"
      v-model:max-value="maxNumberValue"
      :min="0"
      :max="100"
      :step="1"
      color="primary"
    />

    <p class="@text-title mt-12">
      رنگ: tertiary , نوع: number
    </p>
    <TRangeSlider
      v-model:min-value="minNumberValue"
      v-model:max-value="maxNumberValue"
      :min="0"
      :max="100"
      :step="1"
      color="tertiary"
    />
  </div>
</template>
