const isNumber = (n: any) => typeof n === 'number' && isFinite(n);
const isNumbers = (...args: any[]) => args.reduce((a, n) => a && isNumber(n), true);

interface InitialValueProps {
  val: any,
  min: any,
  max: any
}

export const calculateInitialValue = ({val, min, max}: InitialValueProps) => {
  if (typeof val === 'string') {
    val = parseFloat(val.replace(/[^0-9.-]/g, ''));
  }

  switch (true) {
    case (isNumbers(val, min, max) && max >= val && val >= min):
      return val;
    case (isNumbers(val, max) && val > max):
      return max;
    case (isNumbers(val, min) && val < min):
      return min;
    case (isNumbers(max, min)):
      return Math.min(max, min);
    case (isNumbers(val, min)):
      return Math.max(val, min);
    case (isNumbers(val, max)):
      return Math.min(val, max);
    case (!(isNumber(val)) && isNumber(min)):
      return min;
    case (!(isNumber(val)) && isNumber(max)):
      return Math.min(max, 0);
    default:
      return val || 0;
  }
};