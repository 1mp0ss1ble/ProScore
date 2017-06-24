import { actions } from '../../constants';

export default (state = {}, action) => {
  const key = action.key;
  const substate = state[key] ? { ...state[key] } : {};

  if (key !== 'admin') {
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
