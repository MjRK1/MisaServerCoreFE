import React from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from 'hooks/AuthProvider';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigator = useNavigate();

  const navigationTabs = [
    {
      id: 1,
      name: 'home',
      title: 'Главная',
      path: '/core/home'
    },
    // {
    //   id: 2,
    //   name: 'settings',
    //   title: 'Настройки',
    //   path: '/core/settings'
    // },
  ];

  return (
    <div className="header">
      <div className="header__logo" onClick={() => navigator('/core/home')}>
        <div className="logo-icon">
          <img src="/core/images/MisaServerWithoutTextBrown.png" alt="logo" />
        </div>
        <div className="logo-title">Misa Server</div>
      </div>
      {user?.id && (
        <div className="header__header-navigation">
          {navigationTabs.map((tab) => (
            <motion.div
              key={tab.id}
              className="header-navigation__navigation-tab"
              onClick={() => navigator(tab.path)}
            >
              <div
                className={cn('navigation-tab__title', {
                  "navigation-tab__title--active": window.location.pathname === tab.path
                })}
              >
                {tab?.title}
              </div>
              {window.location.pathname === tab.path && (
                <motion.div
                  layoutId="underline"
                  layout
                  className="navigation-tab__active-underline"
                />
              )}
              {window.location.pathname !== tab.path && (
                <div className="navigation-tab__inactive-underline" />
              )}
            </motion.div>
          ))}
        </div>
      )}
      {user?.id && (
        <div className="header__header-user">
          <div className="header-user__header-user-info">
            <div className="header-user-info__icon">
              <UserOutlined />
            </div>
            <div className="header-user-info__display-name">{user?.displayName}</div>
          </div>
          <div
            className="header-user__logout-button"
            onClick={() => {
              if (logout) logout();
            }}
          >
            <LogoutOutlined />
          </div>
        </div>
      )}
    </div>
  );
};
