import { MaybeRef, useEventListener } from '@vueuse/core'
import { conditionalScope } from './conditionalScope'
import { Ref } from 'vue'

const contextKey = 'parent-modal'

export function useModal(isOpen: Ref<boolean>, {
  noClose = false as MaybeRef<boolean | undefined>,
  visibleParent = false,
} = {}) {
  function isVisible() {
    return isOpen.value && show.value
  }

  // provider
  // مودال پدر به عنوان پرووایدر دیتای خود را در اختیار فرزندان قرار می‌دهد
  const show = ref(true)
  const modalProvider = {
    isOpen,
    setShow(value: boolean) {
      setTimeout(() => {
        show.value = value
      }, 0)
    },
  }
  provide(contextKey, modalProvider)

  // #region nested control
  // child (injector)
  // اگر مودال پدری برای این مودال وجود داشت یعنی مودال از نوع فرزند است
  // و هنگام نمایش داده شدن باید مودال پدرش را مخفی کند
  const parentModal = inject<typeof modalProvider | null>(contextKey, null)
  if (parentModal) {
    if (!visibleParent) {
      watch(isOpen, (open: boolean) => {
        parentModal.setShow(!open)
      })
    }
    watch(parentModal.isOpen, parentOpen => {
      if (!parentOpen && isOpen.value) {
        isOpen.value = false
        console.error('force close modal! because its parent is closed!')
      }
    })
  }

  // #endregion

  conditionalScope(() => isVisible() && !unref(noClose), () => {
    // #region handle back
    // onBackPressed(event => {
    //   isOpen.value = false
    //   event.preventDefault()
    //   event.stopPropagation()
    // })
    // #endregion

    // #region handle esc key
    useEventListener(document, 'keydown', event => {
      if (event.key === 'Escape') {
        isOpen.value = false
        event.preventDefault()
      }
    })
    // #endregion
  })

  // #region handle scroll lock
  // if (scrollLock && !parenTModal) {
  //   useScrollLockBody(() => isOpen.value || unref(animating))
  // }
  // #endregion

  return {
    show,
  }
}
