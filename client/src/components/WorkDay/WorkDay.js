import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ScheduleBlob from '../ScheduleBlob';

function WorkDay({ day, date }) {
  const shifts = useSelector((state) => state.currentUser.shifts);
  console.log(shifts);
  const [shift, setShift] = React.useState(null);
  React.useEffect(() => {
    shifts.forEach((shift) => {
      if (shift.date === date) setShift(shift.shift); // !!!!!
      console.log(shift);
    });
  }, [shifts]);
  // nulls represent the worker not having a shift that day, so filter them out here:
  if (shift !== null) console.log(shift.start, shift.finish);
  try {
    return (
      <Day>
        <div style={{ borderBottom: '1px solid green', height: '40px' }}>
          <h5>{day}</h5>
          <h6>{date.slice(0, 5)}</h6>
        </div>
        {shift ? (
          <ScheduleBlob
            start={shift.start}
            finish={shift.finish}
            position={shift.role}
          />
        ) : (
          <></>
        )}
      </Day>
    );
  } catch {
    return <Day></Day>;
  }
}

const Day = styled.div`
  height: 420px;
  border: 1px solid green;
  min-width: 64px;
`;

export default WorkDay;
