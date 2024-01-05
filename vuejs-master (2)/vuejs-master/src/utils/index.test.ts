import { describe, test, expect, vi, afterEach } from 'vitest'
import { useI18nStore } from '@@/repository/I18n'
import { createTestingPinia } from '@pinia/testing'
import {
  currencySeperator,
  mirrorInRtl,
  summerizeFileSize,
  getCssTransform,
  wait,
  waitUntil,
  getDeferredPromise,
} from './index'

/**
 *⁧برای مقاصد mocking ⁩
 * @see https://pinia.vuejs.org/cookbook/testing.html#Mocking-getters
*/
const testingPiniaInstance = createTestingPinia({ createSpy: vi.fn })
const i18n = useI18nStore(testingPiniaInstance as any)

describe('summerizeFileSize', () => {
  test('expect 270 bit to be 270 B', () => {
    expect(summerizeFileSize(270)).toBe('270 B')
  })
  test('expect 27,000 bit to be 27 KB', () => {
    expect(summerizeFileSize(27_000)).toBe('27 KB')
  })
  test('expect 2,700,000 bit to be 2.7 MB', () => {
    expect(summerizeFileSize(2_700_000)).toBe('2.7 MB')
  })
  test('expect 2,700,000,000 bit to be 2.7 GB', () => {
    expect(summerizeFileSize(2_700_000_000)).toBe('2.7 GB')
  })
})

describe('currencySeperator', () => {
  test('Expect the number 1000 to be equal to 1000', () => {
    expect(currencySeperator(1000)).toBe('1000')
  })
  test('Expect the number 15000 to be equal to 15,000', () => {
    expect(currencySeperator(15_000)).toBe('15,000')
  })
})

describe('mirrorInRtl', () => {
  /** ⁧پس از اجرای هر کدام از توابع test این تابع اجرا می‌شود ⁩  */
  afterEach(() => {
    /**
     * ⁧با این مقداردهی رفتار پیش‌فرض currentLanguage را برمی‌گردانیم
     * @see https://pinia.vuejs.org/cookbook/testing.html#Mocking-getters⁩
     */
    // @ts-expect-error
    i18n.currentLanguage = undefined
  })

  test('Expect the number 50 to be equal to -50 in rtl mode', () => {
    /** ⁧ماک کردن مقدار currentLanguage برای شبیه‌سازی تست ⁩  */
    i18n.currentLanguage = 'fa'
    expect(mirrorInRtl(50)).toBe(-50)
  })

  test('Expect the number -50 to be equal to 50 in rtl mode', () => {
    i18n.currentLanguage = 'fa'
    expect(mirrorInRtl(50)).toBe(-50)
  })

  test('Expect the number 50 to be equal to 50 in ltr mode', () => {
    i18n.currentLanguage = 'en'
    expect(mirrorInRtl(50)).toBe(50)
  })

  test('Expect the number -50 to be equal to -50 in ltr mode', () => {
    i18n.currentLanguage = 'en'
    expect(mirrorInRtl(-50)).toBe(-50)
  })
})

describe('getCssTransform', () => {
  test("Expect the string 'translateX(10px)' to be equal to { transform: translateX(10px), '-webkit-transform': translateX(10px)", () => {
    const value = 'translateX(10px)'
    const expectedValue = {
      transform: value,
      '-webkit-transform': value,
    }

    expect(getCssTransform(value)).toEqual(expectedValue)
  })
})

describe('wait', () => {
  test('Should return promise', () => {
    expect(wait(2)).toBeInstanceOf(Promise)
  })

  test('Should resolve only after 2 second', async () => {
    vi.useFakeTimers()
    const mock = vi.fn()

    wait(2000).then(mock)

    await vi.advanceTimersByTime(1999)
    expect(mock).not.toHaveBeenCalled()

    await vi.advanceTimersByTime(1)
    expect(mock).toHaveBeenCalled()

    vi.restoreAllMocks()
  })
})

describe('waitUntil', () => {
  test('Should return promise', () => {
    expect(wait(2)).toBeInstanceOf(Promise)
  })

  test('Should be resolve after myRef become true', async () => {
    const mock = vi.fn()
    const myRef = ref(false)

    waitUntil(() => myRef.value).then(mock)

    await nextTick()
    expect(mock).not.toHaveBeenCalled()

    myRef.value = true

    await nextTick()
    expect(mock).toHaveBeenCalled()
  })
})

describe('getDeferredPromise', () => {
  test('Expect getDeferredPromise to resolves with value 5', () => {
    const result = getDeferredPromise()
    result.resolve(5)
    expect(result.promise).resolves.toBe(5)
  })

  test('Expect getDeferredPromise to rejects with value 5', () => {
    const result = getDeferredPromise()
    result.reject(5)
    expect(result.promise).rejects.toBe(5)
  })
})
