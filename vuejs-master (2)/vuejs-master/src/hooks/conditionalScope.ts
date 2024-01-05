import { tryCreateSubScope } from '@@/utils/try-create-subscope'
import { EffectScope, WatchSource } from 'vue-demi'

export function conditionalScope<T>(source: WatchSource<T>, callback: () => void) {
  let scope: EffectScope | undefined
  const parentScope = getCurrentScope()

  function start() {
    if (scope) return
    scope = tryCreateSubScope(parentScope)
    scope.run(callback)
  }

  function stop() {
    if (!scope) return
    scope.stop()
    scope = undefined
  }

  watch(source, condition => {
    if (condition) start()
    else stop()
  }, { immediate: true })
}
