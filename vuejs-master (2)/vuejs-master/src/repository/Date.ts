export type Calendar = 'jalali' | 'gregorian'

type Format = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'YYYY-MM-DD - HH:mm' | 'YYYY/MM/DD - HH:mm' | 'HH:mm'

export class TDate {
  private _jYear: number | undefined
  private _jMonth: number | undefined
  private _jDay: number | undefined

  private _gYear: number | undefined
  private _gMonth: number | undefined
  private _gDay: number | undefined

  private _hour: number
  private _minute: number
  private _second: number

  private _weekday: number | undefined

  private _date: Date | undefined

  public static readonly GREGORIAN_WEEKDAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  public static readonly JALALI_WEEKDAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

  public static readonly GREGORIAN_MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  public static readonly JALALI_MONTHS = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ]

  constructor(calendar: Calendar, year: number, month: number, day: number, hour: number, minute: number, second: number)
  constructor()
  constructor(calendar: Calendar = 'gregorian', year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number) {
    if (year !== undefined && month !== undefined && day !== undefined && hour !== undefined && minute !== undefined && second !== undefined) { // first signature
      if (calendar === 'jalali') {
        this._jYear = year
        this._jMonth = month
        this._jDay = day
      } else {
        this._gYear = year
        this._gMonth = month
        this._gDay = day
      }

      this._hour = hour
      this._minute = minute
      this._second = second

      if (hour < 0 || hour > 23) throw new Error('Invalid hour')
      if (minute < 0 || minute > 59) throw new Error('Invalid minute')
      if (second < 0 || second > 59) throw new Error('Invalid second')
      if (month < 1 || month > 12) throw new Error('Invalid month')
      if (day < 1 || day > this.getMonthDaysCount(calendar)) throw new Error('Invalid day')
    } else { // second signature
      const date = new Date() // current date
      this._gYear = date.getFullYear()
      this._gMonth = date.getMonth() + 1
      this._gDay = date.getDate()
      this._hour = date.getHours()
      this._minute = date.getMinutes()
      this._second = date.getSeconds()
    }
  }

  static fromJalali(year: number, month: number, day: number, hour: number, minute: number, second: number): TDate
  static fromJalali(): TDate
  static fromJalali(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number): TDate {
    if (year !== undefined && month !== undefined && day !== undefined && hour !== undefined && minute !== undefined && second !== undefined) {
      return new TDate('jalali', year, month, day, hour, minute, second)
    } else {
      return new TDate()
    }
  }

  static fromGregorian(year: number, month: number, day: number, hour: number, minute: number, second: number): TDate
  static fromGregorian(): TDate
  static fromGregorian(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number): TDate {
    if (year !== undefined && month !== undefined && day !== undefined && hour !== undefined && minute !== undefined && second !== undefined) {
      return new TDate('gregorian', year, month, day, hour, minute, second)
    } else {
      return new TDate()
    }
  }

  static fromDate(date: Date): TDate {
    return TDate.fromGregorian(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
  }

  static fromTimestamp(timestamp: number): TDate {
    return TDate.fromDate(new Date(timestamp))
  }

  static fromTimestampSeconds(timestamp: number): TDate {
    return TDate.fromDate(new Date(timestamp * 1000))
  }

  public set jYear(value: number) {
    this.clearCaches('gregorian')
    this._jYear = value
  }

  public get jYear(): number {
    if (this._jYear) return this._jYear

    this.calculateJalaliDate()
    return this._jYear!
  }

  public set jMonth(value: number) {
    this.clearCaches('gregorian')
    this._jMonth = value
  }

  public get jMonth() : number {
    if (this._jMonth) return this._jMonth

    this.calculateJalaliDate()
    return this._jMonth!
  }

  public set jDay(value: number) {
    this.clearCaches('gregorian')
    this._jDay = value
  }

  public get jDay() : number {
    if (this._jDay) return this._jDay

    this.calculateJalaliDate()
    return this._jDay!
  }

  public set gYear(value: number) {
    this.clearCaches('jalali')
    this._gYear = value
  }

  public get gYear(): number {
    if (this._gYear) return this._gYear

    this.calculateGregorianDate()
    return this._gYear!
  }

  public set gMonth(value: number) {
    this.clearCaches('jalali')
    this._gMonth = value
  }

  public get gMonth() : number {
    if (this._gMonth) return this._gMonth

    this.calculateGregorianDate()
    return this._gMonth!
  }

  public set gDay(value: number) {
    this.clearCaches('jalali')
    this._gDay = value
  }

  public get gDay() : number {
    if (this._gDay) return this._gDay

    this.calculateGregorianDate()
    return this._gDay!
  }

  public set hour(value: number) {
    this._hour = value
  }

  public get hour() : number {
    return this._hour
  }

  public set minute(value: number) {
    this._minute = value
  }

  public get minute() : number {
    return this._minute
  }

  public set second(value: number) {
    this._second = value
  }

  public get second() : number {
    return this._second
  }

  public get weekday() : number {
    if (this._weekday) return this._weekday

    this.calculateWeekday()
    return this._weekday!
  }

  public get date() : Date {
    if (this._date) {
      return this._date
    }

    this._date = new Date(this.gYear, this.gMonth - 1, this.gDay, this.hour, this.minute, this.second)
    return this._date
  }

  public get timestamp() : number {
    return +this.date
  }

  public get timestampSeconds() : number {
    return +this.date / 1000
  }

  private calculateJalaliDate(): void {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    const gy2 = (this._gMonth! - 1 > 2) ? (this._gYear! + 1) : this._gYear!
    let days = 355666 + (365 * this._gYear!) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + this._gDay! + g_d_m[this._gMonth! - 1]
    let jy = -1595 + (33 * ~~(days / 12053))
    days %= 12053
    jy += 4 * ~~(days / 1461)
    days %= 1461
    if (days > 365) {
      jy += ~~((days - 1) / 365)
      days = (days - 1) % 365
    }
    let jm, jd
    if (days < 186) {
      jm = 1 + ~~(days / 31)
      jd = 1 + (days % 31)
    } else {
      jm = 7 + ~~((days - 186) / 30)
      jd = 1 + ((days - 186) % 30)
    }

    this._jYear = jy
    this._jMonth = jm
    this._jDay = jd
  }

  private calculateGregorianDate(): void {
    let gy: number, gm: number, gd: number, days: number
    let jy = this.jYear
    const jm = this.jMonth
    const jd = this.jDay
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

    this._gYear = gy
    this._gMonth = gm
    this._gDay = gd
    this._date = new Date(this.gYear, this.gMonth - 1, this.gDay, this.hour, this.minute, this.second)
  }

  private calculateWeekday(): void {
    this._weekday = (this.date.getDay() + 1) % 7
  }

  toString(calendar: Calendar = 'jalali', showTime = false, onlyShowTime = false): string {
    if (onlyShowTime) return this.formatDate(calendar, 'HH:mm')
    if (calendar === 'jalali') {
      if (showTime) {
        return this.formatDate(calendar, 'YYYY/MM/DD - HH:mm')
      } else {
        return this.formatDate(calendar, 'YYYY/MM/DD')
      }
    } else {
      if (showTime) {
        return this.formatDate(calendar, 'YYYY-MM-DD - HH:mm')
      } else {
        return this.formatDate(calendar, 'YYYY-MM-DD')
      }
    }
  }

  private padStart(value: number) {
    return value.toString().padStart(2, '0')
  }

  private formatDate(calendar: Calendar, format: Format): string {
    if (format === 'HH:mm') return `${this.padStart(this.hour)}:${this.padStart(this.minute)}`
    if (calendar === 'gregorian') {
      switch (format) {
        case 'YYYY-MM-DD': return `${this.gYear}-${this.padStart(this.gMonth)}-${this.padStart(this.gDay)}`
        case 'YYYY-MM-DD - HH:mm': return `${this.gYear}-${this.padStart(this.gMonth)}-${this.padStart(this.gDay)} - ${this.padStart(this.hour)}:${this.padStart(this.minute)}`
        case 'YYYY/MM/DD': return `${this.gYear}/${this.padStart(this.gMonth)}/${this.padStart(this.gDay)}`
        case 'YYYY/MM/DD - HH:mm': return `${this.gYear}/${this.padStart(this.gMonth)}/${this.padStart(this.gDay)} - ${this.padStart(this.hour)}:${this.padStart(this.minute)}`
      }
    } else {
      switch (format) {
        case 'YYYY-MM-DD': return `${this.jYear}-${this.padStart(this.jMonth)}-${this.padStart(this.jDay)}`
        case 'YYYY-MM-DD - HH:mm': return `${this.jYear}-${this.padStart(this.jMonth)}-${this.padStart(this.jDay)} - ${this.padStart(this.hour)}:${this.padStart(this.minute)}`
        case 'YYYY/MM/DD': return `${this.jYear}/${this.padStart(this.jMonth)}/${this.padStart(this.jDay)}`
        case 'YYYY/MM/DD - HH:mm': return `${this.jYear}/${this.padStart(this.jMonth)}/${this.padStart(this.jDay)} - ${this.padStart(this.hour)}:${this.padStart(this.minute)}`
      }
    }
  }

  private clearCaches(calendar: Calendar): void {
    if (calendar === 'gregorian') {
      this._gYear = undefined
      this._gMonth = undefined
      this._gDay = undefined
    } else {
      this._jYear = undefined
      this._jMonth = undefined
      this._jDay = undefined
    }
    this._weekday = undefined
    this._date = undefined
  }

  /**
  * @description بررسی می‌کند که سال کبیسه است یا نه
  * @see https://fa.wikipedia.org/wiki/%DA%AF%D8%A7%D9%87%E2%80%8C%D8%B4%D9%85%D8%A7%D8%B1%DB%8C_%D9%87%D8%AC%D8%B1%DB%8C_%D8%AE%D9%88%D8%B1%D8%B4%DB%8C%D8%AF%DB%8C_%D8%AD%D8%B3%D8%A7%D8%A8%DB%8C#:~:text=%D8%A8%D8%B1%D8%A7%DB%8C%20%D8%A2%D9%86%DA%A9%D9%87%20%D8%A8%D8%AF%D8%A7%D9%86%DB%8C%D9%85,%D8%A8%D9%87%20%D8%A8%D8%B9%D8%AF%20%D9%85%DB%8C%E2%80%8C%D8%A8%D8%A7%D8%B4%D8%AF
  */
  isLeapYear(calendar: Calendar): boolean {
    if (calendar === 'jalali') {
      const x = 0.24219858156
      const y = (this.jYear + 2346) * x
      const fraction = y % 1
      return fraction < x
    } else {
      return ((this.gYear % 4 === 0) && (this.gYear % 100 !== 0)) || (this.gYear % 400 === 0)
    }
  }

  /**
   * @description مقدار استرینگ روز هفته را می‌دهد
   */
  public getWeekdayString(calendar: Calendar): string {
    if (calendar === 'jalali') {
      return TDate.JALALI_WEEKDAYS[this.weekday]
    } else {
      return TDate.GREGORIAN_WEEKDAYS[this.weekday]
    }
  }

  /**
   * @description مقدار استرینگ ماه را می‌دهد
   */
  public getMonthString(calendar: Calendar) {
    if (calendar === 'jalali') {
      return TDate.JALALI_MONTHS[this.jMonth - 1]
    } else {
      return TDate.GREGORIAN_MONTHS[this.gMonth - 1]
    }
  }

  /**
   * @description تعداد روز‌های ماه را می‌دهد
   */
  public getMonthDaysCount(calendar: Calendar): number {
    if (calendar === 'jalali') {
      if (this.jMonth <= 6) {
        return 31
      } else if (this.jMonth <= 11) {
        return 30
      } else {
        return this.isLeapYear('jalali') ? 30 : 29
      }
    } else {
      if ([1, 3, 5, 7, 8, 10, 12].includes(this.gMonth)) {
        return 31
      } else if ([4, 6, 9, 11].includes(this.gMonth)) {
        return 30
      } else {
        return this.isLeapYear('gregorian') ? 29 : 30
      }
    }
  }

  public getWeekdayOfFirstDayOfMonth(calendar: Calendar): number {
    let date: TDate
    if (calendar === 'jalali') {
      date = TDate.fromJalali(this.jYear, this.jMonth, 1, 0, 0, 0)
    } else {
      date = TDate.fromGregorian(this.gYear, this.gMonth, 1, 0, 0, 0)
    }
    return (date.date.getDay() + 1) % 7
  }
}
