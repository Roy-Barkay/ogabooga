import * as React from 'react';

function SvgJewellery(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={40} height={40} ref={svgRef} {...props}>
      <g fill='#2D76CB' fillRule='evenodd'>
        <path
          d='M19.488 13.523c.14.153.326.209.503.19a.587.587 0 00.503-.19l5.9-6.446a.549.549 0 00.05-.682l-2.146-3.14A.596.596 0 0023.806 3H20.05l-.06.003L19.93 3h-3.755a.597.597 0 00-.493.255l-2.145 3.14a.548.548 0 00.05.682l5.9 6.446' />
        <path
          d='M21.755 14.298a9.44 9.44 0 014.922 2.611 9.424 9.424 0 012.778 6.709 9.423 9.423 0 01-2.778 6.708c-1.792 1.792-4.175 2.779-6.709 2.779s-4.917-.987-6.708-2.78a9.42 9.42 0 01-2.78-6.707c0-2.535.988-4.917 2.78-6.709a9.417 9.417 0 014.921-2.611l-3.256-3.71C9.703 12.61 6 17.68 6 23.618c0 7.714 6.254 13.968 13.968 13.968s13.968-6.254 13.968-13.968c0-5.937-3.703-11.007-8.924-13.03l-3.257 3.71z' />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgJewellery);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
