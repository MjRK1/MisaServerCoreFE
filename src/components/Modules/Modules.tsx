import React from 'react';
import { IModulesProps } from 'types/Modules/modules';
import { ModuleCard } from 'components/Modules/ModuleCard';


export const Modules = (props: IModulesProps) => {
  const {
    modules
  } = props;
  return (
    <div className="modules">
      {modules.map((module) => (
        <ModuleCard key={module.name} module={module} />
      ))}
    </div>
  );
};
