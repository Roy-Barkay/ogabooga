import React from 'react';

interface SearchIconSVGProps extends React.SVGProps<SVGSVGElement> {
  size: number;
  iconColor: string;
  iconBackground: string;
  secondary: boolean;
}

const SearchIconSVG: any = ({
                              size = 38,
                              iconColor = '#fff',
                              iconBackground = '#003c7f',
                              secondary,
                              ...props
                            }: SearchIconSVGProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width={size} height={size} {...props}>
      <g>
        <path fill={!secondary ? iconBackground : '#268330'} d='M0,25A25,25,0,1,1,25,50,25,25,0,0,1,0,25Z' />
        <path fill='none' stroke={iconColor} strokeWidth='2px'
              d='M16,22.75a6.75,6.75,0,1,1,6.75,6.75A6.75,6.75,0,0,1,16,22.75Z' />
        <path fill='none' stroke={iconColor} strokeWidth='2px' strokeLinecap='square' d='M27.67,28.64l4.84,4.85' />
      </g>
    </svg>
  );
}
const SearchIcon = React.memo(SearchIconSVG);
export default SearchIcon;
