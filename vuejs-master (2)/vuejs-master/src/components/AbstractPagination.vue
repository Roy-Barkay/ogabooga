<script setup lang="ts">
import { type Component } from 'vue'
import Observer from '@@/components/Observer.vue'
import { wait, waitForNextFrame, waitUntil } from '@@/utils'
import { useTranslation } from '@@/hooks/useTranslation'
import TButton from '@@/components/TButton.vue'
import TCircleLoading from '@@/components/TCircleLoading.vue'

const __ = useTranslation()

const props = defineProps<{
  /** ⁧کامپوننت LoadingContainer ⁩ */
  loadingComponent: Component
  /** تابعی که برای دریافت پیج‌های بعدی یا قبلی استفاده می‌شود  */
  getNextPage: (action: 'up' | 'down') => void
  /** آیا لودینگ پایین باید نمایش داده شود یا خیر  */
  loadingDown: boolean
  /** آیا لودینگ بالا باید نمایش داده شود یا خیر  */
  loadingUp: boolean
  /** آیا از پایین به انتهای صفحات رسیده‌ایم یا نه  */
  finishedDown: boolean
  /** آیا از بالا به انتهای صفحات رسیده‌ایم یا نه  */
  finishedUp: boolean
  /** آیا برای لود پیج پایینی به ارور خورده یا نه  */
  errorDown: boolean
  /** آیا برای لود پیج بالایی به ارور خورده یا نه  */
  errorUp: boolean
  /** آرایه‌ای که از ریسپانس سرور می‌گیریم  */
  result?: unknown[]
  /** استایل‌هایی که هنگام ارور به کامپوننت اعمال می‌شود  */
  errorClass?: string
  /** ⁧تنظیماتی که می‌خواهیم به آبجکت intersectionObserver اعمال کنیم ⁩  */
  intersectionOptions?: IntersectionObserverInit
  /** ⁧جهت paginataion ⁩ */
  direction?: 'down' | 'both'
  /** ⁧آیا باید به اندازه BottomNavigation پدینگ داشته باشد یا نه ⁩  */
  noBottomNavSpacing?: boolean
}>()

const emit = defineEmits<{
  (event: 'intersecting-up-changed', intersecting: boolean): void
  (event: 'intersecting-down-changed', intersecting: boolean): void
}>()

/** ⁧فقط در صورتیکه pagination دوطرفه داشته باشیم باید Observer بالایی هم رندر شود و کار کند. ⁩
 * ⁧این مقدار نمایش یا عدم نمایش Observer بالایی را مشخص می‌کند
 */
const shoudUseTopObserver = ref(props.direction === 'both')

/** آیا صفحه پایینی در حال لود شدن است یا نه */
const isIntersectingDown = ref(false)

/** آیا صفحه بالایی در حال لودشدن است یا نه  */
const isIntersectingUp = ref(false)

/** مدیریت دریافت صفحه پایینی  */
async function handleIntersectDown() {
  isIntersectingDown.value = true
  if (props.errorDown) return

  await waitForNextFrame()
  if (!isIntersectingDown.value) return

  props.getNextPage('down')
}

/** مدیریت دریافت صفحه بالایی  */
async function handleIntersectUp() {
  isIntersectingUp.value = true
  if (props.errorUp) return

  await waitForNextFrame()
  if (!isIntersectingUp.value) return

  // handle priority concurrency
  await wait(0)
  if (props.loadingDown) {
    await waitUntil(() => !props.loadingDown || !isIntersectingUp.value)
    if (!isIntersectingUp.value) return
    await waitForNextFrame()
    if (!isIntersectingUp.value) return
  }

  props.getNextPage('up')
}

function setIntersectingDown(value: boolean) { isIntersectingDown.value = value }

function setIntersectingUp(value: boolean) { isIntersectingUp.value = value }

watch(isIntersectingDown, intersecting => { emit('intersecting-down-changed', intersecting) })
watch(isIntersectingUp, intersecting => { emit('intersecting-up-changed', intersecting) })

</script>

<template>
  <component :is="props.loadingComponent" :error-class="errorClass">
    <template #default>
      <div v-if="shoudUseTopObserver" class="@flex-center h-72px relative shrink-0">
        <Observer :options="intersectionOptions" @intersect="handleIntersectUp" @out-of-viewport="setIntersectingUp(false)" />

        <TButton v-if="props.errorUp" :loading="props.loadingUp" @click="props.getNextPage('up')">
          {{ __('tsitfy.load-more') }}
        </TButton>
        <div v-else-if="props.loadingUp" class=":uno: absolute m-auto inset-x-0 @flex-center s-10 shadow-xl rounded-full">
          <TCircleLoading class="s-6" />
        </div>
        <slot v-else-if="finishedUp && result?.length" name="finish-up" />
      </div>
      <slot />
      <div class="@flex-center h-72px relative shrink-0" :class="{'mb-bottom-nav': !noBottomNavSpacing}">
        <Observer :options="intersectionOptions" @intersect="handleIntersectDown" @out-of-viewport="setIntersectingDown(false)" />

        <TButton v-if="props.errorDown" :loading="props.loadingDown" @click="props.getNextPage('down')">
          {{ __('tsitfy.load-more') }}
        </TButton>
        <div v-else-if="props.loadingDown" class=":uno: absolute m-auto inset-x-0 @flex-center s-10 shadow-xl rounded-full">
          <TCircleLoading class="s-6" />
        </div>
      </div>
    </template>
  </component>
</template>
