import React from 'react';

export default function({ model }) {
  console.log(model);
  return (
    <div>
      {model.logo && <img src={model.logo} widht="50px" height="50px" />}
      <h3>{model.desc}</h3>
        {model.info &&
          <p>Info: {' '}
            <span className="text-info">{model.info}</span>
          </p>
        }


        {model.city &&
          <p>City: {' '}
            <span className="text-info">{model.city}</span>
          </p>
        }

        {model.sponsor &&
          <p>Sponsor: {' '}
            <span className="text-info">{model.sponsor}</span>
          </p>
        }


        {model.link &&
          <p>Webiste: <a className="text-info" href={model.link} target="_blank">
            {model.link}</a>
          </p>
        }
    </div>
  );
}
