<script setup lang="ts">
import { BaseInput_CommonProps } from '@@/components/base/BaseInput.vue'
import BaseInput from './base/BaseInput.vue'
import { Calendar, TDate } from '@@/repository/Date'
import { useVModel } from '@vueuse/core'
import TButton from './TButton.vue'
import TIcon from './TIcon.vue'
import { BrowserSource_Screens } from '@@/datasource/browser/BrowserSource'
import TModal from './TModal.vue'
import { useTranslation } from '@@/hooks/useTranslation'
import { PropType, Ref } from 'vue'

const __ = useTranslation()

const props = defineProps({
  ...BaseInput_CommonProps,
  modelValue: {
    type: Object as PropType<TDate | null>,
    required: false,
    default: undefined,
  },
  calendar: {
    type: String as PropType<Calendar>,
    default: 'jalali',
  },
  timepicker: {
    type: Boolean,
    default: false,
  },
})

defineEmits<{
  (event: 'update:modelValue', payload: TDate): void
}>()

const YEAR_BOUND_DOWN_LIMIT = props.calendar === 'jalali' ? 1325 : 1950
const YEAR_BOUND_UP_LIMIT = props.calendar === 'jalali' ? 1449 : 2049

const modelValue = useVModel(props, 'modelValue') as Ref<TDate | undefined>

const isModalOpen = ref(false)

const mode = ref<'pickDay' | 'pickMonth' | 'pickYear'>('pickDay')

const currentDate = TDate.fromJalali()

const selectedDate = ref<TDate>(TDate.fromTimestamp(modelValue.value?.timestamp || currentDate.timestamp))

const inputValue = computed(() => {
  return modelValue.value ? modelValue.value.toString(props.calendar, props.timepicker) : ''
})

const selectedYear = computed({
  set(value: number) {
    if (props.calendar === 'jalali') {
      selectedDate.value.jYear = value
    } else {
      selectedDate.value.gYear = value
    }
  },
  get(): number {
    return props.calendar === 'jalali' ? selectedDate.value.jYear : selectedDate.value.gYear
  },
})

const selectedMonth = computed({
  set(value: number) {
    if (props.calendar === 'jalali') {
      selectedDate.value.jMonth = value
    } else {
      selectedDate.value.gMonth = value
    }
  },
  get(): number {
    return props.calendar === 'jalali' ? selectedDate.value.jMonth : selectedDate.value.gMonth
  },
})

const selectedDay = computed({
  set(value: number) {
    if (props.calendar === 'jalali') {
      selectedDate.value.jDay = value
    } else {
      selectedDate.value.gDay = value
    }
  },
  get(): number {
    return props.calendar === 'jalali' ? selectedDate.value.jDay : selectedDate.value.gDay
  },
})

const selectedHour = computed({
  set(value: number) {
    selectedDate.value.hour = value
  },
  get(): number {
    return selectedDate.value.hour
  },
})

const selectedMinute = computed({
  set(value: number) {
    selectedDate.value.minute = value
  },
  get(): number {
    return selectedDate.value.minute
  },
})

const boundDown = ref(getYearBoundDown())
const boundUp = computed(() => boundDown.value + 24)

/**
 * @description حد پایین سال‌ها در مود انتخاب سال را برمی‌گرداند
 */
function getYearBoundDown() {
  const mod = selectedYear.value % 25
  return selectedYear.value - mod
}

const forbidPrevRange = () => boundDown.value === YEAR_BOUND_DOWN_LIMIT
const forbidNextRange = () => boundUp.value === YEAR_BOUND_UP_LIMIT
const forbidPrevYear = () => selectedYear.value === YEAR_BOUND_DOWN_LIMIT
const forbidNextYear = () => selectedYear.value === YEAR_BOUND_UP_LIMIT
const forbidPrevMonth = () => selectedMonth.value === 1
const forbidNextMonth = () => selectedMonth.value === 12
const forbidNextHour = () => selectedHour.value === 23
const forbidPrevHour = () => selectedHour.value === 0
const forbidNextMinute = () => selectedMinute.value === 59 && selectedHour.value === 23
const forbidPrevMinute = () => selectedMinute.value === 0 && selectedHour.value === 0

const years = computed(() => {
  const result: TDate[] = []
  if (props.calendar === 'jalali') {
    for (let i = boundDown.value; i <= boundUp.value; i++) result.push(TDate.fromJalali(i, 1, 1, 0, 0, 0))
  } else {
    for (let i = boundDown.value; i <= boundUp.value; i++) result.push(TDate.fromGregorian(i, 1, 1, 0, 0, 0))
  }
  return result
})

