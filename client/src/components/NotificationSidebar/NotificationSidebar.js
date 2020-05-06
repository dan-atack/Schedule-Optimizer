import React from 'react';
import styled from 'styled-components';
import NotificationEmployeeList from '../NotificationEmployeeList';

function NotificationSidebar() {
  return (
    <Wrapper>
      <h2>Notification Options</h2>
      <NotificationEmployeeList></NotificationEmployeeList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  border: 1px solid black;
  height: auto;
  grid-area: side;
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

export default NotificationSidebar;
