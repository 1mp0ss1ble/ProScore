import { createSelector } from 'reselect';
import api from '../api';
import { actions } from '../core/constants';

// selectors
const getAll = createSelector(
  state => state.models.events,
  (data) => {
    const model = data || {};
    const items = model.items || [];
    const isLoading = model.isLoading || false;
    return { items, isLoading };
  },
);

const home = {
  get:  createSelector(
    state => state.home.event,
    (data) => {
      const model = data || {};
      //const isLoading = model.isLoading || false;
      return model;
    },
  )
};


module.exports = {
  actions: {
    showModal: obj =>
      ({ modalType: 'event', type: 'OPEN_MODAL', payload: obj }),
    home: {
      /* get event as main model then append other to it*/
      getEvent: criteria => (dispatch) => {
        dispatch({ key: 'home', type: actions.FETCH_REQUEST });
        let event = {};
        api.events.get(criteria)(null)
        .then((res) => {
          event = res.data[0];
          const id = event._id;
          if (!event.teams.length) {
            return dispatch({ key: 'home', type: actions.FETCH_SUCCESS, payload: event });
          }
          api.teams.get({ _id: event.teams })(null)
          .then(teamRes => {
            event.teamsFull = teamRes.data;
            api.matches.get({ eventId: id })(null)
            .then(matchesRes => {
              event.matchesFull = matchesRes.data;
              return dispatch({ key: 'home', type: actions.FETCH_SUCCESS, payload: event });
            });
          });
        })
        .catch(err => dispatch({ key: 'home', type: actions.FETCH_FAIL }));
      },
    },
  },
  selectors: {
    getAll,
    home,
  },
  reducer: {
  },
};
