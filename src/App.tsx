import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteLayout } from 'common/RouteLayout';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import AuthProvider from 'hooks/AuthProvider';
import { PrivateRoute } from 'common/PrivateRoute';
import { AuthPage } from 'pages/AuthPage';
import { ConfigProvider } from 'antd';
import { HomePage } from 'pages/HomePage';
import { ModulePage } from 'pages/ModulePage';
import { ErrorPage } from 'pages/ErrorPage';

function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider
        theme={
          {
            token: {
              colorPrimary: 'var(--color-white)',
              colorErrorHover: '#FF7474',
              colorError: '#FF7474',
              colorPrimaryHover: 'var(--color-white)',
              colorText: 'var(--color-black4)',
              colorTextQuaternary: 'var(--color-grey0)',
              fontSize: 16,
              fontFamily: 'Montserrat, sans-serif',
              colorBgContainer: 'var(--color-white)',
              controlHeight: 36,
              colorBgElevated: 'var(--color-white)',
              colorBorder: 'var(--color-lion)',
              colorBorderSecondary: 'var(--color-lion)',
              colorIcon: 'var(--color-white)',
            },
            components: {
              Button: {
                defaultHoverColor: 'var(--color-white)',
                colorPrimary: 'var(--color-white0)',
                colorPrimaryHover: 'var(--color-ecru)',
                colorText: 'var(--color-white)',
                colorBgContainer: 'var(--color-ecru)',
              },
              Input: {
                activeBorderColor: 'var(--color-lion)',
                activeShadow: 'var(--color-lion)',
                errorActiveShadow: 'var(--color-lion)',
                hoverBorderColor: 'var(--color-lion)',
                colorText: 'var(--color-black4)',
              },
              Form: {
                labelColor: 'var(--color-black4)',
              },
              Message: {
                contentBg: 'var(--color-ecru)',
                colorInfo: 'var(--color-white)',
                colorSuccess: 'var(--color-success)'
              }
            }
          }
        }
      >
        <AuthProvider>
          <Routes>
              <Route path="/core" element={<RouteLayout />}>
                <Route path="/core/auth" element={<AuthPage />} />
                <Route path="/core/error" element={<ErrorPage />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/core/error" element={<ErrorPage />} />
                  <Route path="/core/home" element={<HomePage />} />
                  <Route path="/core/settings" element={"settings"} />
                  <Route path="/core/modules" element={<ModulePage />} />
                </Route>
                <Route path="/core" element={<Navigate to="/core/auth" replace />} />
                <Route path="*" element={<Navigate to="/core/auth" replace />} />
              </Route>
          </Routes>
        </AuthProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