const months = computed(() => {
  const months: TDate[] = []
  for (let i = 1; i <= 12; i++) {
    months.push(TDate.fromJalali(selectedYear.value, i, 1, 0, 0, 0))
  }
  return months
})

const days = computed(() => {
  const days: TDate[] = []
  const count = selectedDate.value.getMonthDaysCount(props.calendar)
  if (props.calendar === 'jalali') {
    for (let i = 1; i <= count; i++) {
      days.push(TDate.fromJalali(selectedYear.value, selectedMonth.value, i, 0, 0, 0))
    }
  } else {
    for (let i = 1; i <= count; i++) {
      days.push(TDate.fromGregorian(selectedYear.value, selectedMonth.value, i, 0, 0, 0))
    }
  }
  return days
})

const weekDayOfCurrentMonthFirstDay = computed(() => selectedDate.value.getWeekdayOfFirstDayOfMonth(props.calendar))

const emptyCellBefore = computed(() => weekDayOfCurrentMonthFirstDay.value)

watch(days, value => {
  if (selectedDay.value > value.length) {
    selectedDay.value = value.length
  }
})

watch(isModalOpen, value => {
  if (!value) {
    mode.value = 'pickDay'
    if (props.calendar === 'jalali') {
      selectedDay.value = modelValue.value?.jDay || currentDate.jDay
      selectedMonth.value = modelValue.value?.jMonth || currentDate.jMonth
      selectedYear.value = modelValue.value?.jYear || currentDate.jYear
    } else {
      selectedDay.value = modelValue.value?.gDay || currentDate.gDay
      selectedMonth.value = modelValue.value?.gMonth || currentDate.gMonth
      selectedYear.value = modelValue.value?.gYear || currentDate.gYear
    }
    selectedHour.value = modelValue.value?.hour || currentDate.hour
    selectedMinute.value = modelValue.value?.minute || currentDate.minute
  }
})

/**
 * @description مقدار اختصار روز هفته را می‌دهد
 */
function getWeekdayAbbreviation(weekday: number): string {
  if (props.calendar === 'jalali') {
    return TDate.JALALI_WEEKDAYS[weekday].substring(0, 1)
  } else {
    return TDate.GREGORIAN_WEEKDAYS[weekday].substring(0, 3)
  }
}

function openModal() {
  isModalOpen.value = true
}

function handleChangeYearRange(mode: 'increase' | 'decrease'): void {
  if (mode === 'increase') boundDown.value += 25
  else if (mode === 'decrease') boundDown.value -= 25
}

function handleChangeYear(mode: 'increase' | 'decrease'): void {
  if (mode === 'increase') {
    if (props.calendar === 'jalali') {
      selectedDate.value.jYear++
    } else {
      selectedDate.value.gYear++
    }
  } else if (mode === 'decrease') {
    if (props.calendar === 'jalali') {
      selectedDate.value.jYear--
    } else {
      selectedDate.value.gYear--
    }
  }
}

function gotoToday() {
  if (props.calendar === 'jalali') {
    selectedDate.value.jYear = currentDate.jYear
    selectedDate.value.jMonth = currentDate.jMonth
    selectedDate.value.jDay = currentDate.jDay
  } else {
    selectedDate.value.gYear = currentDate.gYear
    selectedDate.value.gMonth = currentDate.gMonth
    selectedDate.value.gDay = currentDate.gDay
  }
  boundDown.value = getYearBoundDown()
}

function selectYear(date: TDate) {
  if (props.calendar === 'jalali') {
    selectedYear.value = date.jYear
  } else {
    selectedYear.value = date.gYear
  }
  mode.value = 'pickMonth'
}

function selectMonth(date: TDate) {
  if (props.calendar === 'jalali') {
    selectedMonth.value = date.jMonth
  } else {
    selectedMonth.value = date.gMonth
  }
  mode.value = 'pickDay'
}

function selectDay(date: TDate) {
  if (props.calendar === 'jalali') {
    selectedDay.value = date.jDay
  } else {
    selectedDay.value = date.gDay
  }
}

function isCurrentDay(date: TDate) {
  if (props.calendar === 'jalali' && date.jYear === currentDate.jYear && date.jMonth === currentDate.jMonth && date.jDay === currentDate.jDay) {
    return true
  } else if (props.calendar === 'gregorian' && date.gYear === currentDate.gYear && date.gMonth === currentDate.gMonth && date.gDay === currentDate.gDay) {
    return true
  }
  return false
}

