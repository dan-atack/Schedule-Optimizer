import React from 'react';
import styled from 'styled-components';
import ShiftBox from '../ShiftBox';

function DayColumn({ day, date, shifts }) {
  // Convert the number of shifts to a list so we can iterate over it: (is there a better way??)
  let shiftList = [];
  for (let i = 1; i <= shifts; i++) {
    shiftList.push(i);
  }
  return (
    <Wrapper>
      <div>
        <p style={{ fontWeight: 'bold' }}>{day}</p>
        {date.slice(0, 5)}
      </div>
      {shiftList.map((shift) => {
        return (
          <ShiftBox
            key={Math.random() * 10000000 * shift}
            relativeSize={1 / shifts}
            shiftNum={shift}
            date={date}
          ></ShiftBox>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  height: 80vh;
`;

export default DayColumn;
