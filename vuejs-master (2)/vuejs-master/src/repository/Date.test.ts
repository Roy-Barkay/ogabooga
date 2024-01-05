import { describe, test, expect } from 'vitest'
import { TDate } from './Date'

describe('Date', () => {
  test('the equivalent gregorian date for 1401/04/14 must be 2022-07-05', () => {
    const date = TDate.fromJalali(1401, 4, 14, 0, 0, 0)
    const { gYear, gMonth, gDay } = date
    expect(gYear).toEqual(2022)
    expect(gMonth).toEqual(7)
    expect(gDay).toEqual(5)
  })

  test('the weekday of 1401/04/14 must be Tuesday', () => {
    const date = TDate.fromJalali(1401, 4, 14, 0, 0, 0)
    expect(date.getWeekdayString('gregorian')).toEqual('Tuesday')
  })

  test('the date 1401/12/30 must be invalid', () => {
    expect(() => { TDate.fromJalali(1401, 12, 30, 0, 0, 0) }).toThrow()
  })

  test('the date 1401/12/29 must be valid', () => {
    expect(() => { TDate.fromJalali(1401, 12, 29, 0, 0, 0) }).not.toThrow()
  })
})
