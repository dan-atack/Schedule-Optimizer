import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UnstyledButton from '../UnstyledButton';

function GeneralSidebar({ username }) {
  return (
    <Wrapper>
      <Link to={`/admin/${username}/create-schedule`}>
        <UnstyledButton label={'Create New Schedule'}></UnstyledButton>
      </Link>
      <Link to={`/admin/${username}/current-schedule`}>
        <UnstyledButton label={"This week's Schedule"}></UnstyledButton>
      </Link>
      <Link to={`/admin/${username}/previous-schedule`}>
        <UnstyledButton label={"Last week's Schedule"}></UnstyledButton>
      </Link>
      <Link to={`/admin/${username}/employees`}>
        <UnstyledButton label={'Employees'}></UnstyledButton>
      </Link>
      <Link to={`/admin/${username}/notifications`}>
        <UnstyledButton label='Notifications'></UnstyledButton>
      </Link>
      <Link to={`/admin/${username}/punchclock`}>
        <UnstyledButton label={'Punchclock Records'}></UnstyledButton>
      </Link>
      <Link to={`/admin/${username}/payroll`}>
        <UnstyledButton label={'Payroll Summary'}></UnstyledButton>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  height: 100%;
  border: 1px solid black;
  padding: 8px;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
`;

export default GeneralSidebar;
