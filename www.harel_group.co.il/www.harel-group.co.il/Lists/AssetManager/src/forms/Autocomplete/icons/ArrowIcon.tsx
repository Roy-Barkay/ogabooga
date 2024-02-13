import React from 'react';

interface ArrowIconSVGProps {
  size: number;
  iconColor: string;
}

const ArrowIconSVG: any = ({size = 15, iconColor = '#003c7f'}: ArrowIconSVGProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width={size} height={size}>
      <path
        fill='none'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M.929 6L8 12.238 15.071 6'
      />
    </svg>
  );
}
const ArrowIcon = React.memo(ArrowIconSVG);
export default ArrowIcon;
