import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from '../../GlobalStyles';
import { useSelector } from 'react-redux';
// PAGES
import ManagerHome from '../../pages/ManagerHome';
import EmployeeHome from '../../pages/EmployeeHome';
import Login from '../../pages/Login';

// Components
import Logout from '../Logout';

function App() {
  const currentUser = useSelector((state) => state.currentUser.userName);
  return (
    <Router>
      <GlobalStyles />
      <Wrapper className='App'>
        <Header>
          <div></div>
          <h4 style={{ fontStyle: 'oblique' }}>Schedulizer 3000</h4>
          {currentUser !== '' ? <Logout /> : <> </>}
        </Header>
        <Switch>
          <Route exact path='/'>
            <Login></Login>
          </Route>
          <Route path='/admin/:username'>
            <ManagerHome></ManagerHome>
          </Route>
          <Route path='/employee/:username'>
            <EmployeeHome></EmployeeHome>
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
  text-align: center;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 9fr 1fr;
`;

export default App;
