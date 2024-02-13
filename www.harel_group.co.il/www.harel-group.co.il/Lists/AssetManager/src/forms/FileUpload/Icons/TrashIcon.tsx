import * as React from 'react';

function SvgTrash(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={17} height={20} ref={svgRef} {...props}>
      <g fill='none' fillRule='evenodd'>
        <path
          fill='#2D76CB'
          stroke='#2D76CB'
          strokeWidth='.6'
          d='M14.433 2.584h-3.485v-.609C10.948.886 10.122 0 9.106 0H5.793C4.777 0 3.95.886 3.95 1.975v.61H.465c-.258 0-.465.22-.465.498 0 .277.207.498.465.498h.84v11.71c0 1.47 1.116 2.666 2.487 2.666h7.314c1.371 0 2.487-1.197 2.487-2.666V3.581h.84c.259 0 .465-.221.465-.498s-.206-.499-.465-.499zM4.88 1.975c0-.539.41-.978.913-.978h3.313c.502 0 .912.44.912.978v.61H4.88v-.61zm7.783 13.316c0 .92-.699 1.669-1.557 1.669H3.792c-.858 0-1.557-.75-1.557-1.669V3.581h10.431v11.71h-.003z'
          transform='translate(-78 -576) translate(30 194) translate(26 321) translate(0 26) translate(23 36)'
        />
        <path
          fill='#2D76CB'
          stroke='#2D76CB'
          strokeWidth='.6'
          d='M7.449 15.173c.258 0 .465-.222.465-.498V5.866c0-.277-.207-.498-.465-.498s-.465.221-.465.498v8.805c0 .277.207.502.465.502zM4.415 14.623c.258 0 .465-.222.465-.499V6.413c0-.277-.207-.499-.465-.499s-.465.222-.465.499v7.711c0 .277.21.499.465.499zM10.483 14.623c.258 0 .465-.222.465-.499V6.413c0-.277-.207-.499-.465-.499s-.465.222-.465.499v7.711c0 .277.207.499.465.499z'
          transform='translate(-78 -576) translate(30 194) translate(26 321) translate(0 26) translate(23 36)'
        />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgTrash);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
