import * as React from 'react';

function ClearIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 19 19' ref={svgRef} {...props}>
      <g fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
        <g stroke='#2D76CB' strokeWidth='1.5'>
          <path d='M0.413 6.196L11.978 6.196'
                transform='translate(-647 -806) translate(596 790) translate(52 16) rotate(45 3.36 10.63)' />
          <path d='M0.413 6.196L11.978 6.196'
                transform='translate(-647 -806) translate(596 790) translate(52 16) rotate(45 3.36 10.63) rotate(90 6.196 6.196)' />
        </g>
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(ClearIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
