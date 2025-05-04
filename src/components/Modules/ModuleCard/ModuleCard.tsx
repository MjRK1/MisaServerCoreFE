import React from 'react';
import { IModuleCardProps } from 'types/Modules/modules';
import { ArrowRightOutlined, ToolOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';


export const ModuleCard = (props: IModuleCardProps) => {
  const {
    module
  } = props;

  const navigate = useNavigate();

  const renderModuleIcon = () => {
    if (module.image) return <img src={module.image} alt="" className="module-card-icon" />;
    return (
      <div className="module-icon">
        <ToolOutlined />
      </div>
    );
  };

  const handleRedirect = () => {
    if (module.isExternal) {
      window.open(`http://${module?.services?.frontend?.host}:${module?.services?.frontend?.port}`, '_blank');
    } else {
      navigate(`/core/modules/${module.basePath}/home`);
    }
  };

  return (
    <div className="module-card">
      <div className="module-card-header">
        <div className="module-card-header__module-card-icon">{renderModuleIcon()}</div>
        <div className="module-card-header__title">{module.name}</div>
      </div>
      <div className="module-card-footer">
        <div
          className={cn('module-card-footer__indicator', {
            'module-card-footer__indicator--enabled': module.enabled,
            'module-card-footer__indicator--disabled': !module.enabled,
          })}
        />
        <div
          className="module-card-footer__redirect-button"
          onClick={handleRedirect}
        >
          <div className="module-card-footer__title">Перейти</div>
          <div className="module-card-redirect-button__icon">
            <ArrowRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
