import React from 'react';
import styled from 'styled-components';

function Schedule() {
  return (
    <SchedBox>
      <span>Monday</span>
      <span>Tuesday</span>
      <span>Wednesday</span>
      <span>Thursday</span>
      <span>Friday</span>
      <span>Saturday</span>
      <span>Sunday</span>
    </SchedBox>
  );
}

// Would be very cool to use conditional formatting here to adjust the number of cells in this grid!
const SchedBox = styled.div`
  display: grid;
  grid-template-areas: 'a b c d e f g';
`;

export default Schedule;
