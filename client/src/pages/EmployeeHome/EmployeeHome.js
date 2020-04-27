import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Unauthorized from '../../components/Unauthorized';

function EmployeeHome() {
  // grab the employee's name from state to show in on their dashboard:
  const employeeName = useSelector((state) => state.currentUser.userName);
  // Privacy 101: Don't let anyone see the page if they're not logged in with the appropriate user name:
  const { username } = useParams();
  if (username != employeeName.split(' ').join('')) {
    return (
      <Unauthorized
        message={`You must be logged in as ${username} to view this person's page.`}
      />
    );
  }
  return (
    <Wrapper>
      <h1>{employeeName}'s Main Page</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;

export default EmployeeHome;
