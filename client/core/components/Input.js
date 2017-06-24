import React from 'react';

export default ({
  value = '',
  name = '',
  required,
  type = 'text',
  placeholder = '',
  onChange,
  defaultValue,
}) => {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
