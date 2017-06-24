import { actions } from '../../constants';

export default (state = {}, action) => {
  const key = action.key;
  const substate = state[key] ? { ...state[key] } : {};

  if (action.branch !== 'models') {
    return state;
  }
  switch (action.type) {
    case actions.FETCH_REQUEST:
      substate.isLoading = true;
      return { ...state, [key]: substate };

    case actions.FETCH_FAIL:
      substate.isLoading = false;
      return { ...state, [key]: substate };

    case actions.FETCH_SUCCESS:
      substate.items = action.payload;
      substate.isLoading = false;
      return { ...state, [key]: substate };

    default:
      return state;
  }
};
/*
const model = type => (state = [], action) => {
  switch (action.type) {
    case `FETCH_${type}_SUCCESS`:
      return action.payload;
    default:
      return state;
  }
};

const isLoading = type => (state = true, action) => {
  switch (action.type) {
    case `FETCH_${type}_SUCCESS`:
      return false;
    default:
      return state;
  }
};
*/


/*
const models = () => {
  return combineReducers({
    matches: model('MATCHES'),
    players: model('PLAYERS'),
    tournaments: model('TOURNAMENTS'),
    events: model('EVENTS'),
    teams: model('TEAMS'),
    users: model('USERS'),
  });
};
*/
// export default toExport;
