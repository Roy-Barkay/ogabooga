import { Toast_Show } from '../repository/Toast'
import { useI18nStore } from '@@/repository/I18n'

export const fromFarsiNumbers = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',

  '٬': ',',
  '٫': '.',
}

export function mirrorInRtl(value: number) {
  const { languageConfig, currentLanguage } = useI18nStore()
  if (languageConfig[currentLanguage].rtl) return -value
  return value
}

export function handleCommonError(error: any) {
  console.error(error)
  Toast_Show('error', error.message || 'خطایی رخ داده است.')
}

export interface DeferredPromise<T> {
    promise: Promise<T>
    resolve: (value: T) => void
    reject: (reason: any) => void
  }

export function getDeferredPromise<T = any>(): DeferredPromise<T> {
  const result: DeferredPromise<T> = {} as any
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

export function convertDateToSeconds(date: string, calendar: 'jalali' | 'gregorian'): number {
  const splitted = date.split('/').map(Number) as [number, number, number]
  let newDate: Date
  if (calendar === 'jalali') {
    const dateTuple = jalali2gregorian(...splitted)
    newDate = new Date(dateTuple[0], dateTuple[1] - 1, dateTuple[2])
  } else {
    newDate = new Date(splitted[0], splitted[1] - 1, splitted[2])
  }
  return +newDate.getTime() / 1000 // divide on 1000 because unit is second
}

export function convertSecondsToDate(seconds: number): string {
  const date = new Date(seconds * 1000)
  const jalali = gregorian2jalali(date.getFullYear(), date.getMonth() + 1, date.getDate())
  const formattedDate = jalali.join('/')
  return formattedDate
}

export function convertSecondsToTime(seconds: number): string {
  const date = new Date(seconds * 1000)
  const formattedDate = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
  return formattedDate
}

export function convertTimestampToTime(timestamp: number): string {
  const date = new Date(timestamp)
  const formattedDate = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
  return formattedDate
}

/** تبدیل تاریخ میلادی به جلالی */
export function gregorian2jalali(gy: number, gm: number, gd: number): [year: number, month: number, day: number] {
  let jy: number, jm: number, jd: number, days: number
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  const gy2 = (gm > 2) ? (gy + 1) : gy
  days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1]
  jy = -1595 + (33 * ~~(days / 12053))
  days %= 12053
  jy += 4 * ~~(days / 1461)
  days %= 1461
  if (days > 365) {
    jy += ~~((days - 1) / 365)
    days = (days - 1) % 365
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31)
    jd = 1 + (days % 31)
  } else {
    jm = 7 + ~~((days - 186) / 30)
    jd = 1 + ((days - 186) % 30)
  }
  return [jy, jm, jd]
}

export function date2jalali(date = new Date()) {
  return gregorian2jalali(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

export function jalali2gregorian(jy: number, jm: number, jd: number): [year: number, month: number, day: number] {
  let gy: number, gm: number, gd: number, days: number
  jy += 1595
  days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186)
  gy = 400 * ~~(days / 146097)
  days %= 146097
  if (days > 36524) {
    gy += 100 * ~~(--days / 36524)
    days %= 36524
    if (days >= 365) days++
  }
  gy += 4 * ~~(days / 1461)
  days %= 1461
  if (days > 365) {
    gy += ~~((days - 1) / 365)
    days = (days - 1) % 365
  }
  gd = days + 1
  const sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm]
  return [gy, gm, gd]
}

export function currencySeperator(money: number | string) {
  money = String(money)

  if (money.length < 5) return money

  // ignore fraction
  let fractionPosition = money.indexOf('.')
  if (fractionPosition === -1) {
    fractionPosition = money.length
  }

  let formatted = money.slice(fractionPosition)
  for (let i = fractionPosition - 1; i >= 0; i--) {
    formatted = money[i] + formatted
    if ((fractionPosition - i) % 3 === 0 && i !== 0 && !(i === 1 && money[0] === '-')) {
      formatted = ',' + formatted
    }
  }
  return formatted.replace('.', ',')
}

export function getCssTransform(value: string) {
  return {
    transform: value,
    '-webkit-transform': value,
  }
}

export function convertIntToTimeString(int: number) {
  const minutes = Math.floor(int / 60)
  const seconds = int % 60

  if (minutes > 59) {
    const hours = Math.floor(minutes / 60).toString().padStart(2, '0')
    return `${hours}:${minutes % 60}:${seconds}`
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function summerizeFileSize(size: number) {
  // Billion
  if (size > 1_000_000_000) {
    return `${+(size / 1_000_000_000).toFixed(1)} GB`
  }
  // Million
  if (size > 1_000_000) {
    return `${+(size / 1_000_000).toFixed(1)} MB`
  }
  // Thousand
  if (size > 1_000) {
    return `${+(size / 1_000).toFixed(1)} KB`
  }
  return `${+(size).toFixed(1)} B`
}

/**
 *⁧یک promise که به اندازه پارامتر ms طول می‌کشد تا resolve شود ⁩
 * @param ms ⁧زمانیکه طول می‌کشد تا resolve شود
 */
export function wait(ms = 0) {
  return new Promise<number>(resolve => setTimeout(resolve, ms))
}

/** ⁧یک promise که در فریم بعدی resolve می‌شود ⁩  */
export function waitForNextFrame() {
  return new Promise<number>(resolve => requestAnimationFrame(resolve))
}

/**
 * ⁧بک promise که صبر می‌کند تا source داده شده مقدارش true شود و بعد resolve می‌شود
 * @param source ⁧چیزی که لازم داریم true شود
 */
export function waitUntil(source: () => any) {
  return new Promise<void>(resolve => {
    const stop = watch(
      source,
      value => {
        if (!value) return
        resolve()
        // stop in next frame
        requestAnimationFrame(() => stop())
      },
      {
        immediate: true,
      },
    )
  })
}
