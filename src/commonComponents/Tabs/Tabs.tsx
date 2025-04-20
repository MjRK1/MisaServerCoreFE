import React from 'react';
import { ITabs } from 'types/commonComponents';
import cn from 'classnames';


export const Tabs = (props: ITabs) => {
  const {
    tabs,
    currentTab,
    onTabChange,
  } = props;

  return (
    <div className="tabs">
      <div className="tabs-list">
        {tabs?.map(tab => (
          <div
            key={tab.id}
            className={cn('tab', {
              'tab--active': currentTab?.id === tab?.id
            })}
            onClick={() => onTabChange(tab)}
          >
            <div
              className="tab-title">
              {tab.title}
            </div>
          </div>
        ))}
      </div>
      {currentTab?.additionalTabContent && (
        <div className="additional-tab-content">
          {currentTab.additionalTabContent}
        </div>
      )}
    </div>
  );
};
