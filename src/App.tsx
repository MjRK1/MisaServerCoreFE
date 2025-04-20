import React, { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteLayout } from 'common/RouteLayout';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import AuthProvider from 'hooks/AuthProvider';
import { PrivateRoute } from 'common/PrivateRoute';

function App() {


  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<RouteLayout />}>
              <Route path="/login" element={"login"} />
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={"home"} />
              </Route>
              <Route path="/" element={<Navigate to="/home" replace />} />d
            </Route>
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
