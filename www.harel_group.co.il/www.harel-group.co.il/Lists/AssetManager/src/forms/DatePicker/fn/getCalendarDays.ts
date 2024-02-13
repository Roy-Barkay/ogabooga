import {chunkArray, isEqualDate} from '../../../fp';

export const getCalendarDays = (month: number, year: number, startDay = 0) => {
  const gridSize = 42;
  const dates = [];
  const firstDay = new Date(year, month).getDay();
  const weekDays = Array(7)
    .fill(null)
    .map((_, i) => (i + Number(startDay)) % 7);
  const firstIndex = weekDays.indexOf(firstDay);

  // Prev Month Days
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate();
  for (let i = 1; i <= firstIndex; i++) {
    const prevMonthDate = totalDaysInPrevMonth - firstIndex + i;
    const date = new Date(year, month - 1, prevMonthDate);
    dates.push({date, classes: ['prev']});
  }

  // Current Month Days
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const date = new Date(year, month, i);
    const classes = isEqualDate(date, new Date()) ? ['current', 'today'] : ['current'];
    dates.push({date, classes});
  }

  // Next Month Days
  if (dates.length < gridSize) {
    const count = gridSize - dates.length;
    for (let i = 1; i <= count; i++) {
      const date = new Date(year, month + 1, i);
      dates.push({date, classes: ['next']});
    }
  }

  return chunkArray(dates, 7);
};
