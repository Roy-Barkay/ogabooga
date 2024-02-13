/**
 * Compare two dates object
 *
 * @param d1
 * @param d2
 */
export const isEqualDate = (d1: Date, d2: Date) => d1.toLocaleDateString() === d2.toLocaleDateString();
