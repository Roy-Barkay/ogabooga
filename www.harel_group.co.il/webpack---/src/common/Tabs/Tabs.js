import React, { useState, Children } from 'react';
import PropTypes from 'prop-types';
import E from './Tabs.style';
import Tab from './Tab';


const randomString = (prefix) => `${prefix}-${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`;

const Tabs = (props) => {
  const { children, active, onClick, stayOn } = props;
  const [activeTab, setActiveTab] = useState(active);
  const tabId = randomString('tab');
  const tabPanelId = randomString('tabPanel');
  
  const tabsList = Children.map(children, (child, index) => {
    const { label, icon, tabkey, width, display, onClick } = child.props;
    if (display === null) display = true;
    
    const onClickTabItem = (tab) => {
      setActiveTab(tab);
      onClick(tab);
    }

    return display 
      ? (
        <Tab
          active={tabkey === activeTab}
          tabkey={tabkey}
          key={tabkey}
          label={label}
          icon={icon}
          onClick={onClickTabItem}
          width={width}
          id={`${tabId}-${index}`}
          controls={`${tabPanelId}-${index}`}
        />
      )
    : null;
  })
  
  
  const tabsContent = Children.map(children, (child, index) => {
    const { tabkey, display } = child.props;
    const className = (stayOn && tabkey !== activeTab) ? 'hide' : null;

    if (display === null) display = true;
    
    if (child.props.tabkey !== activeTab && !stayOn) return undefined;
    return display 
      ? <div className={className} role="tabpanel" id={`${tabPanelId}-${index}`}>{child.props.children}</div>
      : null;
  })
  
  
  return (
    <E.Tabs>
      <E.TabsList role="tablist">{tabsList}</E.TabsList>
      <E.TabsContent>{tabsContent}</E.TabsContent>
    </E.Tabs>
  )
}

Tabs.Tab = Tab;

Tabs.propTypes = {
  /**
   * Set the active tab by key
   */
  active: PropTypes.string,
  onClick: PropTypes.func,
  /**
   * If true, leave tab content on screen just hide or show the tab using css
   */
  stayOn: PropTypes.bool,
}

Tabs.defaultProps = {
  stayOn: false,
}

export default Tabs;