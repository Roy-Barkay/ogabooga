const years = [];

const months = [
  {
    id: "01",
    value: "01",
  },
  {
    id: "02",
    value: "02",
  },
  {
    id: "03",
    value: "03",
  },
  {
    id: "04",
    value: "04",
  },
  {
    id: "05",
    value: "05",
  },
  {
    id: "06",
    value: "06",
  },
  {
    id: "07",
    value: "07",
  },
  {
    id: "08",
    value: "08",
  },
  {
    id: "09",
    value: "09",
  },
  {
    id: "10",
    value: "10",
  },
  {
    id: "11",
    value: "11",
  },
  {
    id: "12",
    value: "12",
  },
];

const days = [
  {
    id: "01",
    value: "01",
  },
  {
    id: "02",
    value: "02",
  },
  {
    id: "03",
    value: "03",
  },
  {
    id: "04",
    value: "04",
  },
  {
    id: "05",
    value: "05",
  },
  {
    id: "06",
    value: "06",
  },
  {
    id: "07",
    value: "07",
  },
  {
    id: "08",
    value: "08",
  },
  {
    id: "09",
    value: "09",
  },
  {
    id: "10",
    value: "10",
  },
  {
    id: "11",
    value: "11",
  },
  {
    id: "12",
    value: "12",
  },
  {
    id: "13",
    value: "13",
  },
  {
    id: "14",
    value: "14",
  },
  {
    id: "15",
    value: "15",
  },
  {
    id: "16",
    value: "16",
  },
  {
    id: "17",
    value: "17",
  },
  {
    id: "18",
    value: "18",
  },
  {
    id: "19",
    value: "19",
  },
  {
    id: "20",
    value: "20",
  },
  {
    id: "21",
    value: "21",
  },
  {
    id: "22",
    value: "22",
  },
  {
    id: "23",
    value: "23",
  },
  {
    id: "24",
    value: "24",
  },
  {
    id: "25",
    value: "25",
  },
  {
    id: "26",
    value: "26",
  },
  {
    id: "27",
    value: "27",
  },
  {
    id: "28",
    value: "28",
  },
  {
    id: "29",
    value: "29",
  },
  {
    id: "30",
    value: "30",
  },
  {
    id: "31",
    value: "31",
  },
];

export default function getYears() {
  if (years.length === 0) {
    let currentYear = new Date().getFullYear();
    for (var i = 0; currentYear - i >= currentYear - 100; i++) {
      years.push({
        value: currentYear - i,
        id: currentYear - i,
      });
    }
  }
  return years;
}

export function getMonths() {
  return months;
}

export function getDays() {
  return days;
}
