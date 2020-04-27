// Define initial state for users list:

const initialState = {};
// statuses: idle, sendingData, receivingData, loggedIn?

export default function employeeListReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_EMPLOYEE_LIST': {
      return {
        ...state,
        employees: action.employees,
      };
    }
    default: {
      return state;
    }
  }
}
