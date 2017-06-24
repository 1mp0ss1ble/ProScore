import React from 'react';

export default ({ value, disabled, onClick, type = 'default' }) => {

  return (
    <button disabled={disabled} onClick={onClick} className={`btn btn-${type}`} >
      {value}
    </button>
  );
};
