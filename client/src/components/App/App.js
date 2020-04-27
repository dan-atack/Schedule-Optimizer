import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from '../../GlobalStyles';
// PAGES
import ManagerHome from '../../pages/ManagerHome';
import EmployeeHome from '../../pages/EmployeeHome';
import Login from '../../pages/Login';

// Components

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Wrapper className='App'>
        <Header>Welcome to the schedule optimizer version 0.0.1!</Header>
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
`;

export default App;
