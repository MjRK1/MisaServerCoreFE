export interface IModuleService {
  host: string;
  port: string | number;
}
export interface IModuleServices {
  frontend: IModuleService;
  backend: IModuleService;
}

export interface IModule {
  name: string;
  enabled: boolean;
  repo: string;
  basePath: string;
  link: string;
  image: string;
  isExternal: boolean;
  services: IModuleServices;
}

export interface IModuleCardProps {
  module: IModule;
}

export interface IModulesProps {
  modules: IModule[];
}
