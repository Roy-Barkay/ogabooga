import * as React from 'react';

function SvgCancel(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={19} height={19} ref={svgRef} {...props}>
      <g fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
        <path
          stroke='#2B70C2'
          strokeWidth='2'
          d='M0.63 9.45L18.27 9.45'
          transform='translate(-77 -418) translate(30 214) translate(26 123) translate(0 45) translate(17.065 32.065) rotate(45 6.718 16.218)'
        />
        <path
          stroke='#2B70C2'
          strokeWidth='2'
          d='M0.63 9.45L18.27 9.45'
          transform='translate(-77 -418) translate(30 214) translate(26 123) translate(0 45) translate(17.065 32.065) rotate(45 6.718 16.218) rotate(90 9.45 9.45)'
        />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCancel);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
