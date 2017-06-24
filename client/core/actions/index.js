import { actions } from '../constants';

export default {
  showModal: modalType => payload => ({
    type: 'OPEN_MODAL',
    modalType,
    payload,
  }),
};

export function modelActions(key, branch = 'models') {
  // const upperCaseType = type.toUpperCase();
  return {
    fetchRequest: () => dispatch =>
      dispatch({ branch, key, type: actions.FETCH_REQUEST }),

    fetchSuccess: payload => dispatch =>
      dispatch({ branch, key, type: actions.FETCH_SUCCESS, payload }),

    fetchFail: () => dispatch =>
      dispatch({ branch, key, type: actions.FETCH_FAIL }),
  };
}
