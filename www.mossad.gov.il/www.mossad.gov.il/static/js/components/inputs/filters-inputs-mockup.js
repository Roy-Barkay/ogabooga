const departments = {
  field: "department",
  type: "multi-select",
  options: [],
};

const positionPrecentages = {
  field: "positionPrecentage",
  type: "radio",
  options: [],
};

export function getPositionPrecentagesInput() {
  return positionPrecentages;
}

export default function getDepartments() {
  return departments;
}
