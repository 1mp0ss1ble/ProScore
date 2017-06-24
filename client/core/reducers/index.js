import { combineReducers } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';
import loaders from './loader';
import modal from './modal';
import models from './models';
import active from './active';
import admin from './admin';
import auth from './auth';
import home from './home';


/*
const models = combineReducers({
  matches: model('MATCHES'),
  players: model('PLAYERS'),
  tournaments: model('TOURNAMENTS'),
  events: model('EVENTS'),
  teams: model('TEAMS'),
  users: model('USERS'),
});
*/


const rootReducer = combineReducers({
  models,
  modal,
  admin,
  auth,
  home,
  loaders,
  active,
  notifs: notifReducer,
});

/*
matches: model('MATCHES'),
players: model('PLAYERS'),
tournaments: model('TOURNAMENTS'),
events: model('EVENTS'),
teams: model('TEAMS'),
users: model('USERS'),
*/

export default rootReducer;
