import React from 'react';
import styled from 'styled-components';
import ScheduleSidebar from '../../components/NotificationSidebar';
import NotificationSidebar from '../../components/NotificationSidebar';
import NotificationInput from '../../components/NotificationInput';

function Notifications() {
  return (
    <Wrapper>
      <h1 style={{ gridArea: 'head' }}>InterOffice Memoranda Wizard</h1>
      <NotificationSidebar></NotificationSidebar>
      <NotificationInput />
      <Sentbox>Sentbox</Sentbox>
      <div
        style={{
          gridArea: 'opts',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <button style={{ height: 64, width: '25%' }}>A</button>
        <button style={{ height: 64, width: '25%' }}>B</button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  display: grid;
  grid-template-areas:
    'head head head side'
    'boxy boxy send side'
    'boxy boxy send side'
    'opts opts send side';
  grid-template-rows: 1fr 3fr 3fr 3fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Sentbox = styled.div`
  border: 1px solid black;
  grid-area: send;
`;

export default Notifications;
