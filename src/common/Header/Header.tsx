import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from 'services/redux/store';

export const Header = () => {
  // const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="header">
      <div className="header__logo">
        <div className="logo-icon">
          <img src="/images/MisaServerWithoutTextBrown.png" alt="logo" />
        </div>
        <div className="logo-title">
          Misa Server
        </div>
      </div>
      <div className="header__user">

      </div>
    </div>
  );
};
