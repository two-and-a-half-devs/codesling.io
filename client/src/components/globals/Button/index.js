import React from 'react';

import Loading from '../Loading';

import './Button.css';

const Button = ({
  loading,
  text,
  color,
  error,
  type,
  className,
  onClick,
  id,
  backgroundColor
}) => {
  if (loading) {
    backgroundColor = 'gray';
  }
  if (error) {
    backgroundColor = 'red';
  }

  return (
    <div className={`button-container ${className ? className : ''}`}>
      <button
        id={id}
        className={`${color}-text palette-${backgroundColor} ${!text ? 'no-text' : ''}`}
        onClick={onClick}
        type={type}
      >
        {loading ? (
          <Loading color="black" />
        ) : (
          error ? error : (
            <span>
              {text}
            </span>
          )
        )}
      </button>
    </div>
  );
};

export default Button;
