import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { displayMessage } from '../../actions';

function Memo({ message, employee }) {
  // clicking a message's subject will put it into state so it can be displayed in the main notification area,
  // and a signal sent to the DB to update the 'read' status for the current user:
  const dispatch = useDispatch();
  const handleView = () => {
    // update read status FOR THE FIRST READING ONLY:
    const readTime = moment();
    message.readList.forEach((recipient) => {
      if (
        Object.keys(recipient).includes(employee._id) &&
        Object.values(recipient).includes(null)
      ) {
        recipient[employee._id] = readTime;
        fetch('/api/update_read_status', {
          method: 'POST',
          body: JSON.stringify(message),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((reply) => console.log(reply));
      }
    });
    // then display the message:
    dispatch(displayMessage(message));
  };
  return (
    <Wrapper onMouseUp={handleView}>
      <h4>{message.subject}</h4>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export default Memo;
