export interface IModule {
  name: string;
  enabled: boolean;
  repo: string;
  basePath: string;
  link: string;
  image: string;
}

export interface IModuleCardProps {
  module: IModule;
}

export interface IModulesProps {
  modules: IModule[];
}
