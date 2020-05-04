import React from 'react';
import styled from 'styled-components';

// make a span for each hour between 6 am and midnight:
let hours = [];
for (let i = 6; i <= 24; i++) {
  hours.push(`${i}:00`);
}

function HoursColumn() {
  return (
    <Wrapper>
      <Label>Hour</Label>
      {hours.map((hour) => {
        return <Hour key={`HH-${hour}`}>{hour}</Hour>;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 420px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const Hour = styled.span`
  border-bottom: 1px solid green;
  font-size: 12px;
  height: 20px;
`;

const Label = styled.div`
  height: 40px;
  border-bottom: 1px solid green;
`;

export default HoursColumn;
