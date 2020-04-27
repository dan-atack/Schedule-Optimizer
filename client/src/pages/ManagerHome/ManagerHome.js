import React from 'react';
import styled from 'styled-components';
import { useParams, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Components:
import Unauthorized from '../../components/Unauthorized';
import GeneralSidebar from '../../components/GeneralSidebar';
// import UnstyledButton from '../../components/UnstyledButton';
// PAGES:
import Schedule from '../Schedule';
import Notifications from '../Notifications';
import EmployeesList from '../EmployeesList';
import PunchRecords from '../PunchRecords';
import Payroll from '../Payroll';

function ManagerHome() {
  // display name of administrator on their dashboard:
  const managerName = useSelector((state) => state.currentUser.userName);
  // And now for something more elaborate: make it so this page can't be seen unless you are logged in as an ADMINISTRATOR:
  const adminStatus = useSelector((state) => state.currentUser.isAdmin);
  // username here refers to the value of the username field in the URL params... not to be confused with the managerName, which is
  // the name that is needed IN STATE to access this page (which requires a successful login with password). "Security!!!"
  const { username } = useParams();
  if (!adminStatus) {
    return (
      <Unauthorized message='You must be signed in as an administrator to access this page.' />
    );
    // And so that, in the case that there are multiple managers, they can't snoop on eachother, let's restrict access by name as well:
  } else if (username != managerName.split(' ').join('')) {
    return (
      <Unauthorized
        message={`You must be logged in as ${username} to view this person's page.`}
      />
    );
  }
  return (
    <Layout>
      <Dashboard>
        <h1>{managerName}'s Main Terminal</h1>
      </Dashboard>
      <GeneralSidebar style={{ gridArea: 'general' }} username={username} />
      <MainDisplay style={{ gridArea: 'main' }}>
        <Route path={`/admin/${username}/create-schedule`}>
          {/* still need to consider if all schedules (past, pres and future) can use a common Schedule box component... */}
          <Schedule />
        </Route>
        <Route path={`/admin/${username}/current-schedule`}>
          <Schedule />
        </Route>
        <Route path={`/admin/${username}/previous-schedule`}>
          <Schedule />
        </Route>
        <Route path={`/admin/${username}/employees`}>
          <EmployeesList />
        </Route>
        <Route path={`/admin/${username}/notifications`}>
          <Notifications />
        </Route>
        <Route path={`/admin/${username}/punchclock`}>
          <PunchRecords />
        </Route>
        <Route path={`/admin/${username}/payroll`}>
          <Payroll />
        </Route>
      </MainDisplay>
      <SpecSidebar style={{ gridArea: 'specific' }}></SpecSidebar>
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    'dash dash dash'
    'general main specific';
  grid-template-columns: 2fr 9fr 3fr;
  grid-template-rows: 1fr 8fr;
  height: 100vh;
`;

const Dashboard = styled.div`
  display: flex;
  grid-area: dash;
  width: 100%;
  justify-content: space-around;
`;

const MainDisplay = styled.div`
  text-align: center;
  height: 100%;
  border: 1px solid black;
`;

const SpecSidebar = styled.div`
  text-align: center;
  border: 1px solid black;
  height: 100%;
`;

export default ManagerHome;
