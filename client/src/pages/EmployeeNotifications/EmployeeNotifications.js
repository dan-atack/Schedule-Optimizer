import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Memo from '../../components/Memo';

function EmployeeNotifications({ employee }) {
  // Messages to show just the subject line in a list at the top of the screen:
  const messages = useSelector(
    (state) => state.notification.employeeNotifications
  );
  // One featured message to show the full body:
  const fullMessage = useSelector(
    (state) => state.notification.messageOnDisplay
  );
  return (
    <Wrapper>
      <h3>{employee.userName}'s Inbox</h3>
      <Inbox>
        {messages.length > 0 ? (
          messages.map((message) => {
            return (
              <li key={message._id}>
                <Memo message={message} employee={employee}></Memo>
              </li>
            );
          })
        ) : (
          <></>
        )}
        <MessageArea>{fullMessage.content}</MessageArea>
      </Inbox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
`;

const Inbox = styled.ul`
  margin-top: 8px;
  border: 1px solid black;
  border-radius: 8px;
`;

const MessageArea = styled.p`
  height: 256px;
  border: 1px solid green;
  border-radius: 8px;
`;

export default EmployeeNotifications;
