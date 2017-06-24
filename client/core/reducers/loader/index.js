import { pluralNamesArray } from '../../constants';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default (state = {}, action) => {
  const names = action.type.split('_');
  const pattern = /^FETCH_[A-Z]+_FAIL|SUCCESS|REQUEST$/i;

  if (!pattern.test(action.type)) {
    return state;
  }

  const pluralName = names[1].toUpperCase();

  if (pluralName && pluralNamesArray().indexOf(pluralName.toLowerCase()) !== -1) {
    const propName = 'isFetching' + capitalizeFirstLetter(pluralName);

    switch (action.type) {
      case `FETCH_${pluralName}_REQUEST`:
        return { ...state, [propName]: true };
      case `FETCH_${pluralName}_SUCCESS`:
        return { ...state, [propName]: false };
      case `FETCH_${pluralName}_FAIL`:
        return { ...state, [propName]: false };
      default:
        return state;
    }
  } else {
    return state;
  }
};
