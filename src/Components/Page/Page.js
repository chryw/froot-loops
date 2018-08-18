import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import PageHeader from './PageHeader/PageHeader';
import './Page.css';

const Page = (props) => {
  const {
    title,
    intro,
    navItems,
    children,
  } = props;
  return (
    <Router basename="/">
      <div className="Page">
        <PageHeader
          title={title}
          intro={intro}
          navItems={navItems}
        />
        <div className="Page-body">
          {children}
        </div>
      </div>
    </Router>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string,
  navItems: PropTypes.array,
  children: PropTypes.array.isRequired,
};

Page.defaultProps = {
  intro: '',
  navItems: [],
};

export default Page;
