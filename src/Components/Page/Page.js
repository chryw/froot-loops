import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import './Page.css';

const Page = (props) => {
  const {
    title,
    children,
  } = props;
  return (
    <Router basename="/">
      <div className="Page">
        <div className="Page-header ms-bgColor-purple ms-fontColor-white">
          <h1 className="Page-title">
            {title}
          </h1>
        </div>
        <div className="Page-body">
          {children}
        </div>
      </div>
    </Router>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
};

Page.defaultProps = {
  children: {},
};

export default Page;
