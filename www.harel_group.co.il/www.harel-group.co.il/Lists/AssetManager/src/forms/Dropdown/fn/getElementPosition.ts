export const getElementPosition = (e: HTMLElement, hintAreaSize = 20): { top: number, left: number, width: number } => {
  const {top, width, height, right} = e.getBoundingClientRect();
  return {
    top: top + window.scrollY + height - hintAreaSize,
    left: right - width,
    width,
  };
}
