import React from 'react';
import styled from 'styled-components';

function NotificationInput() {
  return (
    <Wrapper>
      <label>Compose a memo:</label>
      <TextField type='text'></TextField>
      <button type='submit' style={{ gridArea: 'send' }}>
        SEND
      </button>
      <button type='button' style={{ gridArea: 'view' }}>
        Show recipients
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: grid;
  grid-template-areas:
    'inp inp'
    'send view';
  grid-template-rows: 4fr 1fr;
  grid-area: boxy;
  border: 1px solid black;
`;

const TextField = styled.input`
  border: 2px solid green;
  grid-area: inp;
`;

export default NotificationInput;
