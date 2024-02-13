import React, {FC} from 'react';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {toCssClass} from '../../fp';
import styles from './Col.module.scss';

export interface ColProps extends StylesAndBo {
  xs?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  sm?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  md?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  lg?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  xl?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  xxl?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

  'xs-offset'?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  'sm-offset'?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  'md-offset'?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  'lg-offset'?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  'xl-offset'?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  'xxl-offset'?: 'auto' | number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}

export const Col: FC<ColProps> = (props) => {
  const {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    'xs-offset': xsOffset,
    'sm-offset': smOffset,
    'md-offset': mdOffset,
    'lg-offset': lgOffset,
    'xl-offset': xlOffset,
    'xxl-offset': xxlOffset,
    style = {},
    className,
    bo = 'hds-col',
    children
  } = props;

  const modifiers = [
    xs && `${xs}`,
    sm && `sm-${sm}`,
    md && `md-${md}`,
    lg && `lg-${lg}`,
    xl && `xl-${xl}`,
    xxl && `xxl-${xxl}`,
    xsOffset && `offset-xs-${xsOffset}`,
    smOffset && `offset-sm-${smOffset}`,
    mdOffset && `offset-md-${mdOffset}`,
    lgOffset && `offset-lg-${lgOffset}`,
    xlOffset && `offset-xl-${xlOffset}`,
    xxlOffset && `offset-xxl-${xxlOffset}`
  ]
    .filter((e) => e)
    .map((e) => `col-${e}`);

  const classes = toCssClass([styles.col, className, ...modifiers]);

  return (<div className={classes} style={style} data-hrl-bo={bo}>{children}</div>);
};
