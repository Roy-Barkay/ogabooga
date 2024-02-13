import * as React from 'react';

function SvgGarage(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={111} height={111} ref={svgRef} {...props}>
      <g fill='#2D76CB' fillRule='evenodd'>
        <path
          d='M101.15 40.665v4.265c0 1.108-.804 2.01-1.8 2.01h-3.96v45.05c0 1.11-.804 2.01-1.8 2.01h-5.039c-.995 0-1.8-.9-1.8-2.01V46.94H23.399v45.05c0 1.11-.804 2.01-1.8 2.01H16.56c-.996 0-1.8-.9-1.8-2.01V46.94H10.8c-.995 0-1.8-.903-1.8-2.01v-4.265c0-1.115.602-2.12 1.53-2.543L53.81 18.28a3 3 0 012.53 0l43.28 19.842c.928.424 1.53 1.428 1.53 2.543z' />
        <path
          d='M81.092 62.65H29.058c-.585 0-1.058.498-1.058 1.113v3.474c0 .615.473 1.113 1.058 1.113h52.034c.585 0 1.058-.498 1.058-1.113v-3.474c0-.615-.473-1.113-1.058-1.113zm0 8.55H29.058c-.585 0-1.058.498-1.058 1.113v3.474c0 .615.473 1.113 1.058 1.113h52.034c.585 0 1.058-.498 1.058-1.113v-3.474c0-.615-.473-1.113-1.058-1.113zm0-18.05H29.058c-.585 0-1.058.498-1.058 1.114v3.472c0 .615.473 1.114 1.058 1.114h52.034c.585 0 1.058-.499 1.058-1.114v-3.472c0-.616-.473-1.114-1.058-1.114z' />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgGarage);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
