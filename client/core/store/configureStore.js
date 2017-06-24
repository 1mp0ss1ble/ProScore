
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import rootReducer from '../reducers';
import setAuthorizationToken from '../auth/setAuthorizationToken';
import user from '../../user';

let finalCreateStore;

if (process.env.NODE_ENV !== 'production') {
  finalCreateStore = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore);
} else {
  finalCreateStore = createStore;
}

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(finalCreateStore);


export default () => {
  const store = createStoreWithMiddleware(rootReducer);
  const token = localStorage.jwtToken;

  if (token) {
    setAuthorizationToken(token);
    store.dispatch(user.actions.setCurrentUser(jwtDecode(token)));
  }
  return store;
};
