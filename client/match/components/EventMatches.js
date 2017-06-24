import React from 'react';


export default ({ eventObj }) => {
  const matches = eventObj.matchesFull;
  const teams = eventObj.teamsFull;

  const upcoming = matches.filter(x => !x.homeScore || !x.guestScore);
  const played = matches.filter(x => x.homeScore && x.guestScore);

  return (
    <div>
      <h3>Matches</h3>
      <h4>Upcoming</h4>
      {upcoming.length}

      <h4>Played</h4>
      {played.length}
    </div>
  );
};
