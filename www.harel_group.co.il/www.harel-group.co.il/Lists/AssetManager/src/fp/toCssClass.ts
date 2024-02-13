/**
 * Filter falsy values and join with ' '
 *
 * @param arr
 */
export const toCssClass = (arr: any[]): string => arr.filter((e) => e).join(' ');
