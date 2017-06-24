import { createSelector } from 'reselect';

// selectors
const getAll = createSelector(
  state => state.models.matches,
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
      ({ modalType: 'match', type: 'OPEN_MODAL', payload: obj }),
  },
  selectors: {
    getAll,
  },
  reducer: {
  },
};
