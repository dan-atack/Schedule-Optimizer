import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  getPunchDataForOneDate,
  getPunchDataForDateRange,
} from '../../actions';

function PunchDisplayPanel() {
  const dispatch = useDispatch();
  // Fetch functions for punchclock data for a single date: today by default or yesterday:
  // NOTE: could eventually add an input box to select any date at all...
  function getOneDaysPunches(dateSelected = 'today') {
    const today = moment().format('L').split('/').join('-');
    const yesterday = moment()
      .subtract(1, 'days')
      .format('L')
      .split('/')
      .join('-');
    fetch(`/api/admin/punches/${dateSelected === 'today' ? today : yesterday}`)
      .then((res) => {
        return res.json();
      })
      .then((reply) =>
        // separate data into date and punch data (data comes in a list of the object values from the dB):
        dispatch(getPunchDataForOneDate(reply.data[0], reply.data.slice(1)))
      );
  }
  // Fetch function for a range of dates: uses POST method to send a formatted list for easy filtering on server-side:
  function getRangeOfPunches(range) {
    let dates = [];
    switch (range) {
      case 'last_week':
        // get formatted moment dates for each day last week:
        for (let i = -6; i <= 0; i++) {
          const date = moment().day(i).format('L').split('/').join('-');
          dates.push(`PUNCH-${date}`);
        }
        break;
      default:
        // by default we just grab everything, the cue for which will be to leave the list empty:
        dates = [];
    }
    // once the date range is established, post that list to the server and await the results:
    fetch('/api/admin/punches/range/week', {
      method: 'POST',
      body: JSON.stringify(dates),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((reply) => {
        let dateList = [];
        let punchList = [];
        reply.data.forEach((punchdate) => {
          // for each punchdate object, add it's ID (the date) to the dates list:
          dateList.push(punchdate._id);
          // and then for each of the punches is a sub-object of the punchdate, so convert those to a list and add them individually
          // to the cumulative punches list for the period:
          Object.values(punchdate)
            .slice(1)
            .forEach((punch) => punchList.push(punch));
        });
        dispatch(getPunchDataForDateRange(dateList, punchList));
      });
  }

  return (
    <Wrapper>
      <button type='button' onMouseUp={() => getOneDaysPunches()}>
        Today
      </button>
      <button type='button' onMouseUp={() => getOneDaysPunches('yesterday')}>
        Yesterday
      </button>
      <button type='button' onMouseUp={() => getRangeOfPunches('last_week')}>
        Last Week
      </button>
      <button type='button' onMouseUp={() => getRangeOfPunches('all')}>
        Show All
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 8px;
  border: 1px solid whitesmoke;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export default PunchDisplayPanel;
