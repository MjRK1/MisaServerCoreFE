import React, { useEffect, useState } from 'react';
import { Tab, UrlParams } from 'types/commonComponents';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Tabs } from 'commonComponents/Tabs';
import { IModule } from 'types/Modules/modules';
import { useAuth } from 'hooks/AuthProvider';
import { MISA } from 'services/MISA/MISA';
import { message } from 'antd';
import { Modules } from 'components/Modules';

const HOME_TABS = [
  {
    id: 1,
    name: 'all',
    title: 'Все модули',
    content: null,
    additionalTabContent: null
  },
  {
    id: 2,
    name: 'enabled',
    title: 'Работающие модули',
    content: null,
    additionalTabContent: null
  }
];


export const HomePage = () => {
  const { accessToken } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [modules, setModules] = useState<IModule[]>([]);
  const [currentTab, setCurrentTab] = useState<Tab>();
  const navigate = useNavigate();
  const [urlParams, setUrlParams] = useState<UrlParams>({
    type: 'all',
  });

  useEffect(() => {
    setCurrentTab(HOME_TABS[0]);
    const searchParams = {
      type: urlParams.type,
    };
    navigate({
      pathname: window.location.pathname,
      search: createSearchParams({ ...searchParams }).toString()
    });
  }, []);

  useEffect(() => {
    MISA.getModules({token: accessToken})
      .then(async (data) => {
        const newModules =
          await Promise.all(
            data.data.map(async (module) => {
            let moduleImage: string | null = null;
            if (module.img) {
              try {
                const response = await MISA.getModuleImage({ token: accessToken, moduleName: module.name });
                moduleImage = URL.createObjectURL(response.data);
                return ({
                  name: module?.name,
                  enabled: module?.enabled,
                  repo: module?.repo,
                  basePath: module?.basePath,
                  link: module?.link,
                  image: moduleImage,
                  isExternal: module?.isExternal,
                  services: {...module?.services},
                });
              } catch (e) {
                messageApi.open({
                  type: 'error',
                  content: "Ошибка загрузки картинки модуля",
                });
              }
            }
            return {
              name: module?.name,
              enabled: module?.enabled,
              repo: module?.repo,
              basePath: module?.basePath,
              link: module?.link,
              image: null,
              isExternal: module?.isExternal,
              services: {...module?.services},
            };
          })
        );
        setModules([...newModules]);
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: 'Ошибка загрузки модулей',
        });
      });
  }, []);

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab);
    const searchParams = {
      type: tab.name
    };
    setUrlParams({type: tab.name});
    navigate({
      pathname: window.location.pathname,
      search: createSearchParams({ ...searchParams }).toString()
    });
    if (tab.name === 'enabled') {
      const newModules = modules.filter(item => item.enabled);
      setModules(newModules);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="home-page">
        <div className="home-page-tabs">
          <Tabs
            tabs={HOME_TABS}
            onTabChange={handleTabChange}
            currentTab={currentTab as Tab}
          />
        </div>
        <div className="home-page-tab__content">
          <Modules modules={modules} />
        </div>
      </div>
    </>
  );
};
