import * as React from 'react';
import SvgIconProps from './SvgIconInterface';

function SvgPlus(props: SvgIconProps, svgRef?: React.Ref<SVGSVGElement>) {
  const {secondary, disabled, focusable, ...pickedProps} = props;
  return (
    <>
      {!secondary ?
        <svg xmlns='http://www.w3.org/2000/svg' width={32} height={32} ref={svgRef} {...pickedProps}
             focusable={focusable}>
          <g fill='none' fillRule='evenodd'>
            <g
              transform='translate(-1126.000000, -761.000000) translate(730.000000, 655.000000) translate(396.000000, 106.000000)'>
              <circle cx='15.795' cy='15.795' r='15.795' fill={disabled ? '#E2ECF9' : '#2D76CB'} />
              <g stroke={disabled ? '#5C6266' : '#FFF'} strokeLinecap='round' strokeLinejoin='round'
                 strokeWidth='2.025'>
                <path d='M6.669 0L6.669 12.636'
                      transform='translate(9.126000, 9.828000)' />
                <path d='M6.669 0L6.669 12.636'
                      transform='translate(9.126000, 9.828000) translate(6.669000, 6.318000) rotate(-90.000000) translate(-6.669000, -6.318000)' />
              </g>
            </g>
          </g>
        </svg>
        :
        <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' ref={svgRef} {...pickedProps}
             focusable={focusable}>
          <g fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
            <g stroke={disabled ? '#5c6266' : '#2D76CB'}>
              <g
                transform='translate(-283 -549) translate(30 393) translate(133 116) translate(0 28) translate(120 12) translate(1 1)'>
                <circle cx='13' cy='13' r='13' strokeWidth='1.84' />
                <g strokeWidth='2'>
                  <path d='M5.018 0L5.018 9.58' transform='translate(8 8)' />
                  <path d='M5.018 0L5.018 9.58' transform='translate(8 8) rotate(-90 5.018 4.79)' />
                </g>
              </g>
            </g>
          </g>
        </svg>
      }
    </>
  );
}

const ForwardRef = React.forwardRef(SvgPlus);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
