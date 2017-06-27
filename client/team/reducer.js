import { createSelector } from 'reselect';

// selectors
const getAll = createSelector(
  state => state.models.teams,
  (data) => {
    const model = data || {};
    const items = model.items || [];
    const isLoading = model.isLoading || false;
    return { items, isLoading };
  },
);

module.exports = {
  actions: {
    showModal: obj =>
      ({ modalType: 'team', type: 'OPEN_MODAL', payload: obj }),
    teamDetails: obj =>
    ({ modalType: 'teamDetails', type: 'OPEN_MODAL', payload: obj }),
  },
  selectors: {
    getAll,
  },
  reducer: {
  },
};
