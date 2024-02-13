import * as React from 'react';

function SvgInfo(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={18} height={18} ref={svgRef} {...props}>
      <g fill='none' fillRule='evenodd'>
        <path
          fill='#2D76CB'
          stroke='#2D76CB'
          d='M8.928 1.603c-4.04 0-7.325 3.286-7.325 7.325 0 4.04 3.286 7.326 7.325 7.326 4.04 0 7.326-3.286 7.326-7.326 0-4.04-3.286-7.325-7.326-7.325zm0 15.254C4.557 16.857 1 13.3 1 8.928 1 4.557 4.557 1 8.928 1c4.372 0 7.929 3.557 7.929 7.928 0 4.372-3.557 7.929-7.929 7.929h0z'
          transform='translate(-57 -515) translate(30 194) translate(26 321) translate(1)'
        />
        <path
          fill='#2D76CB'
          stroke='#2D76CB'
          strokeWidth='.84'
          d='M.896 9.03c-.376 0-.588-.154-.7-.283C.07 8.6-.061 8.332.03 7.878.158 7.26.515 5.575.77 4.377l.166-.786C.95 3.524.92 3.476.9 3.454c-.02-.023-.064-.06-.136-.06H.357c-.193 0-.348-.15-.348-.332 0-.184.155-.332.348-.332h.407c.263 0 .509.11.675.304.166.192.231.443.18.687l-.166.787c-.254 1.196-.61 2.88-.738 3.497-.036.178-.012.284.019.32.033.038.124.042.162.042.101 0 .421-.134.672-.282.163-.096.378-.048.48.107.101.156.05.36-.113.457-.15.089-.673.381-1.039.381'
          transform='translate(-57 -515) translate(30 194) translate(26 321) translate(1) rotate(35 -1.16 19.786)'
        />
        <path
          fill='#2D76CB'
          stroke='#2D76CB'
          strokeWidth='.525'
          d='M1.542.666c0 .368-.298.666-.666.666-.368 0-.666-.298-.666-.666C.21.298.508 0 .876 0c.368 0 .666.298.666.666'
          transform='translate(-57 -515) translate(30 194) translate(26 321) translate(1) rotate(35 -1.16 19.786)'
        />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgInfo);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
