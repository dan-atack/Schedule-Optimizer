import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setShiftNum, divideDatesToShifts } from '../../actions';

function ShiftCountInput() {
  // On change, the value of the number of shifts will go into state to determine the amount of divisions (rows) in the main sched box:
  const dispatch = useDispatch();
  // There are two shifts per date by default:
  dispatch(divideDatesToShifts(2));
  const handleShiftChange = (ev) => {
    setVal(ev.target.value);
    // ensure input content is translated to numerical value:
    dispatch(setShiftNum(Number(ev.target.value)));
    // also modify the structure of the schedule draft:
    dispatch(divideDatesToShifts(Number(ev.target.value)));
  };

  // teeny tiny local state to start at value of 1 (and possibly restrict crazy values later on):
  const [val, setVal] = React.useState(2);

  return (
    <Wrapper>
      <Box>
        <label># of Shifts:</label>
        <input
          style={{ width: '50%', paddingLeft: 4 }}
          type='number'
          onChange={handleShiftChange}
          placeholder='1'
          value={val}
        ></input>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  height: 64px;
  width: 90%;
  margin: 5%;
`;

const Box = styled.form`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export default ShiftCountInput;
