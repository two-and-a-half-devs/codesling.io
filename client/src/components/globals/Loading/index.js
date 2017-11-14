import React from 'react';

import './Loading.scss';

const Loading = ({ color }) => {
  let cssStyles = {
    backgroundColor: color === 'black' ? '#000' : '#fff',
  };
  return (
    <div className="spinner">
      <div style={cssStyles} className="double-bounce1"></div>
      <div style={cssStyles} className="double-bounce2"></div>
    </div>
  );
};

export default Loading;
