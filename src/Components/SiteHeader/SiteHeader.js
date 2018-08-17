import React from 'react';
import './SiteHeader.css';
import SiteNav from '../SiteNav/SiteNav';
import logo from './assets/logo.svg';

const SiteHeader = () => (
  <header className="SiteHeader ms-bgColor-neutralPrimary ms-fontColor-white">
    <div className="SiteHeader-brand">
      <img className="SiteHeader-logo" src={logo} alt="D3 Assets" />
      <span className="SiteHeader-name">
        {'D3 Assets'}
      </span>
    </div>
    <SiteNav />
  </header>
);

export default SiteHeader;
