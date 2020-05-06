import React from 'react';
import SchedDisplayBox from '../../components/SchedDisplayBox';
// import { useSelector } from 'react-redux';
import moment from 'moment';

function EmployeeSchedule({ employeeName }) {
  // local state for controlling date display:
  const [currentWeekStart, setCurrentWeekStart] = React.useState(8);
  const [dates, setDates] = React.useState([]);
  const [startDate, setStartDate] = React.useState('');
  const [finishDate, setFinishDate] = React.useState('');
  const weekSelect = (start) => {
    // First get the range of dates:
    let newDates = [];
    for (let i = start; i <= start + 6; i++) {
      const dashed = moment().day(i).format('L').split('/').join('-');
      newDates.push(dashed);
    }
    setDates(newDates);
    setStartDate(moment().day(start).format('LL'));
    setFinishDate(
      moment()
        .day(start + 6)
        .format('LL')
    );
  };
  // set default dates for next week when page loads:
  React.useEffect(() => {
    weekSelect(currentWeekStart);
  }, [currentWeekStart]);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <button
          style={{ borderRadius: '8px 0px 0px 8px' }}
          type='button'
          onMouseUp={() => setCurrentWeekStart(currentWeekStart - 7)}
        >
          Prev
        </button>
        {employeeName}'s Schedule:
        <p>
          {startDate} - {finishDate}
        </p>
        <button
          style={{ borderRadius: '0px 8px 8px 0px' }}
          type='button'
          onMouseUp={() => setCurrentWeekStart(currentWeekStart + 7)}
        >
          Next
        </button>
      </div>
      <SchedDisplayBox dates={dates}></SchedDisplayBox>
    </div>
  );
}

export default EmployeeSchedule;
