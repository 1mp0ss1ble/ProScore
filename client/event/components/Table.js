import React from 'react';
import match from '../../match';

function showMatchInfo(e) {
  // console.log(e.target.innerHTML);
	if (!e.target.innerHTML) {
		e.target.innerHTML = e.target.title;
	} else {
		e.target.innerHTML = '';
	}
  // e.target.innerHTML = 111;
}


function geneateColumns(len, team, teamsFull) {
	const ret = [];
	let matchesArr = [];
	if (team) {
		matchesArr = team.matches.sort((a, b) => a.round > b.round);
	}

	for (let i = 0; i < len; i += 1) {
		if (team) {
			const currMatch = matchesArr[i];
			let bgColor = 'grey';
			let title = 'not played yet';
			const showMatchInfoFn = showMatchInfo;
			if (currMatch) {
				let score = currMatch.homeScore - currMatch.guestScore;
				const isHomeTeam = team._id === currMatch.homeId;
				score = isHomeTeam ? score : score * -1;
				const rivalTeamId = isHomeTeam ? currMatch.guestId : currMatch.homeId;
				const rivalTeam = teamsFull.find(x => x._id === rivalTeamId);
				const rivalTeamDesc = rivalTeam ? rivalTeam.desc : 'removed';
				if (score || score === 0) {
					bgColor = score > 0
						? '#8BC34A'
						: score === 0
							? '#CDDC39'
							: '#FF7043';
					title = currMatch.homeScore + ':'
					+ currMatch.guestScore + ' vs '
					+ rivalTeamDesc + ' / ' + currMatch.round;
				}
				// console.log(currMatch);
			}
			ret.push(
				<td
					key={i}
					onClick={showMatchInfoFn}
					title={title}
					style={{
						backgroundColor: bgColor,
						cursor: 'pointer',
						color: 'black' }}
				>
				</td>
			);
		} else {
			ret.push(<td key={i}> {i + 1} </td>);
		}
	}
	return ret;
}

function getTable(obj) {
	const teams = obj.teamsFull;
	const allMatches = obj.matchesFull;
	let maxPlayedMatches = 0;

	const tableArr = teams.map((team) => {
		const matches = allMatches.filter(x =>
			x.homeId === team._id || x.guestId === team._id);

		const score = {
			win: 0,
			draw: 0,
			lose: 0,
			getTotal() { return (this.win * 3) + this.draw; },
			setScore(result) {
				if (result == null) return;
				this.draw = result === 0 ? this.draw += 1 : this.draw;
				this.win = result > 0 ? this.win += 1 : this.win;
				this.lose = result < 0 ? this.lose += 1 : this.lose;
			},
		};

		matches.forEach(x => {
			const isHomeTeam = x.homeId === team._id;
			let matchResult = x.homeScore - x.guestScore;
			matchResult = isHomeTeam ? matchResult : matchResult * -1;
			score.setScore(matchResult);
		});

		maxPlayedMatches = maxPlayedMatches < matches.length
								? matches.length
								: maxPlayedMatches;
		return { ...team, score, matches, maxPlayedMatches };
	});

	return { maxPlayedMatches, tableArr };
}

export default function Table({ obj, ...rest }) {
	console.log('rest!!', obj.teamsFull);
	// const matches = obj.matchesFull || []; //allMatches.filter(m => m.eventId === obj._id);
	// const teamsFull = obj.teamsFull || []


	if (!obj || !obj.teams.length) {
		return <div>no teams...</div>;
	}

	const { maxPlayedMatches, tableArr } = getTable(obj);

	// order by total points
	tableArr.sort((a, b) => {
		if (a.score.getTotal() === b.score.getTotal()) {
			return a.desc.toLowerCase().localeCompare(b.desc.toLowerCase());
		}
		return b.score.getTotal() - a.score.getTotal();
	});


	return (
		<div>
			<div className="row">
    		<div className="col-md-6 col-md-offset-3">
					<h3>{obj.desc}</h3>
				</div>
			</div>
			<h4>Results</h4>
			<table className="table table-striped table-bordered table-condensed table-hover">
				<thead>
					<tr className="text-bold">
						<td>#</td>
						<td>Team</td>
						{geneateColumns(maxPlayedMatches)}
						<td>W/D/L</td>
						<td title="score">S</td>
					</tr>
				</thead>
				<tbody>
					{tableArr.map((t, index) => (
						<tr key={t._id}>
							<td>{index + 1}</td>
							<td
								className="link"
								onClick={() => rest.onClickTeam(t)}
							>
								{t.desc}
							</td>
							{geneateColumns(maxPlayedMatches, t, obj.teamsFull)}
							<td>{t.score.win}/{t.score.draw}/{t.score.lose}</td>
							<td>{t.score.getTotal()}</td>
						</tr>))}
				</tbody>
			</table>
			<hr />

			<h3>Matches</h3>

			<h4>Upcoming</h4>
			{<match.components.Table event={obj} {...rest} />}

			<h4>Played</h4>
			{<match.components.Table event={obj} {...rest} isPlayed />}
		</div>
	);
}
