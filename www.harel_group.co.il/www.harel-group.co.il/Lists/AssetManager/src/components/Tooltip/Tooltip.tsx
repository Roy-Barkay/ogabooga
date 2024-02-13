import React, {FC, useEffect, useRef, useState} from 'react';
import {getTooltipPosition} from './getTooltipPosition';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

import styles from './Tooltip.module.scss';

export interface TooltipProps extends StylesAndBo {
  /**
   * Tooltip id
   */
  id?: string;

  /**
   * Tooltip text
   */
  text: string | (() => JSX.Element);

  /**
   * Tooltip position
   */
  placement?:
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'left-start'
    | 'left'
    | 'left-end';

  /**
   * Manage tooltip state from parent component.
   */
  isOpen?: boolean;
}

export const Tooltip: FC<TooltipProps> = (props) => {
  const {
    id = 'tooltip',
    text,
    isOpen = null,
    placement = 'bottom',
    style = {},
    className,
    bo = 'hds-tooltip',
    children
  } = props;

  const elementRef = useRef<HTMLSpanElement>();
  const tooltipRef = useRef<HTMLDivElement>();

  const [isShown, setIsShown] = useState(!!isOpen);
  const [position, setPosition] = useState({});

  const onMouseOver = () => {
    if (isOpen === null) {
      setIsShown(true);
    }
  };

  const onMouseOut = () => {
    if (isOpen === null) {
      setIsShown(false);
    }
  };

  useEffect(() => {
    const bottomValue = isShown ? {bottom: '25px'} : {bottom: '50000px'};
    if (isShown || isOpen) {
      if (elementRef.current && tooltipRef.current) {
        const holderRect = elementRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const position = getTooltipPosition(holderRect, tooltipRect, placement, window.scrollY || window.pageYOffset);
        setPosition({...position, bottomValue});
      }
    } else {
      setPosition({bottomValue});
    }

  }, [isShown, placement, isOpen]);

  const classes = toCssClass([styles.tooltip, className, placement]);

  const tooltipElement = (
    <div
      id={id}
      ref={tooltipRef as React.MutableRefObject<HTMLDivElement>}
      className={classes}
      style={{...position, ...style}}
      data-hrl-bo={bo}
      role='tooltip'
    >
      {typeof text === 'function' ? text() : text}
    </div>
  );

  return (
    <span
      id={`${id}-holder`}
      onMouseOver={() => onMouseOver()}
      onMouseOut={() => onMouseOut()}
      onFocus={() => onMouseOver()}
      onBlur={() => onMouseOut()}
      className={styles.tooltipHolder}
      ref={elementRef as React.MutableRefObject<HTMLSpanElement>}
      data-hrl-bo={`${bo}-holder`}
    >
      {children}
      {tooltipElement}
    </span>
  );
};
