<script lang="ts" setup>
import vHscrollable from '@@/directive/hscrollable'
import { mirrorInRtl } from '@@/utils'
import { Browser_IsScrollBehaviorSupported } from '@@/repository/Browser'
import { useVModel } from '@vueuse/core'

type Item = { text: string, value: string }

const props = defineProps<{
  items: Item[]
  modelValue: Item
  isItemsHtml?: boolean
  scrollable?: boolean
  itemClass?: string
}>()

/** ‌ حداقل طول یک آیتم تب */
const TAB_ITEM_MIN_WIDTH = 48
const activeTab = useVModel(props, 'modelValue')

const itemsRef = ref<HTMLButtonElement[] | null>(null)

const activeElementIndex = computed(() => {
  return props.items.findIndex(item => item.value === props.modelValue.value)
})

function getLineTranslateX() {
  if (!itemsRef.value) return
  let translateX = 0
  for (let i = 0; i < activeElementIndex.value; i++) {
    const item = itemsRef.value?.[i]
    translateX += item.offsetWidth
  }
  translateX += (itemsRef.value[activeElementIndex.value].offsetWidth - lineWidth.value) / 2
  return { transform: `translateX(${mirrorInRtl(translateX)}px) scaleX(${lineWidth.value / 50})` }
}

/**
 * طول آیتم فعال موردنظر را می‌گیریم. اگر طول آن کمتر از حداقل طول یک تب بود، همان مقدار حداقل طول یک تب را بر می‌گردانیم
 * در غیر این صورت طول آن تب را بر می‌گردانیم
 */
const lineWidth = computed(() => {
  const itemWidth = (itemsRef.value?.[activeElementIndex.value].children[0] as HTMLElement).offsetWidth || 0
  return itemWidth < TAB_ITEM_MIN_WIDTH ? TAB_ITEM_MIN_WIDTH : itemWidth
})

function isActive(item: Item) {
  return item.value === props.modelValue.value
}

function handleClick(event: MouseEvent, item: Item) {
  activeTab.value = item
  const button = event.currentTarget as HTMLButtonElement
  if (Browser_IsScrollBehaviorSupported()) {
    button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }
}
</script>

<template>
  <div
    v-hscrollable
    class=":uno: h-10 w-full flex relative whitespace-nowrap of-x-auto of-y-hidden [scroll-snap-type:x_mandatory]"
  >
    <button
      v-for="item in props.items"
      ref="itemsRef"
      :key="item.value"
      class=":uno: @text-h2 px-2 [scroll-snap-align:start] shrink-0 mb-4 sm:mb-14px"
      :class="[{
        'grow': !props.scrollable,
        '@text-primary-500': isActive(item),
        '@text-black-600': !isActive(item),
      }, itemClass]"
      @click="handleClick($event, item)"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-if="props.isItemsHtml" v-html="item.text" />
      <span v-else>
        {{ item.text }}
      </span>
    </button>
    <div
      class="@bg-primary-500 rounded-t h-5px absolute bottom-0 transform-origin-start start-0 transition-transform duration-200"
      :style="{ ...getLineTranslateX(), width: '50px' }"
    />
  </div>
</template>
