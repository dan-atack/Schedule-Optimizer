import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setEmployeeShifts, getEmployeeNotifications } from '../../actions';
import { useParams, Route, Link } from 'react-router-dom';
import NavButton from '../../components/NavButton';
import Unauthorized from '../../components/Unauthorized';
import EmployeeSchedule from '../EmployeeSchedule';
import EmployeeNotifications from '../EmployeeNotifications';
import EmployeePaystubs from '../EmployeePaystubs';

function EmployeeHome() {
  // First things first, grab the employee's name from state to show in on their dashboard and fetch their shifts:
  const employee = useSelector((state) => state.currentUser);
  // Then, get today's punches so we can see if the particular individual is punched in:
  const dailyPunches = useSelector((state) => state.punchData.todaysPunches);
  const myPunchStatus = dailyPunches
    .slice(1)
    .filter((punch) => punch.employee_id === employee._id.slice(4));
  console.log(myPunchStatus);
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
  // fetch employee's notifications and quickly stash them too:
  React.useEffect(() => {
    fetch(`/api/get_notifications/${employee._id}`)
      .then((res) => {
        return res.json();
      })
      .then((reply) => dispatch(getEmployeeNotifications(reply.data)));
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
          <div>
            <h3>My Punch Status:</h3>
            <MyPunch punchedIn={myPunchStatus.length}>
              {myPunchStatus.length === 1
                ? `Punched in at ${moment(myPunchStatus[0].timeObject).format(
                    'LT'
                  )}`
                : 'Punched Out'}
            </MyPunch>
          </div>
        </Route>
        <Route path={`/employee/${username}/schedule`}>
          <EmployeeSchedule employeeName={employee.userName}></EmployeeSchedule>
        </Route>
        <Route path={`/employee/${username}/paystubs`}>
          <EmployeePaystubs employee={employee} />
        </Route>
        <Route path={`/employee/${username}/notifications`}>
          <EmployeeNotifications employee={employee}></EmployeeNotifications>
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

const MyPunch = styled.h4`
  margin: 16px;
  padding: 8px;
  border: 2px solid rgb(69, 71, 67);
  border-radius: 8px;
  background-color: ${(props) =>
    props.punchedIn === 1 ? 'limegreen' : 'rgb(243, 239, 217)'};
`;

export default EmployeeHome;
