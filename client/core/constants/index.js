export const types = {
  team: 'team',
  player: 'player',
  match: 'match',
  event: 'event',
  user: 'user',
  tournament: 'tournament',
  auth: 'auth',
};

export const actions = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
  FETCH_REQUEST: 'FETCH_REQUEST',
  SET_ACTIVE: 'SET_ACTIVE',
};

export const pluralNames = {
  [types.user]: 'users',
  [types.tournament]: 'tournaments',
  [types.event]: 'events',
  [types.match]: 'matches',
  [types.team]: 'teams',
};

export function pluralNamesArray() {
  const result = [];

  for (const key in pluralNames) {
    result.push(pluralNames[key]);
  }

  return result;
}
