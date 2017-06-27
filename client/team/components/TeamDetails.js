import React from 'react';

export default function({ model }) {
  console.log(model);
  return (
    <div>
      <h3>Team: {model.desc}{' '}

        </h3>
        {model.link &&
          <p>Webiste: <a href={model.link} target="_blank">
            {model.link}</a>
          </p>
        }
    </div>
  );
}
