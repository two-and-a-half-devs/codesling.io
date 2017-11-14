import React from 'react';

import './Input.scss';

const Input = ({
  type,
  name,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
