import * as React from 'react';

function SvgLaptop(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={111} height={111} ref={svgRef} {...props}>
      <g fill='none' fillRule='evenodd'>
        <path fill='#FFF' d='M18.719 28.184h74.214v45.942H18.719z' />
        <path
          d='M90.082 22c3.593 0 6.522 2.93 6.522 6.522v49.359c0 .774-.636 1.382-1.382 1.382H15.851a1.386 1.386 0 01-1.382-1.382V28.522c0-3.592 2.93-6.522 6.521-6.522zm-.684 8.834l-68.03.001v40.641h68.03V30.834zm-33.862-7.148c-.829 0-1.52.69-1.52 1.52 0 .83.691 1.52 1.52 1.52.829 0 1.52-.69 1.52-1.52 0-.83-.691-1.52-1.52-1.52zm45.158 57.079H65.927v2.321H45.145v-2.32H10.378c-.47 0-.94.247-1.188.662-.248.414-.248.912-.028 1.355a11.244 11.244 0 009.977 6.08h72.794c4.2 0 8.043-2.35 9.977-6.08.221-.443.221-.94-.028-1.355a1.4 1.4 0 00-1.188-.663'
          fill='#2D76CB'
        />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgLaptop);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
