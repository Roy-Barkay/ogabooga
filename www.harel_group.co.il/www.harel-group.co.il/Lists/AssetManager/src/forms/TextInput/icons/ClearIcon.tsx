import * as React from 'react';

function ClearIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg ref={svgRef} width='20px' height='20px' viewBox='0 0 20 20' version='1.1' {...props}>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
        <g transform='translate(-655.000000, -560.000000)' stroke='#003C7F' strokeWidth='1.5'>
          <g transform='translate(647.000000, 535.000000)'>
            <g transform='translate(7.000000, 24.000000)'>
              <g
                transform='translate(11.106602, 11.106602) rotate(-315.000000) translate(-11.106602, -11.106602) translate(3.606602, 3.606602)'>
                <line x1='0.5' y1='7.5' x2='14.5' y2='7.5' />
                <line x1='0.5' y1='7.5' x2='14.5' y2='7.5'
                      transform='translate(7.500000, 7.500000) rotate(-270.000000) translate(-7.500000, -7.500000) ' />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(ClearIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
