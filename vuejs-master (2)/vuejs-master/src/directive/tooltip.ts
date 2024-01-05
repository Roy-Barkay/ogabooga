import { Browser_IsTouchDevice } from '@@/repository/Browser'
import { Tooltip_SetData, Tooltip_SetIsOpen, Tooltip_SetPosition } from '@@/repository/Tooltip'
import { Directive } from 'vue'

const isTouchDevice = Browser_IsTouchDevice()

function closeTooltip() {
  Tooltip_SetIsOpen(false)
}

let directive: Directive

if (isTouchDevice) {
  directive = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mounted(el, binding, vnode) {
      el.mouseClickListener = (event: MouseEvent) => {
        Tooltip_SetPosition({ x: event.clientX, y: event.clientY })
        Tooltip_SetIsOpen(true)
        Tooltip_SetData(binding.value.title, binding.value.message, binding.value.color)
      }
      el.addEventListener('click', el.mouseClickListener)
      el.addEventListener('mouseleave', closeTooltip)
    },
    unmounted(el) {
      el.removeEventListener('click', el.mouseClickListener)
      delete el.mouseClickListener
      window.removeEventListener('scroll', closeTooltip)
    },
  }
} else {
  directive = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mounted(el, binding, vnode) {
      el.mouseMoveListener = (event: MouseEvent) => {
        Tooltip_SetPosition({ x: event.clientX, y: event.clientY })
        Tooltip_SetIsOpen(true)
        Tooltip_SetData(binding.value.title, binding.value.message, binding.value.color)
      }
      el.addEventListener('mousemove', el.mouseMoveListener)
      el.addEventListener('mouseleave', closeTooltip)
      window.addEventListener('scroll', closeTooltip)
    },
    unmounted(el) {
      el.removeEventListener('mousemove', el.mouseMoveListener)
      delete el.mouseMoveListener
      el.removeEventListener('mouseleave', closeTooltip)
      window.removeEventListener('scroll', closeTooltip)
    },
  }
}

export const tooltipDirective = directive
