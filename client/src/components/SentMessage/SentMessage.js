import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { displayMessage } from '../../actions';

function SentMessage({ message }) {
  // dispatcher to set focus on the chosen message:
  const dispatch = useDispatch();
  const setMessageFocus = () => {
    dispatch(displayMessage(message));
  };

  return <Wrapper onMouseUp={setMessageFocus}>{message.subject}</Wrapper>;
}

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 2px;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
  }
`;

export default SentMessage;
