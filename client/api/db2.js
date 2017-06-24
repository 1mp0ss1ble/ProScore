import axios from 'axios';
// import * as teamActions from '../teams/teamsActions';
// import * as playerActions from '../players/playersActions';
// import * as matchActions from '../matches/matchesActions';
// import * as tournamentActions from '../tournaments/tournamentsActions';
// import * as eventActions from '../events/eventsActions';
// import * as userActions from '../users/usersActions';
import { modelActions } from '../core/actions';
import { pluralNames } from '../core/constants';

// const constructRoute = action => type => `api/${type}/${action}`;
const getRoute = type => `api/${type}`;

const test = {
  get: type => criteria => {
    let options = '';

    for (const key in criteria) {
      options += `${key}=${criteria[key]}&`;
    }

    return axios.get()
  }
}

const api = {
  get: type => criteria => (dispatch = null) => {
    let options = '';

    for (const key in criteria) {
      options += `${key}=${criteria[key]}&`;
    }

    /* transform to url query */
    if (options) {
      options = options.slice(0, -1);
      options = `?${options}`;
    }
    const route = getRoute(type);

    // no models
    if (!dispatch) return axios.get(route + options);

    const { fetchRequest, fetchSuccess, fetchFail } = modelActions(pluralNames[type]);

    dispatch(fetchRequest());

    return axios.get(route + options)
    .then(response => dispatch(fetchSuccess(response.data)))
    .catch((err) => {
      console.log(err.response.data);
      dispatch(fetchFail());
    });
  },

  add: type => data => (dispatch) => {
    return axios.post(getRoute(type), data);
  },

  delete: type => id => dispatch => {
    //console.log('axiod delete', data);
    return axios.delete(getRoute(type) + "/" + id);
  },

  update: type => data => dispatch => {
    console.log('put', getRoute(type));
    return axios.put(getRoute(type), data);
  },

  auth: type => data => dispatch => {
    return axios.post(getRoute(type), data);
  },
};

export default api;
