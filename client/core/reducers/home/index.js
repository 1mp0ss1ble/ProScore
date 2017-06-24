import { actions } from '../../constants';

export default (state = {}, action) => {
  const key = action.key;
  const substate = state[key] ? { ...state[key] } : {};

  if (key !== 'home') {
    return state;
  }
  switch (action.type) {
    case actions.FETCH_REQUEST:
    //  substate.isLoading = true;
      return { ...state, isLoading: true };

    case actions.FETCH_FAIL:
      // substate.isLoading = false;
      return { ...state, isLoading: false };

    case actions.FETCH_SUCCESS:
      // action.payload;
      // substate.isLoading = false;
      return { ...action.payload, isLoading: false };

    default:
      return state;
  }
};
