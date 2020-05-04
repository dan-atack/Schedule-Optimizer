import { combineReducers } from 'redux';

import currentUser from './currentUserReducer';
import employeeList from './employeeListReducer';
import schedule from './scheduleReducer';
import draft from './draftReducer';
import uploadVersion from './uploadReducer';
import punchData from './punchDataReducer';

export default combineReducers({
  currentUser,
  employeeList,
  schedule,
  uploadVersion,
  draft,
  punchData,
});
