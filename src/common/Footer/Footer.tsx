import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <a
          className="footer-links__footer-item"
          href="https://github.com/MjRK1/MisaServerCoreFE/tree/develop"
          target="_blank"
        >
          <div className="footer-item__item-icon">
            <GithubOutlined />
          </div>
          <div className="footer-item__item-title">
            Github
          </div>
        </a>
      </div>
      <div className="footer-copyright">
          MisaServer 2025
      </div>
    </div>
  );
};
