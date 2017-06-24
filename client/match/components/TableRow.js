import React from 'react';


export default function({ event, index, match, onClick, hideDetails = true }) {

	const home = event.teamsFull.find(x => x._id === match.homeId);
	const	guest = event.teamsFull.find(x => x._id === match.guestId);
	const date = match.date;
	const resultText = match.homeScore && match.guestScore ?
		match.homeScore + ' : ' + match.guestScore : ' ? : ? ';
  const homeDesc = home ? home.desc : 'removed';
  const guestDesc = guest ? guest.desc : 'removed';

	return (
		<tr className="link" onClick={() => onClick(match)}>
			<td>{index + 1}</td>
			<td>{homeDesc}</td>
			<td>{' '}{resultText }{' '}</td>
			<td>{guestDesc}</td>
			<td>
				{!hideDetails &&
					<span> {' '} <span> {eventArray.join(' | ')}</span> </span>
				}
				{' '}{date}
			</td>
		</tr>
	);
}
