import React from 'react';


export default ({ onChange, items, name, defaultValue = '', label = null }) => {
  return (
    <select onChange={onChange} name={name} defaultValue={defaultValue}>
      {label &&
        <option value="">{label}</option>
      }
      {items.map(x => (
        <option key={x._id} value={x._id}>
          {x.desc}
        </option>))}
    </select>
  );
}
