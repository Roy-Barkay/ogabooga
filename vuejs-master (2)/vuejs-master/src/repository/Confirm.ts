import { getDeferredPromise, DeferredPromise } from '@@/utils'
import { noop } from '@vueuse/core'

let deferred: DeferredPromise<void> | null = null

const store = reactive({
  open: false,
  title: '',
  message: '',
  details: '',
  isMessageHTML: false,
  action: noop as () => any,
  okText: '',
  cancelText: '',
  noClose: false,
  okColor: 'primary' as 'primary' | 'secondary' | 'tertiary' | 'error' | 'black' | 'success' | 'info' | 'gray',
  corners: 'simple' as 'simple' | 'curve',
})

export function Confirm_Show(options: {
    title: string,
    message: string,
    details?: string,
    action: () => any,
    okText?: string,
    cancelText?: string,
    isMessageHTML?: boolean,
    noClose?: boolean,
    okColor?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'black' | 'success' | 'info'
    corners?: 'simple' | 'curve',
  }) {
  if (deferred) throw new Error('Confirm is already opened')
  deferred = getDeferredPromise()
  store.title = options.title || ''
  store.message = options.message
  store.details = options.details || ''
  store.action = options.action || noop
  store.okText = options.okText || 'ok'
  store.cancelText = options.cancelText || 'cancel'
  store.noClose = !!options.noClose
  store.open = true
  store.isMessageHTML = options.isMessageHTML || false
  store.okColor = options.okColor || 'primary'
  store.corners = options.corners || 'simple'

  return deferred.promise
}

export function Confirm_OK() {
  const result = store.action()
  if (result instanceof Promise) {
    return result
      .then(() => {
        deferred?.resolve()
        store.open = false
      })
  }
  deferred?.resolve()
  store.open = false
}

export function Confirm_Cancel() {
  store.open = false
}

watch(() => store.open, value => {
  if (!value) {
    deferred!.reject('Confirm is canceled')
    deferred = null
  }
})

export const Confirm_Store = readonly(store)
