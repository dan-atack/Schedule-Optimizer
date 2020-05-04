import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setEmployeeShifts } from '../../actions';
import { useParams } from 'react-router-dom';
import Unauthorized from '../../components/Unauthorized';
import EmployeeSchedule from '../EmployeeSchedule';

function EmployeeHome() {
  // First things first, grab the employee's name from state to show in on their dashboard and fetch their shifts:
  const employee = useSelector((state) => state.currentUser);
  // Then, prepare to get the employee's specific shifts into state:
  const dispatch = useDispatch();
  // start of (next) week - HINT: USE DAY, not DATE:
  const firstDateNextWeek = moment().day(8).format('L');
  // No slashes in the url request!!!
  const urlFirstDate = firstDateNextWeek.split('/').join('-');
  // fetch the schedule data and store it in Redux:

  React.useEffect(() => {
    fetch(`/api/schedule/${employee._id}/${urlFirstDate}`)
      .then((res) => {
        return res.json();
      })
      .then((reply) => dispatch(setEmployeeShifts(reply.data)));
  }, []);

  // Privacy 101: Don't let anyone see the page if they're not logged in with the appropriate user name:
  const { username } = useParams();
  if (username !== employee.userName.split(' ').join('')) {
    return (
      <Unauthorized
        message={`You must be logged in as ${employee.userName} to view this person's page.`}
      />
    );
  }
  // Which week? Next week is the default:
  // Long form for human eyes:
  const longFirstDate = moment().day(8).format('LL');
  const longLastDate = moment().day(14).format('LL');

  return (
    <Wrapper>
      <h1>{employee.userName}'s Main Page</h1>
      <EmployeeSchedule
        employeeName={employee.userName}
        startDate={longFirstDate}
        finishDate={longLastDate}
      ></EmployeeSchedule>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;

export default EmployeeHome;
