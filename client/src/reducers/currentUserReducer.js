import produce from 'immer';
// Define initial state for user context:

const initialState = {
  userName: '',
  isAdmin: false,
  // for showing an employee's shifts if they have any:
  shifts: [],
};
// statuses: idle, sendingData, receivingData, loggedIn?

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN_USER': {
      return {
        ...state,
        _id: action.user._id,
        userName: action.user.userName,
        isAdmin: action.user.isAdmin,
      };
    }
    case 'SET_EMPLOYEE_SHIFTS': {
      return produce(state, (draftState) => {
        draftState.shifts = action.shifts;
      });
    }
    default: {
      return state;
    }
  }
}
