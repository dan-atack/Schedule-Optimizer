import produce from 'immer';

const initialState = {
  // for adding recipients when sending:
  recipients: [],
  // for storing fetched notifications for a particular employee:
  employeeNotifications: [],
  // for storing a particular message to display on an employee's... display area:
  messageOnDisplay: { content: '', readList: [] },
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    // Since we're using checkboxes to add/remove recipients, make it so that clicking a name twice deselects them:
    case 'TOGGLE_RECIPIENT': {
      return produce(state, (draftState) => {
        // if they're already in, filter 'em out:
        if (draftState.recipients.includes(action.recipient)) {
          draftState.recipients = draftState.recipients.filter(
            (recipient) => recipient !== action.recipient
          );
          console.log(`${action.recipient} removed from send list`);
        } else {
          // otherwise add them to the list:
          draftState.recipients.push(action.recipient);
          console.log(`${action.recipient} added to send list`);
        }
      });
    }
    // this works, but I can't uncheck the buttons... :(
    case 'CLEAR_RECIPIENTS': {
      return {
        ...state,
        recipients: [],
      };
    }
    case 'GET_EMPLOYEE_NOTIFICATIONS': {
      return {
        ...state,
        employeeNotifications: action.notifications,
      };
    }
    case 'DISPLAY_MESSAGE': {
      return {
        ...state,
        messageOnDisplay: action.message,
      };
    }
    // The first shared action: clear out all the message data so new logins don't see messages they aren't meant to see!
    case 'LOGOUT_USER': {
      return initialState;
    }
    default:
      return state;
  }
}
