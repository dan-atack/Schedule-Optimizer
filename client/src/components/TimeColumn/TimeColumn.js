import React from 'react';
import styled from 'styled-components';
import ShiftTimeInput from '../ShiftTimeInput';

function TimeColumn({ shifts }) {
  // "Oh gross! A for loop!" - Convert the number of shifts to a list so we can iterate over it:
  let shiftList = [];
  for (let i = 1; i <= shifts; i++) {
    shiftList.push(i);
  }
  return (
    <Wrapper>
      <h3 style={{ height: 40 }}>Shift Times</h3>
      {shiftList.map((shift) => {
        return (
          <ShiftTimeInput
            key={Math.random() * 10000000 * shift}
            relativeSize={`${((1 / shifts) * 100).toFixed(0)}%`}
            shiftNum={shift}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  height: 80vh;
`;

export default TimeColumn;
