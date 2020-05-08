import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import SentMessage from '../../components/SentMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeNotifications } from '../../actions';

function NotificationSidebar() {
  // fetch previous messages and keep in state:
  const dispatch = useDispatch();
  const sentMessages = useSelector(
    (state) => state.notification.employeeNotifications
  );
  const focusMessage = useSelector(
    (state) => state.notification.messageOnDisplay
  );
  const employeeNames = useSelector((state) => state.employeeList.employees);
  React.useEffect(() => {
    fetch('/api/admin/view_all_notifications')
      .then((res) => {
        return res.json();
      })
      .then((results) => dispatch(getEmployeeNotifications(results.data)));
  }, []);

  return (
    <Wrapper>
      <h3>Notification Options</h3>
      <h4 style={{ margin: 8 }}>Recent Messages</h4>
      <ul>
        {sentMessages.map((message) => {
          return (
            <SentMessage key={message._id} message={message}></SentMessage>
          );
        })}
      </ul>
      <div>
        <h4>Message Text</h4>
        <p>{focusMessage ? focusMessage.content : ''}</p>
      </div>
      <div
        style={{
          border: '1px solid green',
          borderRadius: '8px',
          padding: '4px',
        }}
      >
        <h4>Recipients' Read Receipts:</h4>
        <ul>
          {focusMessage ? (
            focusMessage.readList.map((recipient) => {
              if (Object.values(recipient)[0] !== null) {
                return (
                  <li key={Math.random() * 10000000}>
                    <span
                      style={{
                        fontSize: 12,
                        backgroundColor: 'limegreen',
                        borderBottom: '1px solid black',
                        padding: '0px 4px',
                        borderRadius: '4px',
                      }}
                    >{`${
                      employeeNames.find(
                        (employee) => employee._id === Object.keys(recipient)[0]
                      ).userName
                    }: 
                    ${moment(Object.values(recipient)[0]).format(
                      'MMMM Do YYYY, h:mm'
                    )}`}</span>
                  </li>
                );
              } else {
                return (
                  <li key={Math.random() * 10000000}>
                    <span
                      style={{
                        fontSize: 11,
                        backgroundColor: 'tomato',
                        borderBottom: '1px solid black',
                        padding: '0px 4px',
                        borderRadius: '4px',
                      }}
                    >
                      {
                        employeeNames.find(
                          (employee) =>
                            employee._id === Object.keys(recipient)[0]
                        ).userName
                      }
                    </span>
                  </li>
                );
              }
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
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
  padding: 4px;
`;

export default NotificationSidebar;
