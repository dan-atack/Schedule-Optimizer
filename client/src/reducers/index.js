import { combineReducers } from 'redux';

import currentUser from './currentUserReducer';
import employeeList from './employeeListReducer';
import schedule from './scheduleReducer';
import draft from './draftReducer';
import uploadVersion from './uploadReducer';
import punchData from './punchDataReducer';
import notification from './notificationReducer';
import payroll from './payrollReducer';

export default combineReducers({
  currentUser,
  employeeList,
  schedule,
  uploadVersion,
  draft,
  punchData,
  notification,
  payroll,
});
