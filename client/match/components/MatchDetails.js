import React from 'react';

export default function({ model }){
  return (
    <div>
      {model.link
        ? <div>
          <iframe
            width="auto"
            height="315"
            src={`https://www.youtube.com/embed/${model.link.split('watch?v=')[1]}`}
            frameBorder="0"
            allowFullScreen
          >
          </iframe>
          </div>
        : <p>No Video :(</p>
        }

    </div>
  );
}
