<script setup lang="ts">
import TDateTimePicker from '@@/components/TDateTimePicker.vue'
import TInputMobile from '@@/components/TInputMobile.vue'
import TInputSearch from '@@/components/TInputSearch.vue'
import TInputSelect from '@@/components/TInputSelect.vue'
import TInputText from '@@/components/TInputText.vue'
import TInputPassword from '@@/components/TInputPassword.vue'
import TInputCurrency from '@@/components/TInputCurrency.vue'
import TRangeDateTimePicker from '@@/components/TRangeDateTimePicker.vue'
import { TDate } from '@@/repository/Date'
import { Ref } from 'vue'
import TTextarea from '@@/components/TTextarea.vue'
import TInputUploadImage from '@@/components/TInputUploadImage.vue'

const inputValues = ref([
  [0, '', '', 'تست می‌کنیم', '+98', '', '+98', '', '', ''],
  [0, '', '', '', '', '', '', '', '', ''],
] as const)

const myDate = ref<TDate>()
const fromDate2 = ref(TDate.fromJalali(1401, 6, 9, 20, 21, 0)) as Ref<TDate | undefined>
const fromDate3 = ref(TDate.fromJalali(1401, 6, 9, 20, 21, 0)) as Ref<TDate | undefined>
const fromDateTime1 = ref(TDate.fromJalali(1401, 6, 9, 20, 21, 0)) as Ref<TDate | undefined>
const fromDateTime2 = ref(TDate.fromJalali(1401, 6, 9, 20, 21, 0)) as Ref<TDate | undefined>

const fromThisDate = ref(TDate.fromJalali(1401, 4, 5, 17, 14, 0)) as Ref<TDate | undefined>
const toThisDate = ref() as Ref<TDate | undefined>

const fromMyDate = ref(TDate.fromJalali(1401, 11, 5, 17, 14, 0)) as Ref<TDate | undefined>
const toMyDate = ref() as Ref<TDate | undefined>
const amount = ref()

const options1 = [
  {
    value: 'value1',
    text: 'first value',
    icon: require('@icons/b-3-user.svg'),
  },
  {
    value: 'value2',
    text: 'مقدار دوم',
    icon: require('@icons/b-3-user.svg'),
  },
  {
    value: 'value3',
    text: 'third',
    icon: require('@icons/b-3-user.svg'),
  },
]

const options2 = [
  {
    value: 'value1',
    text: 'مقدار اول',
  },
  {
    value: 'value2',
    text: 'مقدار دوم',
  },
  {
    value: 'value3',
    text: 'مقدار سوم',
  },
]

const value1 = ref(options1[1])
const value2 = ref()
const password = ref('')

/** فایل مربوط به اینپوت آپلود تصویر */
const file = ref<Blob>()

</script>

