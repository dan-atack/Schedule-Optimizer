// ACTIONS LIST, categorized by action type:

// User status actions - for logging in and determining admin privileges:

export const signInUser = (user) => ({
  type: 'SIGN_IN_USER',
  user,
});

export const getEmployeeList = (employees) => ({
  type: 'GET_EMPLOYEE_LIST',
  employees,
});
