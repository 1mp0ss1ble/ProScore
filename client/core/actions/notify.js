import { actions as notifActions } from 'redux-notifications';

const { notifSend } = notifActions;

export default (message, kind = 'success') =>
  notifSend({
    message,
    kind,
    dismissAfter: 2000,
});
