import React from 'react';
import styled from 'styled-components';
import HoursColumn from '../HoursColumn';
import WorkDay from '../WorkDay';

function SchedDisplayBox({ dates }) {
  return (
    <Wrapper>
      <HoursColumn />
      <WorkDay day='Mon' date={dates[0]}></WorkDay>
      <WorkDay day='Tue' date={dates[1]}></WorkDay>
      <WorkDay day='Wed' date={dates[2]}></WorkDay>
      <WorkDay day='Thu' date={dates[3]}></WorkDay>
      <WorkDay day='Fri' date={dates[4]}></WorkDay>
      <WorkDay day='Sat' date={dates[5]}></WorkDay>
      <WorkDay day='Sun' date={dates[6]}></WorkDay>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
`;

export default SchedDisplayBox;
