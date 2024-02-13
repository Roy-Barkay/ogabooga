import React, {FC, useState} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

import styles from './Tabs.module.scss';

export interface TabsProps extends StylesAndBo {
  /**
   * activeTabIndex
   *
   * default: 0
   */
  activeTabIndex?: number;

  /**
   * onTabSelect callback
   */
  onTabSelect?: (index: number) => void;
}

export const Tabs: FC<TabsProps> = (props) => {
  const {style = {}, className, activeTabIndex, onTabSelect, bo = 'hds-tabs', children} = props;
  const [selectedIndex, setSelectedIndex] = useState(activeTabIndex || 0);
  const classes = toCssClass([styles.tabs, className]);

  const tabsContent = React.Children.map(children, (element, index) => {
    if (React.isValidElement(element) && selectedIndex === index) {
      return <div data-hrl-bo={`hds-tab-content-${index}`}>{element.props.children}</div>;
    }
    return <></>;
  });

  const tabs = React.Children.map(children, (element, index) => {
    if (React.isValidElement(element)) {
      return React.cloneElement(element, {
        bo: `hds-tab-header-${index}`,
        isActive: selectedIndex === index,
        onTabSelect: () => {
          setSelectedIndex(index);
          if (onTabSelect) {
            onTabSelect(index);
          }
        },
        children: null
      });
    }
    return <></>;
  });

  return (
    <div className={classes} style={style} data-hrl-bo={bo}>
      <div className='tab-header'>{tabs}</div>
      <div className='tab-content'>{tabsContent}</div>
    </div>
  );
};
