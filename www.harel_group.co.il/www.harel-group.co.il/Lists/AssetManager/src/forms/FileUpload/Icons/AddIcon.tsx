import * as React from 'react';

function SvgAdd(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={18} height={19} ref={svgRef} {...props}>
      <g fill='none' fillRule='evenodd'>
        <path
          stroke='#2D76CB'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='M3.07 0L3.07 5.861'
          transform='translate(-129 -730) translate(30 194) translate(26 535.583) translate(73 .583) translate(4.15 3.567) translate(.85 .85) translate(.894 .894)'
        />
        <path
          stroke='#2D76CB'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='M3.07 0L3.07 5.861'
          transform='translate(-129 -730) translate(30 194) translate(26 535.583) translate(73 .583) translate(4.15 3.567) translate(.85 .85) translate(.894 .894) rotate(-90 3.07 2.93)'
        />
        <path
          stroke='#2D76CB'
          fill='#003C7F'
          d='M8.928 1.02c-4.04 0-7.325 3.286-7.325 7.326 0 4.04 3.286 7.326 7.325 7.326 4.04 0 7.326-3.287 7.326-7.326 0-4.04-3.286-7.326-7.326-7.326zm0 15.254C4.557 16.274 1 12.717 1 8.346 1 3.974 4.557.417 8.928.417c4.372 0 7.929 3.557 7.929 7.929 0 4.371-3.557 7.928-7.929 7.928h0z'
          transform='translate(-129 -730) translate(30 194) translate(26 535.583) translate(73 .583)'
        />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgAdd);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
