import React from 'react';
import Match from './TableRow';

function getTeamDesc(teams) {
  return function (id) {
    const team = teams.find(t => t._id === id);
		return team ? team.desc : 'N/A';
  }
}

const Matches = ({ event, isPlayed, ...rest }) => {
  console.log('match', rest);
  const filtered = event.matchesFull.filter(x =>
		isPlayed
		? (x.homeScore && x.guestScore)
		: !x.homeScore || !x.guestScore
	);

	return (
		<div>
			<table className="table table-striped table-bordered table-condensed">
				<thead>
					<tr>
						<th>#</th>
						<th>Home</th>
						<th>Result</th>
						<th>Guest</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{filtered.slice().reverse().map((t, index) => {
						return (
              <Match
                key={t._id}
                index={index}
                match={t}
                event={event}
                onClick={rest.onClickMatch}
              />
            )})}
				</tbody>
			</table>
		</div>
	);
};

export default Matches;
