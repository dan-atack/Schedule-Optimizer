import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import WorkedHoursBox from '../WorkedHoursBox';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmployeePay } from '../../actions';

function PayrollRow({ employee, dates, shortDates }) {
  const dispatch = useDispatch();
  // still a number here; convert to dollar sign at the last minute:
  const wage = employee.wage;
  const shortId = employee._id.slice(4);
  const punches = useSelector((state) => state.punchData.validatedPunches);
  // Create empty object to hold the dates:
  let employeePunchesByDate = {};
  // then add the dates to it: Each date is a sub-object expecting and IN and OUT time (or neither if there was no work that day):
  // ... Also have a spot for the 'hours' worked for the calculation to be stored
  // Having a default of zero lets us use this value everywhere without worrying about non-worked dates.
  dates.forEach(
    (date) =>
      (employeePunchesByDate[`${date.slice(6)}`] = {
        in: '',
        out: '',
        hours: 0,
      })
  );
  // I think this might qualify as a 'Monstro-Function':
  if (punches.length > 0) {
    // get just our specific employee's punches from the valid punches state:
    let employeePunches = [];
    punches.forEach((punch) => {
      if (punch.employee_id === shortId) employeePunches.push(punch);
    });
    // From that list, add employee's punches to the appropriate date's in/out slot in the punches-by-date object:
    employeePunches.forEach((punch) => {
      // If a punch's date is within the specified range (current week)...
      if (
        Object.keys(employeePunchesByDate).includes(
          moment(punch.timeObject).format('L').split('/').join('-')
        )
      ) {
        // add that punch to the right date, and within that, to the 'in' or 'out' slot:
        employeePunchesByDate[
          moment(punch.timeObject).format('L').split('/').join('-')
        ][punch.punchType.toLowerCase()] = punch.timeObject;
      }
    });
    // Then, use the in/out times to calculate worked hours:
    Object.keys(employeePunchesByDate).forEach((date) => {
      // check if there's an in and an out punch; if so, calculate dem hours!!!!
      if (
        employeePunchesByDate[date]['in'] &&
        employeePunchesByDate[date]['out']
      ) {
        const punchIn = moment.utc(employeePunchesByDate[date]['in']);
        const punchOut = moment.utc(employeePunchesByDate[date]['out']);
        // // difference equals the difference between the two times, in terms of hours (fractions will be rounded off later):
        const hourDifference = moment
          .duration(punchOut.diff(punchIn))
          .asHours();
        // convert that to a rounded hours value (round to 2 decimals)
        employeePunchesByDate[date]['hours'] =
          Math.round(hourDifference * 100) / 100;
        // error-proofing 101: if there's an in without an out or vice versa, console log a warning message:
      } else if (
        employeePunchesByDate[date]['in'] ||
        employeePunchesByDate[date]['out']
      ) {
        console.log(
          `mispunch detected: transaction is missing an IN or OUT punch for shift on ${date}`
        );
      }
    });
  }
  // now all we've gotta do is send one date's worth of data to each WHB and let it do the displayin':
  if (Object.keys(employeePunchesByDate).length > 0) {
    // Get total hours to display in rightmost column:
    let cumulativeHours = 0;
    Object.values(employeePunchesByDate).forEach((date) => {
      cumulativeHours += date.hours;
    });
    dispatch(
      updateEmployeePay(
        shortId,
        `${dates[0]}--${dates[6]}`,
        employee.wage,
        cumulativeHours
      )
    );
    return (
      <Wrapper>
        <span>{employee.userName}</span>
        <DateBox>
          <h5>Mon {shortDates[0]}</h5>
          <WorkedHoursBox punchInfo={Object.values(employeePunchesByDate)[0]} />
        </DateBox>
        <DateBox>
          <h5>Tues {shortDates[1]}</h5>
          <WorkedHoursBox punchInfo={Object.values(employeePunchesByDate)[1]} />
        </DateBox>
        <DateBox>
          <h5>Weds {shortDates[2]}</h5>
          <WorkedHoursBox punchInfo={Object.values(employeePunchesByDate)[2]} />
        </DateBox>
        <DateBox>
          <h5>Thurs {shortDates[3]}</h5>
          <WorkedHoursBox punchInfo={Object.values(employeePunchesByDate)[3]} />
        </DateBox>
        <DateBox>
          <h5>Fri {shortDates[4]}</h5>
          <WorkedHoursBox punchInfo={Object.values(employeePunchesByDate)[4]} />
        </DateBox>
        <DateBox>
          <h5>Sat {shortDates[5]}</h5>
          <WorkedHoursBox punchInfo={Object.values(employeePunchesByDate)[5]} />
        </DateBox>
        <DateBox>
          <h5>Sun {shortDates[6]}</h5>
          <WorkedHoursBox punchInfo={Object.values(employeePunchesByDate)[6]} />
        </DateBox>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Total hours: {cumulativeHours}</h4>
          <p>
            @ ${wage}.00/hour = ${(wage * cumulativeHours).toFixed(2)}
          </p>
        </div>
      </Wrapper>
    );
  } else {
    return <></>;
  }
}

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  display: grid;
  border: 1px dashed green;
  grid-template-areas: 'name mon tue wed thu fri sat sun total';
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
`;

const DateBox = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

export default PayrollRow;
