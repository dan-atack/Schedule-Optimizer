// ACTIONS LIST, categorized by action type:

//// ** USER STATUS actions - for logging in and determining admin privileges:

export const signInUser = (user) => ({
  type: 'SIGN_IN_USER',
  user,
});

// Resets the current user state to it's initial values:
export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});

//// ** EMPLOYEE ACTIONS: for fetching, modifying and creating employee data:

// for fetching all info for all employees:
export const getEmployeesFromDB = (employees) => ({
  type: 'GET_EMPLOYEES_FROM_DB',
  employees,
});

// for fetching just the ID's of employees (for punchclock to tell which numbers to accept):
export const getScheduledEmployeeIds = (employees) => ({
  type: 'GET_SCHEDULED_EMPLOYEE_IDS',
  employees,
});

// for employee details box/page:
export const focusOnEmployee = (employee) => ({
  type: 'FOCUS_ON_EMPLOYEE',
  employee,
});

// for getting an employee's shifts into state (no employee name needed since it'll be from their profile as 'current user'):
export const setEmployeeShifts = (shifts) => ({
  type: 'SET_EMPLOYEE_SHIFTS',
  shifts,
});

//// ** SCHEDULE ACTIONS: Changing the variables that govern the display and creation of new schedules:

// for setting the number of shifts per day (opens up more start/finish time slots also):
export const setShiftNum = (numShifts) => ({
  type: 'SET_SHIFT_NUMBER',
  numShifts,
});

// for setting the value of the start time for a particular shift:
export const setShiftStart = (shiftNum, start) => ({
  type: 'SET_SHIFT_START_TIME',
  shiftNum,
  start,
});

// for setting the value of the finish time for a particular shift:
export const setShiftFinish = (shiftNum, finish) => ({
  type: 'SET_SHIFT_FINISH_TIME',
  shiftNum,
  finish,
});

//// ** SCHEDULE DRAFT ACTIONS:

// Adding dates to the draft by opening the 'new schedule' page:
export const addDate = (date) => ({
  type: 'ADD_DATE',
  date,
});

// adding a shift to the schedule draft takes three tiers of info, so let's add one at a time shall we?
// First, tell the dates how many shifts they're divided into:
export const divideDatesToShifts = (numShifts) => ({
  type: 'DIVIDE_DATES_INTO_SHIFTS',
  numShifts,
});
// Second, let us add roles to an individual shift:
export const addRoleToShift = (date, shift, role) => ({
  type: 'ADD_ROLE_TO_SHIFT',
  date,
  shift,
  role,
});
// And third, assign an employee to a specific role (And throw in the start/end times while we're at it, why not eh?)
export const assignEmployeeToRole = (
  date,
  shift,
  role,
  employee,
  start,
  finish
) => ({
  type: 'ASSIGN_EMPLOYEE_TO_ROLE',
  date,
  shift,
  role,
  employee,
  start,
  finish,
});

// Finally, the upload version shift assignment function: add all the data about a role to the date directly for uploading to DB:

export const addEmployeeToDate = (date, employee, role, start, finish) => ({
  type: 'ADD_EMPLOYEE_TO_DATE',
  date,
  employee,
  role,
  start,
  finish,
});

//// ** PUNCHCLOCK DISPLAY ACTIONS:

// get one date's punchclock activity into state from server fetch:
export const getPunchDataForOneDate = (date, punches) => ({
  type: 'GET_PUNCH_DATA_FOR_ONE_DATE',
  date,
  punches,
});

// get punchclock data for a range of dates:
export const getPunchDataForDateRange = (dates, punches) => ({
  type: 'GET_PUNCH_DATA_FOR_RANGE_OF_DATES',
  dates,
  punches,
});

// validate a single punch: dispatch the reply from a (successful) modification of the database:
export const updatePunchValidation = (punchIndex, punchData) => ({
  type: 'UPDATE_PUNCH_VALIDATION',
  punchIndex,
  punchData,
});

// Get today's punches to see current statuses and maybe even to some punchclock control!
export const getTodaysPunches = (punches) => ({
  type: 'GET_TODAYS_PUNCHES',
  punches,
});

//// ** PAYROLL ACTIONS:

// get just valid punches for a period into state for payroll calculations:
export const getValidPunches = (punches) => ({
  type: 'GET_VALID_PUNCHES',
  punches,
});

//// ** NOTIFICATION ACTIONS: Making sure that you get that memo:

// Add or remove a recipient with one handy action:
export const toggleRecipient = (recipient) => ({
  type: 'TOGGLE_RECIPIENT',
  recipient,
});

// Removing ALL recipients:
export const clearRecipients = () => ({
  type: 'CLEAR_RECIPIENTS',
});

// Getting an employee's notifications into state:
export const getEmployeeNotifications = (notifications) => ({
  type: 'GET_EMPLOYEE_NOTIFICATIONS',
  notifications,
});

export const displayMessage = (message) => ({
  type: 'DISPLAY_MESSAGE',
  message,
});

//// ** PAYROLL ACTIONS:

// Add pay data for a given week to employee's payroll state:
export const updateEmployeePay = (employee, weekOf, wage, hours) => ({
  type: 'UPDATE_EMPLOYEE_PAY',
  employee,
  weekOf,
  wage,
  hours,
});

// get employee paystubs:
export const getEmployeePaystubs = (paystubs) => ({
  type: 'GET_EMPLOYEE_PAYSTUBS',
  paystubs,
});
