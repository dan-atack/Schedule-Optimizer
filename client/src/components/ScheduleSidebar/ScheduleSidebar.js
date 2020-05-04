import React from 'react';
import styled from 'styled-components';
import ShiftCountInput from '../ShiftCountInput';
import SidebarEmployeeList from '../SidebarEmployeeList';
import SidebarEmployeeDetail from '../SidebarEmployeeDetail';
import PostSchedDraft from '../PostSchedDraft';

function ScheduleSidebar() {
  return (
    <Wrapper>
      <h2>Schedule Options</h2>
      <span>Time display mode: by Shift</span>
      <ShiftCountInput />
      <SidebarEmployeeList />
      <SidebarEmployeeDetail />
      <PostSchedDraft />
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
`;

export default ScheduleSidebar;
