import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'common/Header';
import { Footer } from 'common/Footer';

export const RouteLayout = () => {
  return (
    <div className="route-layout">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
