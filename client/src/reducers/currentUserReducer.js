// Define initial state for user context:

const initialState = {
  userName: '',
  isAdmin: false,
};
// statuses: idle, sendingData, receivingData, loggedIn?

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN_USER': {
      return {
        ...state,
        userName: action.user.userName,
        isAdmin: action.user.isAdmin,
      };
    }
    default: {
      return state;
    }
  }
}
