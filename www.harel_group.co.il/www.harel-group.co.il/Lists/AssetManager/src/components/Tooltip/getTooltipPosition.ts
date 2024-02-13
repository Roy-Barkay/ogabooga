export const getTooltipPosition = (holderRect: DOMRect, tooltipRect: DOMRect, placement: string, offsetTop = 0): Partial<DOMRect> => {
  const tooltipSize = 6; // px
  const {top, left, width, height} = holderRect;

  console.log(top, left, offsetTop);

  switch (placement) {
    case 'bottom':
      return {
        top: height + tooltipSize,//top + offsetTop + height + tooltipSize,
        left: width / 2 - tooltipRect.width / 2//left + width / 2 - tooltipRect.width / 2
      };
    case 'bottom-start':
      return {
        top: height + tooltipSize,//top + offsetTop + height + tooltipSize,
        left: 0
      };
    case 'bottom-end':
      return {
        top: height + tooltipSize,//top + offsetTop + height + tooltipSize,
        right: 0//holderRect.right - width
      };
    case 'right-start':
      return {
        top: 0,//top + offsetTop,
        left:  width + tooltipSize// + tooltipSize + left + width + tooltipSize
      };
    case 'right':
      return {
        top: height / 2 - tooltipRect.height / 2,//top + offsetTop + height / 2 - tooltipRect.height / 2,
        left: width + tooltipSize//left + width + tooltipSize
      };
    case 'right-end':
      return {
        bottom: 0,//top + offsetTop + height - tooltipRect.height,
        left: width + tooltipSize//left + width + tooltipSize
      };
    case 'top-start':
      return {
        bottom: height + tooltipSize,//top + offsetTop - tooltipRect.height - tooltipSize,
        left: 0//left
      };
    case 'top':
      return {
        bottom: height + tooltipSize,//top: top + offsetTop - tooltipRect.height - tooltipSize,
        left: width / 2 - tooltipRect.width / 2
      };
    case 'top-end':
      return {
        bottom: height + tooltipSize,//top: top + offsetTop - tooltipRect.height - tooltipSize,
        right: 0
      };
    case 'left-start':
      return {
        top: 0,//top + offsetTop,
        right:  width + tooltipSize//left: left - tooltipRect.width - tooltipSize
      };
    case 'left':
      return {
        top: height / 2 - tooltipRect.height / 2,//top: top + offsetTop + height / 2 - tooltipRect.height / 2,
        right:  width + tooltipSize//left: left - tooltipRect.width - tooltipSize
      };
    case 'left-end':
      return {
        bottom: 0,//top: top + offsetTop + height - tooltipRect.height,
        right:  width + tooltipSize//left: left - tooltipRect.width - tooltipSize
      };
    default:
      return {};
  }
};
