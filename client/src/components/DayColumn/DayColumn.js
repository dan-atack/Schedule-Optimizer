import React from 'react';
import styled from 'styled-components';
import ShiftBox from '../ShiftBox';
import { useSelector } from 'react-redux';

function DayColumn({ day, date, shifts }) {
  const draftDate = useSelector((state) => state.draft.dates[date]);
  console.log(shifts);
  const shiftList = Object.keys(draftDate).slice(0, shifts);
  return (
    <Wrapper>
      <div>
        <p style={{ fontWeight: 'bold' }}>{day}</p>
        {date.slice(0, 5)}
      </div>
      {shiftList.length > 0 ? (
        shiftList.map((shift) => {
          return (
            <ShiftBox
              key={Math.random() * 10000000}
              relativeSize={1 / shifts}
              shiftNum={shift}
              date={date}
            ></ShiftBox>
          );
        })
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  height: 80vh;
`;

export default DayColumn;
