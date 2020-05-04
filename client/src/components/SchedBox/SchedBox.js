import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DayColumn from '../DayColumn';
import TimeColumn from '../TimeColumn';

function SchedBox() {
  // tie this to a prop of the actual day columns:
  const numShifts = useSelector((state) => state.schedule.numShifts);
  const dates = Object.keys(useSelector((state) => state.draft.dates));

  return (
    <Wrapper>
      <TimeColumn shifts={numShifts}></TimeColumn>
      <DayColumn day='Mon' date={dates[0]} shifts={numShifts}></DayColumn>
      <DayColumn day='Tues' date={dates[1]} shifts={numShifts}></DayColumn>
      <DayColumn day='Weds' date={dates[2]} shifts={numShifts}></DayColumn>
      <DayColumn day='Thurs' date={dates[3]} shifts={numShifts}></DayColumn>
      <DayColumn day='Fri' date={dates[4]} shifts={numShifts}></DayColumn>
      <DayColumn day='Sat' date={dates[5]} shifts={numShifts}></DayColumn>
      <DayColumn day='Sun' date={dates[6]} shifts={numShifts}></DayColumn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export default SchedBox;
