
import React from 'react';
import { connect } from 'react-redux';
// import TeamModal  from '../teams/teamModal';
// import TournamentModal  from '../tournaments/tournamentModal';
// import MatchForm  from '../matches/matchForm';
// import EventForm  from '../events/eventForm';
// import TeamDetails  from '../teams/components/Details';
import { types } from '../constants';
import event from '../../event';
import team from '../../team';
import match from '../../match';


const closeModalAction = { type: 'CLOSE_MODAL' };

const close = () => dispatch => dispatch(closeModalAction);


const Modal = ({ state, dispatch }) => {
  const renderContent = (type) => {
    switch (type) {
      case types.event:
        return (
          <event.components.EventForm
            model={state.content}
            dispatch={dispatch}
            closeModalAction={closeModalAction}
          />
        );
      case types.team:
        return (
          <team.components.Form
            model={state.content}
            dispatch={dispatch}
            closeModalAction={closeModalAction}
          />
        );
      case types.match:
        return (
          <match.components.Form
            model={state.content}
            dispatch={dispatch}
            closeModalAction={closeModalAction}
          />
        );
      default:
        return <div>default</div>;
    }
  };

  const onCLose = () => {
    dispatch(close());
  };

  if (state.isOpened) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onCLose}>&times;</span>
          {renderContent(state.modalType)}
        </div>
      </div>
    );
  }
  return null;
};


export default connect(state => ({ state: state.modal }))(Modal);
