import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../core/components';
import team from '../../team';
import match from '../';
import event from '../../event';


const getEventTitle = (id, events) => {
  const ret = events.find(x => x._id === id);
  return ret ? ret.desc : 'removed Event';
};

const getTeams = (matchObj, teams) => {
  const team1 = teams.find(x => x._id === matchObj.homeId);
  const team2 = teams.find(x => x._id === matchObj.guestId);

  return (team1 ? team1.desc : 'removed')
        + ' vs '
        + (team2 ? team2.desc : 'removed');
};

const Admin = ({ showModal, matches, teams, events }) => {
  return (
    <div>
      <Button
        value="Add"
        type="primary"
        onClick={() => showModal(null)}
      />
      <h4>Matches({matches.items.length})</h4>
      <ol>
        {matches.items.map(e => (
          <li key={e._id}>
            <span className="link" onClick={() => showModal(e)}>
              {getEventTitle(e.eventId, events.items)} - {getTeams(e, teams.items)}
              {' '} { e.homeScore && e.guestScore
                ? <kbd>{e.homeScore} : {e.guestScore}</kbd>
                : <kbd>? : ?</kbd>
              } (Round: {e.round})
            </span>
          </li>))}
      </ol>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal(obj) { dispatch(match.actions.showModal(obj)); },
  };
};

export default connect(
  state => ({
    matches: match.selectors.getAll(state),
    events: event.selectors.getAll(state),
    teams: team.selectors.getAll(state),
  }),
  mapDispatchToProps,
)(Admin);
