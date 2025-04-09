import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { RouteLayout } from 'common/RouteLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RouteLayout />}>

      </Route>
    </Routes>
  );
}

export default App;