function isCurrentMonth(date: TDate) {
  if (props.calendar === 'jalali' && date.jYear === currentDate.jYear && date.jMonth === currentDate.jMonth) {
    return true
  } else if (props.calendar === 'gregorian' && date.gYear === currentDate.gYear && date.gMonth === currentDate.gMonth) {
    return true
  }
  return false
}

function isCurrentYear(date: TDate) {
  if (props.calendar === 'jalali' && date.jYear === currentDate.jYear) {
    return true
  } else if (props.calendar === 'gregorian' && date.gYear === currentDate.gYear) {
    return true
  }
  return false
}

function isSelectedDay(date: TDate) {
  if (props.calendar === 'jalali' && selectedYear.value === date.jYear && selectedMonth.value === date.jMonth && selectedDay.value === date.jDay) {
    return true
  } else if (props.calendar === 'gregorian' && selectedYear.value === date.gYear && selectedMonth.value === date.gMonth && selectedDay.value === date.gDay) {
    return true
  }
  return false
}

function isSelectedMonth(date: TDate) {
  if (props.calendar === 'jalali' && selectedYear.value === date.jYear && selectedMonth.value === date.jMonth) {
    return true
  } else if (props.calendar === 'gregorian' && selectedYear.value === date.gYear && selectedMonth.value === date.gMonth) {
    return true
  }
  return false
}

function isSelectedYear(date: TDate) {
  if (props.calendar === 'jalali' && selectedYear.value === date.jYear) {
    return true
  } else if (props.calendar === 'gregorian' && selectedYear.value === date.gYear) {
    return true
  }
  return false
}

function handleIncreaseMinute() {
  if (selectedMinute.value === 59) {
    selectedMinute.value = 0
    selectedHour.value++
  } else {
    selectedMinute.value++
  }
}

function handleDecreaseMinute() {
  if (selectedMinute.value === 0) {
    selectedMinute.value = 59
    selectedHour.value--
  } else {
    selectedMinute.value--
  }
}

async function handleSubmit() {
  if (!modelValue.value) {
    modelValue.value = TDate.fromJalali()
    await nextTick()
  }
  if (props.calendar === 'jalali') {
    modelValue.value.jYear = selectedYear.value
    modelValue.value.jMonth = selectedMonth.value
    modelValue.value.jDay = selectedDay.value
  } else {
    modelValue.value.gYear = selectedYear.value
    modelValue.value.gMonth = selectedMonth.value
    modelValue.value.gDay = selectedDay.value
  }

  if (props.timepicker) {
    modelValue.value.hour = selectedHour.value
    modelValue.value.minute = selectedMinute.value
  }

  isModalOpen.value = false
}

</script>

