import React from 'react';
import SchedDisplayBox from '../../components/SchedDisplayBox';
// import { useSelector } from 'react-redux';
import moment from 'moment';

function EmployeeSchedule({ employeeName, startDate, finishDate }) {
  // First get the range of dates:
  let dates = [];
  // this will work, provided we're only talking about next week - if not, the initial and final values for i would need to change...
  for (let i = 8; i <= 14; i++) {
    // ensure format matches that of the database: moment().DAY, and a dash, not a slash... 'ohhhh, SHUDDER!'
    const dashed = moment().day(i).format('L').split('/').join('-');
    dates.push(dashed);
  }
  return (
    <div>
      <div>
        {employeeName}'s Schedule:
        <p>
          Week of {startDate} - {finishDate}
        </p>
      </div>
      <SchedDisplayBox dates={dates}></SchedDisplayBox>
    </div>
  );
}

export default EmployeeSchedule;
