import React from 'react'

function IconRef({ name, viewBox }) {
  return (
    <svg viewBox={viewBox} focusable="false">
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}
export default IconRef;