import { BrowserSource_IsTouchDevice } from '@@/datasource/browser/BrowserSource'
import { ObjectDirective } from 'vue'

const hscrollable: ObjectDirective = {
  mounted(node: HTMLElement) {
    if (BrowserSource_IsTouchDevice()) return

    let startX = 0
    let startTime: number | null = null
    let preventDefault = false
    let scrollLeft = 0
    const scrollable = node
    let isDown = false

    node.style.setProperty('scroll-snap-type', 'none')

    function mousedown(e: MouseEvent) {
      preventDefault = false
      e.preventDefault()

      window.addEventListener('mouseup', mouseUp)

      isDown = true
      // dispatchIsDown()
      node.style.setProperty('scroll-behavior', 'auto')
      startX = e.clientX
      startTime = Date.now()
      scrollLeft = scrollable.scrollLeft
    }

    function mousemove(e: MouseEvent) {
      e.preventDefault()
      if (!isDown) return

      const x = e.clientX - scrollable.clientLeft
      const walk = x - startX // scroll-fast
      scrollable.scrollLeft = scrollLeft - walk
    }

    function mouseUp(e: MouseEvent) {
      const endTime = Date.now()
      if (Math.abs(e.clientX - startX) > 4 || endTime - startTime! > 500) {
        preventDefault = true
      }
      isDown = false
      // dispatchIsDown()
      node.style.removeProperty('scroll-behavior')
      window.removeEventListener('mouseup', mouseUp)
    }

    const preventTriggerClick = (e: MouseEvent) => {
      if (!preventDefault) return
      e.preventDefault()
      e.stopImmediatePropagation()
    }

    node.addEventListener('mousedown', mousedown)
    node.addEventListener('mousemove', mousemove)

    node.addEventListener('click', preventTriggerClick, true)

    ;(node as any)._mousedown = mousedown
    ;(node as any)._mousemove = mousemove
    ;(node as any)._click = preventTriggerClick
  },

  unmounted(node) {
    const nodeExtended = node as HTMLElement & Record<'_mousedown' | '_mousemove' | '_click', Function | undefined>
    node.removeEventListener('mousedown', nodeExtended._mousedown)
    node.removeEventListener('mousemove', nodeExtended._mousemove)
    node.removeEventListener('click', nodeExtended._click, true)
    nodeExtended._mousedown = undefined
    nodeExtended._mousemove = undefined
    nodeExtended._click = undefined
  },
}

export default hscrollable
