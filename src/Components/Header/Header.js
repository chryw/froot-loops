import React from 'react';
import './Header.css';
import SiteNav from '../SiteNav/SiteNav';
import logo from './assets/logo.svg';

const Header = () => (
  <header className="Header ms-bgColor-neutralPrimary ms-fontColor-white">
    <div className="Header-brand">
      <img className="Header-logo" src={logo} alt="D3 Assets" />
      <span className="Header-name">
        {'D3 Assets'}
      </span>
    </div>
    <SiteNav />
  </header>
);

export default Header;
