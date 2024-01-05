import { fromFarsiNumbers } from '@@/utils'
import { Ref } from 'vue-demi'

  /**
   * @description
   * r: اعداد حقیقی
   * p: اعداد حقیقی مثبت
   * z: اعداد صحیح
   * w: اعداد حسابی
   * n: اعداد طبیعی
   */
  type Set = 'r' | 'z' | 'w' | 'n' | 'p'

type HTMLNumberInputElement = HTMLInputElement & { set?: Set }

/** در صورت نامعتبر بودن اینپوت، آن را خالی می‌کند */
function handleInput(this: HTMLNumberInputElement) {
  const set = this.set!
  const validNumerPattern = {
    r: /^-?\d*(\d\.\d*)?$/,
    p: /^\d*(\d\.\d*)?$/,
    z: /^-?\d*$/,
    w: /^\d*$/,
    n: /^\d+$/,
  }[set]

  if (this.value && !validNumerPattern.test(this.value)) {
    const value = String(parseFloat(this.value))
    this.value = isFinite(value as any) ? value : ''
  }
}

/** هنگام فشردن کلید، در صورت نامعتبر بودن آن را قبول نمی‌کند و اعداد فارسی را نیز با انگلیسی جایگزین می‌کند */
function handleKeyPress(this: HTMLNumberInputElement, event: KeyboardEvent) {
  const set = this.set!
  let char = event.key
  if (char === undefined) {
    char = String.fromCharCode(event.which)
  }
  if (char === 'Enter') return
  if (window.isFinite(+char)) return
  if (char === '.' && (set === 'r' || set === 'p') && this.value.indexOf('.') === -1) return
  if (char === '-' && (set === 'r' || set === 'z') && this.value.indexOf('-') === -1) return

  event.preventDefault()
  if (char in fromFarsiNumbers) {
    document.execCommand('insertText', true, fromFarsiNumbers[char as keyof typeof fromFarsiNumbers])
  }
}

export default function useNumberInput(el: Ref<HTMLNumberInputElement | null>, set: Set) {
  watchEffect(onInvalidate => {
    const input = el.value
    if (!input) return
    input.set = set
    input.addEventListener('input', handleInput as EventListener)
    input.addEventListener('keypress', handleKeyPress as EventListener)
    onInvalidate(() => {
      input.removeEventListener('input', handleInput as EventListener)
      input.removeEventListener('keypress', handleKeyPress as EventListener)
    })
  })
}
