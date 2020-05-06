import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

function WorkedHoursBox({ punchInfo }) {
  const punchIn = moment(punchInfo.in).format('HH:mm');
  const punchOut = moment(punchInfo.out).format('HH:mm');
  const hours = punchInfo.hours;

  if (hours > 0) {
    return (
      <Wrapper>
        <p>In: {punchIn}</p>
        <p>Out: {punchOut}</p>
        <DailyHours>Hours: {hours}</DailyHours>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <p>Day Off</p>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: rgb(183, 255, 237);
  display: flex;
  flex-direction: column;
  font-size: 11px;
`;

const DailyHours = styled.p`
  background-color: rgb(184, 236, 149);
  font-size: 11px;
`;

export default WorkedHoursBox;
