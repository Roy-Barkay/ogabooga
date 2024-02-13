import * as React from 'react';

function SvgCamera(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' ref={svgRef} {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M.929 6L8 12.238 15.071 6'
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCamera);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
