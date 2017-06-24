import { createSelector } from 'reselect';


const fetchRequest = () => dispatch =>
  dispatch({ type: 'FETCH_USERS_REQUEST' });

const fetchSuccess = payload => dispatch =>
  dispatch({ key: 'USERS', type: 'FETCH_SUCCESS', payload });

const setCurrentUser = payload => dispatch =>
  dispatch({ type: 'SET_CURRENT_USER', payload });

// selectors
const getAll = createSelector(
  state => state.models.users,
  (data) => {
    const user = data || {};
    const items = user.items || [];
    const isLoading = user.isLoading || false;
    return { items, isLoading };
  },
);

export default {
  actions: {
    fetchRequest,
    fetchSuccess,
    setCurrentUser,
  },
  selectors: {
    getAll,
  },
  reducer: {
  },
};
