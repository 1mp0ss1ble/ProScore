
export default (state = {}, action) => {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return {};
    case 'OPEN_MODAL':
      return {
        isOpened: true,
        modalType: action.modalType,
        content: action.payload,
      };
    default:
      return state;
  }
};
