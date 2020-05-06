import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setEmployeeShifts } from '../../actions';
import { useParams, Route, Link } from 'react-router-dom';
import NavButton from '../../components/NavButton';
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

  return (
    <Wrapper>
      <h2 style={{ marginBottom: 4 }}>Welcome, {employee.userName}!</h2>
      <NavBar>
        <Link to={`/employee/${username}/punches`}>
          <NavButton label='My Punchclock' />
        </Link>
        <Link to={`/employee/${username}/schedule`}>
          <NavButton label='My Schedule' />
        </Link>
        <Link to={`/employee/${username}/paystubs`}>
          <NavButton label='My Pay Stubs' />
        </Link>
        <Link to={`/employee/${username}/notifications`}>
          <NavButton label='My Notifications' />
        </Link>
      </NavBar>
      <MainArea>
        <Route path={`/employee/${username}/punches`}>
          <div>My Punches</div>
        </Route>
        <Route path={`/employee/${username}/schedule`}>
          <EmployeeSchedule employeeName={employee.userName}></EmployeeSchedule>
        </Route>
        <Route path={`/employee/${username}/paystubs`}>
          <div>Show me the Morty!</div>
        </Route>
        <Route path={`/employee/${username}/notifications`}>
          <div>
            MEMO: Please remember to include new cover sheet on all TPS reports!
          </div>
        </Route>
      </MainArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 8px;
  padding: 4px;
  background-color: rgb(243, 239, 217);
`;

const NavBar = styled.div`
  color: whitesmoke;
  height: 64px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: rgb(148, 226, 250);
  display: flex;
  justify-content: space-around;
  padding-top: 4px;
`;

const MainArea = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  margin-top: 8px;
`;

export default EmployeeHome;
