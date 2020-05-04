// Define initial state for users list:

const initialState = {
  employees: [],
  focusEmployee: null,
  hasLoaded: false,
  // just for managing logins:
  employeeIds: [],
};
// statuses: idle, sendingData, receivingData, loggedIn?

export default function employeeListReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_EMPLOYEES_FROM_DB': {
      return {
        ...state,
        employees: action.employees,
        hasLoaded: true,
      };
    }
    case 'FOCUS_ON_EMPLOYEE': {
      return {
        ...state,
        focusEmployee: action.employee,
      };
    }
    case 'GET_SCHEDULED_EMPLOYEE_IDS': {
      return {
        ...state,
        employeeIds: action.employees,
      };
    }
    default: {
      return state;
    }
  }
}
