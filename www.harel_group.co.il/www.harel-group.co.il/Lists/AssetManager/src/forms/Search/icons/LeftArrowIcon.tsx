import React from 'react';

interface LeftArrowSVGProps extends React.SVGProps<SVGSVGElement> {
  iconColor?: string;
  iconBackground?: string;
  secondary?: boolean;
}

function LeftArrowIcon({
                         iconColor = '#fff',
                         iconBackground = '#003c7f',
                         secondary,
                         ...props
                       }: LeftArrowSVGProps, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width={38} height={38} ref={svgRef} {...props}>
      <g>
        <path fill={!secondary ? iconBackground : '#268330'} d='M0,25A25,25,0,1,1,25,50,25,25,0,0,1,0,25Z' />
        <path fill='none' fillRule='evenodd' stroke={iconColor} strokeWidth='2px' clipRule='evenodd'
              d='M25,15.7l-8.2,8.2c-0.3,0.3-0.3,0.8,0,1.1l8.2,8.2c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l-7.6-7.6l7.6-7.6c0.3-0.3,0.3-0.8,0-1.1C6.9,39.4,31.3,6.4,25,15.7L25,15.7z' />
      </g>
    </svg>
  );
}

const LeftArrowIconRef = React.forwardRef(LeftArrowIcon);
const MemoForwardRef = React.memo(LeftArrowIconRef);
export default MemoForwardRef;

