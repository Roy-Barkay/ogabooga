type LanguageList = ['fa', 'en']
type Language = LanguageList[number]
type LanguageConfig = {
  rtl: boolean
  thousandsSeparator: string
  decimalSeparator: string
  comma: string
  percent: string
  title: string
  code: Language,
}

/** ⁧برای زمانیکه می‌خواهیم valueهای مجاز مربوط به keyهای یک آبجکت را بنابر نیاز موجود تغییر دهیم ⁩  */
type OverrideFields<T, K extends {[Key in keyof T]?: unknown}> = Omit<T, keyof K> & K
