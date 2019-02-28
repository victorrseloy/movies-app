import React from 'react';
import './style.scss';

const errorImg = require('./img/error.gif');

const ErrorDisplay = () => {
  return (
    <div className="error-display">
      <img alt="" src={errorImg} />
      <span className="error-display-info">
        Something wen wrong please try again later.
      </span>
    </div>
  );
};

export default ErrorDisplay;
