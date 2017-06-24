import { actions } from '../../constants';

export default (state = {}, action) => {
  const key = action.key;
  const substate = state[key] ? { ...state[key] } : {};
  switch (action.type) {

    case actions.SET_ACTIVE:
      return { ...state, [key]: substate };

    default:
      return state;
  }
};
