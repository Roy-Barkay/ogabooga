export function tryCreateSubScope(scope = getCurrentScope()) {
  if (scope) {
    return scope.run(() => effectScope())!
  }
  return effectScope()
}
