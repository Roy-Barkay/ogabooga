/**
 * Split array to chunks
 *
 * @param array
 * @param chunkSize
 */
export const chunkArray = (array: any[], chunkSize = 2) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};
