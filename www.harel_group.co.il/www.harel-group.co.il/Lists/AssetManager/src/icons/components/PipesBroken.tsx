import * as React from 'react';

function SvgPipesBroken(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={40} height={40} ref={svgRef} {...props}>
      <path
        d='M16.989 25.32c.555-.935.997-1.625 1.324-2.068.313-.425.832-1.039 1.557-1.84 1.506-1.87 2.632-2.805 3.512-3.587v-3.514h-.866l-1.3 1.137H2.65v9.872h14.34zm7.519 1.785h-.849v-6.494c-6.297 5.603-8.403 12.227-4.73 15.201a4.489 4.489 0 002.845 1.023c2.821 0 4.88-2.55 4.532-5.337-.227-1.81-1.225-3.178-1.798-4.393zm4.755-13.945h-3.586v6.756l2.933-1.536 1.375 2.624c.117-.06 2.372-1.243 2.559-1.34l1.097 2.092-1.183-1.754-2.674 1.803-1.484-2.2-2.623 1.768v3.992h3.586V23.38h8.588v-8.238h-8.588V13.16z'
        fill='#2D76CB'
        fillRule='evenodd'
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgPipesBroken);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