<template>
  <div v-bind="$attrs">
    <BaseInput
      v-bind="props"
      :model-value="inputValue"
      append-icon="@icons/tt-calendar.svg"
      :show-reset-button="false"
      text-center
      input-direction="ltr"
      cursor-pointer
      readonly
      @click="openModal"
    />
  </div>
  <TModal v-model="isModalOpen">
    <div
      class="w-full select-none p-4"
      :class="{
        '[direction:ltr] [font-family:iranyekan-latin]': calendar === 'gregorian',
      }"
    >
      <div class="flex justify-center items-center relative">
        <h2 class="@text-h2 font-extrabold tracking-tight">
          {{ __('tsitfy.choose-time') }}
        </h2>
        <TIcon class="w-6 cursor-pointer absolute end-0 @text-secondary-500 sm:w-8" src="@icons/tt-refresh.svg" @click="gotoToday()" />
      </div>
      <div v-if="mode === 'pickDay'" class="mt-5">
        <div class="flex items-center justify-between">
          <div class="w-1/2 flex items-center justify-between border-2 border-solid @border-black-300 h-11 px-10px rounded-2xl sm:h-14">
            <button
              class="bg-transparent border-none w-6 h-6 sm:(w-7 h-7)"
              :disabled="forbidPrevMonth()"
              :class="{ 'opacity-30 cursor-not-allowed': forbidPrevMonth() }"
              @click="selectedMonth--"
            >
              <TIcon class="@text-primary-500" src="@icons/b-arrow-circle-right.svg" />
            </button>
            <div class="@text-title cursor-pointer" @click="mode = 'pickMonth'">
              {{ selectedDate.getMonthString(calendar) }}
            </div>
            <button
              class="bg-transparent border-none w-6 h-6 sm:(w-7 h-7)"
              :disabled="forbidNextMonth()"
              :class="{ 'opacity-30 cursor-not-allowed': forbidNextMonth() }"
              @click="selectedMonth++"
            >
              <TIcon class="rotate-180 @text-primary-500" src="@icons/b-arrow-circle-right.svg" />
            </button>
          </div>
          <div class="w-1px h-7 @bg-black-700/20 mx-4" />
          <div class="w-1/2 flex items-center justify-between border-2 border-solid @border-black-300 h-11 px-10px rounded-2xl sm:h-14">
            <button
              class="bg-transparent border-none w-6 h-6 sm:(w-7 h-7) cursor-pointer"
              :disabled="forbidPrevYear()"
              :class="{ 'opacity-30 cursor-not-allowed': forbidPrevYear() }"
              @click="selectedYear--"
            >
              <TIcon class="@text-primary-500" src="@icons/b-arrow-circle-right.svg" />
            </button>
            <div class="@text-title cursor-pointer" @click="mode = 'pickYear'">
              {{ selectedYear }}
            </div>
            <button
              class="bg-transparent border-none w-6 h-6 sm:(w-7 h-7) cursor-pointer"
              :disabled="forbidNextYear()"
              :class="{ 'opacity-30 cursor-not-allowed': forbidNextYear() }"
              @click="selectedYear++"
            >
              <TIcon class="rotate-180 @text-primary-500" src="@icons/b-arrow-circle-right.svg" />
            </button>
          </div>
        </div>
        <div class="grid grid-cols-7 grid-rows-7 items-center mt-5 gap-y-1">
          <div v-for="weekDay in 7" :key="weekDay" class="h-10 w-10 mx-auto @text-title @flex-center">
            {{ getWeekdayAbbreviation(weekDay - 1) }}
          </div>
          <div v-for="i in emptyCellBefore" :key="i" />
          <div
            v-for="(date, index) in days"
            :key="index"
            class="h-10 w-10 mx-auto cursor-pointer rounded-45% @text-body @flex-center border-2 border-solid border-transparent"
            :class="{
              '@border-tertiary-500 @bg-tertiary-500 @text-black-50': isCurrentDay(date) && !isSelectedDay(date),
              '@border-black-500': isSelectedDay(date) && !isCurrentDay(date),
              '@bg-tertiary-500 @text-black-50 @border-black-500': isCurrentDay(date) && isSelectedDay(date),
            }"
            @click="selectDay(date)"
          >
            {{ props.calendar === 'jalali' ? date.jDay : date.gDay }}
          </div>
        </div>
      </div>
      <div v-else-if="mode === 'pickMonth'" class="mt-5">
        <div class="grow flex items-center justify-between border-2 border-solid @border-black-300 px-4 h-11 rounded-2xl sm:h-14">
          <button
            class="bg-transparent border-none w-6 w-6 sm:(w-7 h-7)"
            :disabled="forbidPrevYear()"
            :class="{ 'opacity-30 cursor-not-allowed': forbidPrevYear() }"
            @click="handleChangeYear('decrease')"
          >
            <TIcon class="@text-primary-500" src="@icons/b-arrow-circle-right.svg" />
          </button>
          <div class="@text-title cursor-pointer" @click="mode = 'pickYear'">
            {{ selectedYear }}
          </div>
          <button
            class="bg-transparent border-none w-6 w-6 sm:(w-7 h-7)"
            :disabled="forbidNextYear()"
            :class="{ 'opacity-30 cursor-not-allowed': forbidNextYear() }"
            @click="handleChangeYear('increase')"
          >
            <TIcon class="rotate-180 @text-primary-500" src="@icons/b-arrow-circle-right.svg" />
          </button>
        </div>
        <div class="grid grid-cols-3 mt-5 gap-3">
          <div
            v-for="(date, index) in months"
            :key="index"
            class="h-10 sm:h-14 cursor-pointer rounded-45px font-bold flex justify-center items-center border-2 border-solid border-transparent @text-body"
            :class="{
              '@border-tertiary-500 @bg-tertiary-500 @text-black-50': isCurrentMonth(date),
              '@border-black-500': isSelectedMonth(date),
            }"
            @click="selectMonth(date)"
          >
            {{ date.getMonthString(calendar) }}
          </div>
        </div>
      </div>
      <div v-else-if="mode === 'pickYear'" class="mt-5">
        <div class="grow flex items-center justify-between border-2 border-solid @border-black-300 px-4 h-11 rounded-2xl sm:h-14">
          <button
            class="bg-transparent border-none w-6 h-6 sm:(w-7 h-7)"
            :class="{ 'opacity-30 cursor-not-allowed': forbidPrevRange() }"
            :disabled="forbidPrevRange()"
            @click="handleChangeYearRange('decrease')"
          >
            <TIcon class="@text-primary-500" src="@icons/b-arrow-circle-right.svg" />
          </button>
          <div class="@text-title" dir="ltr">
            <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
            {{ boundDown }} - {{ boundUp }}
          </div>
          <button
            class="bg-transparent border-none w-6 h-6 sm:(w-7 h-7)"
            :class="{ 'opacity-30 cursor-not-allowed': forbidNextRange() }"
            :disabled="forbidNextRange()"
            @click="handleChangeYearRange('increase')"
          >
            <TIcon class="rotate-180 @text-primary-500" src="@icons/b-arrow-circle-right.svg" />
          </button>
        </div>
        <div class="grid grid-cols-5 justify-items-center gap-1 mt-5">
          <div
            v-for="(date, index) in years"
            :key="index"
            class="w-10 h-10 cursor-pointer rounded-45% font-bold flex justify-center items-center border-2 border-solid border-transparent @text-body"
            :class="{
              '@border-tertiary-500 @bg-tertiary-500 @text-black-50': isCurrentYear(date),
              '@border-black-500': isSelectedYear(date),
            }"
            @click="selectYear(date)"
          >
            {{ props.calendar === 'jalali' ? date.jYear : date.gYear }}
          </div>
        </div>
      </div>
      <div v-if="timepicker && mode === 'pickDay'" dir="ltr" class="mt-5 flex items-center justify-between">
        <div class="rounded-2xl border-2 @border-black-300 w-1/2 h-11 px-10px flex items-center justify-between sm:h-14">
          <button
            class="rotate-90 bg-transparent border-none w-6 h-6 sm:(w-7 h-7)"
            :disabled="forbidPrevHour()"
            :class="{ 'opacity-30 cursor-not-allowed': forbidPrevHour() }"
            @click="selectedHour--"
          >
            <TIcon class="@text-primary-500" src="@icons/b-arrow-circle-right.svg" />
          </button>
          <div class="flex flex-col items-center">
            <span class="@text-title">{{ selectedHour.toString().padStart(2, '0') }}</span>
            <span class="@text-black-600 @text-overline">{{ __('tsitfy.hour') }}</span>
          </div>
          <button
            class="-rotate-90 bg-transparent border-none w-6 h-6 sm:(w-7 h-7)"
            :disabled="forbidNextHour()"
            :class="{ 'opacity-30 cursor-not-allowed': forbidNextHour() }"
            @click="selectedHour++"
          >
            <TIcon class="@text-primary-500" src="@icons/b-arrow-circle-right.svg" />
          </button>
        </div>
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        <span class="mx-4 font-extrabold">:</span>
        <div class="rounded-2xl border-2 @border-black-300 w-1/2 h-11 px-10px flex items-center justify-between sm:h-14">
          <button
            class="rotate-90 bg-transparent border-none w-6 h-6 sm:(w-7 h-7)"
            :disabled="forbidPrevMinute()"
            :class="{ 'opacity-30 cursor-not-allowed': forbidPrevMinute() }"
            @click="handleDecreaseMinute()"
          >
            <TIcon class="@text-primary-500" src="@icons/b-arrow-circle-right.svg" />
          </button>
          <div class="flex flex-col items-center">
            <span class="@text-title">{{ selectedMinute.toString().padStart(2, '0') }}</span>
            <span class="@text-black-600 @text-overline">{{ __('tsitfy.minute') }}</span>
          </div>
          <button
            class="-rotate-90 bg-transparent border-none w-6 h-6 sm:(w-7 h-7)"
            :disabled="forbidNextMinute()"
            :class="{ 'opacity-30 cursor-not-allowed': forbidNextMinute() }"
            @click="handleIncreaseMinute()"
          >
            <TIcon class="@text-primary-500" src="@icons/b-arrow-circle-right.svg" />
          </button>
        </div>
      </div>
      <div v-if="mode === 'pickDay'" class="flex justify-center items-center my-5" :class="{'mb-0': BrowserSource_Screens.sm }">
        <TButton
          color="gray"
          size="large"
          class="me-5"
          @click="isModalOpen = false"
        >
          {{ __('tsitfy.cancel') }}
        </TButton>
        <TButton color="primary" size="large" @click="handleSubmit()">
          {{ __('tsitfy.confirm') }}
        </TButton>
      </div>
    </div>
  </TModal>
</template>