<template>
  <div class="mt-10 px-5 flex flex-col gap-5">
    <div class="flex flex-wrap items-start gap-5">
      <h2 class="@text-h2 w-full">
        <samp class="@bg-black-300 px-2 py-1 rounded-8px" dir="ltr">style-type: 'outlined'</samp>
      </h2>
      <div>
        <TInputCurrency
          v-model="amount"
          label=" مبلغ شارژ"
        />
      </div>
      <TInputPassword
        v-model="password"
        name="password"
        info-text="رمز عبور خود را وارد کنید"
        label="رمز عبور"
        autocomplete="new-password"
      />
      <TInputText
        v-model="inputValues[0][0]"
        name="test"
        info-text="نام و نام خانوادگی خود را وارد کنید"
        label="عنوان فیلد"
      />
      <TInputText
        v-model="inputValues[0][1]"
        name="test"
        append-icon="@icons/tt-3-user.svg"
        info-text="متن کمکی"
        label="عنوان فیلد"
        error="مقدار این فیلد معتبر نیست"
      />
      <TInputSearch
        v-model="inputValues[0][2]"
        name="test"
        info-text="متن کمکی"
        label="جستجو کنید..."
      />
      <TInputText
        v-model="inputValues[0][3]"
        prepend-icon="@icons/tt-setting.svg"
        label="شماره کالا"
        name="test"
        info-text="قابل ویرایش نیست"
        readonly
      />
      <TDateTimePicker
        v-model="myDate"
        label="تاریخ عقد"
        info-text="متن کمکی"
      />
      <TDateTimePicker
        v-model="fromDateTime1"
        timepicker
        label="تاریخ تولد"
        info-text="متن کمکی"
      />
      <TRangeDateTimePicker
        v-model:from="fromThisDate"
        v-model:to="toThisDate"
        class="w-300px"
      />
      <TInputSelect
        v-model="value1"
        label="title"
        :options="options1"
        searchable
        corners="curve"
        disabled
      />
      <div class="flex flex-col">
        <TInputMobile
          v-model:countryCode="inputValues[0][4]"
          v-model:mobile="inputValues[0][5]"
          name="test"
          info-text="شماره موبایل و کد کشور را وارد کنید"
          label="شماره موبایل"
        />
      </div>
      <div class="flex flex-col">
        <TInputMobile
          v-model:countryCode="inputValues[0][6]"
          v-model:mobile="inputValues[0][7]"
          name="test"
          info-text="شماره موبایل و کد کشور را وارد کنید"
          label="شماره موبایل"
          error="شماره موبایل معتبر نیست"
        />
      </div>
      <TTextarea
        v-model="inputValues[0][8]"
        name="test"
        label="توضیحات"
        info-text="توضیحات تستی"
      />
      <TInputUploadImage
        v-model="file"
        title="آپلود لوگو"
        modal-corners="curve"
        class="w-300px"
      />
    </div>
    <div class="flex flex-wrap items-start gap-5">
      <h2 class="@text-h2 w-full">
        <samp class="@bg-black-300 px-2 py-1 rounded-8px" dir="ltr">style-type: 'filled'</samp>
      </h2>
      <TInputCurrency
        v-model="amount"
        label=" مبلغ شارژ"
        style-type="filled"
      />
      <TInputText
        v-model="inputValues[1][0]"
        name="test"
        disabled
        type="number"
        append-icon="@icons/tt-chat.svg"
        style-type="filled"
        info-text="نام و نام خانوادگی خود را وارد کنید"
        label="عنوان فیلد"
      />
      <TInputText
        v-model="inputValues[1][1]"
        name="test"
        append-icon="@icons/tt-chat.svg"
        style-type="filled"
        info-text="نام و نام خانوادگی خود را وارد کنید"
        error="مقدار این فیلد معتبر نیست"
        label="عنوان فیلد"
      />
      <TInputSearch
        v-model="inputValues[1][2]"
        name="test"
        info-text="متن کمکی"
        label="جستجو کنید..."
        style-type="filled"
      />
      <TInputText
        v-model="inputValues[1][3]"
        prepend-icon="@icons/tt-setting.svg"
        label="سلام"
        name="test"
        style-type="filled"
      />
      <TDateTimePicker
        v-model="fromDate2"
        style-type="filled"
        label="تاریخ تولد"
        info-text="متن کمکی"
      />
      <TDateTimePicker
        v-model="fromDateTime2"
        style-type="filled"
        timepicker
        label="تاریخ تولد"
        info-text="متن کمکی"
      />
      <TDateTimePicker
        v-model="fromDate3"
        style-type="filled"
        label="تاریخ تولد"
        info-text="متن کمکی"
      />
      <TRangeDateTimePicker
        v-model:from="fromMyDate"
        v-model:to="toMyDate"
        from-info-text="متن کمکی بخش ۱"
        from-error="مقدار اشتباه"
        to-info-text="متن کمکی بخش دوم"
        style-type="filled"
        class="w-300px"
      />
      <TInputSelect
        v-model="value2"
        style-type="filled"
        label="عنوان فیلد"
        :options="options2"
      />
      <div class="flex flex-col">
        <TInputMobile
          v-model:countryCode="inputValues[1][4]"
          v-model:mobile="inputValues[1][5]"
          name="test"
          info-text="شماره موبایل و کد کشور را وارد کنید"
          label="شماره موبایل"
          style-type="filled"
        />
      </div>
      <div class="flex flex-col">
        <TInputMobile
          v-model:countryCode="inputValues[1][6]"
          v-model:mobile="inputValues[1][7]"
          name="test"
          info-text="شماره موبایل و کد کشور را وارد کنید"
          label="شماره موبایل"
          error="شماره موبایل معتبر نیست"
          style-type="filled"
        />
      </div>
      <TTextarea
        v-model="inputValues[0][9]"
        name="test"
        label="توضیحات"
        info-text="توضیحات تستی"
        style-type="filled"
        :prepend-icon="require('@icons/b-sun.svg')"
      />
    </div>
  </div>
</template>
