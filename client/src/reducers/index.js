import { combineReducers } from 'redux';

import currentUser from './currentUserReducer';
import employeeList from './employeeListReducer';

export default combineReducers({ currentUser, employeeList });
