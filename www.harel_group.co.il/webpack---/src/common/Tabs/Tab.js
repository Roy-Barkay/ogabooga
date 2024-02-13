import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import E from './Tab.style';

const Tab = (props) => {
  const { tabkey, label, onClick, icon, active, width, display, id, controls } = props;

  const handleTabClick = () => {
    onClick(tabkey);
  }

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      onClick(tabkey);
    }
  }
  
  const tabLabel = label 
    ? label.split('|').map((item, key) => { return <Fragment key={key}>{item}<br/></Fragment> })
    : null;
  
  return (
    <E.Tab 
      onClick={handleTabClick}
      active={active}
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      id={id}
      tabIndex="0"
      onKeyPress={handleKeyPress}
    >
      {icon && <E.TabAvatar style={width ? {width: `${width}px`} : null && display ? {display : 'none'}: null}  >{icon}</E.TabAvatar>}
      {label && <E.TabLabel>{tabLabel}</E.TabLabel>}
    </E.Tab>
  )
}

Tab.propTypes = {
  /**
   * Tab avatar
   */
  avatar: PropTypes.element,
  
  /**
   * Tab label
   */
  label: PropTypes.string,
   onClick: PropTypes.func,
}

export default Tab;