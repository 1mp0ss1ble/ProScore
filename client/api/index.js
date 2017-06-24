import api from './db2';
import { types } from '../core/constants';


function generateApiMethods(type) {
  return {
    get: api.get(type),
    add: api.add(type),
    update: api.update(type),
    delete: api.delete(type),
  };
}

const customizedApi = {
  teams: generateApiMethods(types.team),
  matches: generateApiMethods(types.match),
  tournaments: generateApiMethods(types.tournament),
  events: generateApiMethods(types.event),
  users: {
    ...generateApiMethods(types.user),
    signup: api.auth('signup'),
    login: api.auth('login'),
  },
  auth: {
    signup: api.auth('signup'),
  },
// setToken: setToken,
};


export default customizedApi;


export const loadBranch = (type, opts = null) => dispatch => {
  if (type === 'home') {
    for (let key in customizedApi) {
      if (Object.hasOwnProperty.call(customizedApi, key) && key !== 'auth') {
        if (key === 'users') {
          dispatch(customizedApi[key].get({ username: 'zzz' }));
        } else {
          dispatch(customizedApi[key].get());
        }
      }
    }
  }

  if (type === 'admin') {
    console.log('admin loading');
  }
};
