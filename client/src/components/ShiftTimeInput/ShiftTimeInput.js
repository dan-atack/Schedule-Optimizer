import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setShiftStart, setShiftFinish } from '../../actions';

function ShiftTimeInput({ relativeSize, shiftNum }) {
  const dispatch = useDispatch();
  const start = useSelector(
    (state) => state.schedule.shiftTimes[`shift_${shiftNum}`][0]
  );
  const finish = useSelector(
    (state) => state.schedule.shiftTimes[`shift_${shiftNum}`][1]
  );
  const handleStartChange = (ev) => {
    // ensure input content is translated to numerical value.
    // ALSO, note that the setshiftstart reducer takes TWO arguments, not just one!!
    dispatch(setShiftStart(shiftNum, Number(ev.target.value)));
  };
  const handleFinishChange = (ev) => {
    // ensure input content is translated to numerical value:
    dispatch(setShiftFinish(shiftNum, Number(ev.target.value)));
  };
  return (
    <Wrapper relativeSize={relativeSize}>
      <h3>Shift {shiftNum}</h3>
      <form>
        <label>Shift Start:</label>
        <input type='number' value={start} onChange={handleStartChange}></input>
        <label>Shift End:</label>
        <input
          type='number'
          value={finish}
          onChange={handleFinishChange}
        ></input>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  height: ${(props) => props.relativeSize};
`;

export default ShiftTimeInput;
