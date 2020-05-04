import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import SchedBox from '../../components/SchedBox';
import ScheduleSidebar from '../../components/ScheduleSidebar';
import { useDispatch } from 'react-redux';
import { addDate } from '../../actions';

function Schedule({ period }) {
  // getting dates into our schedule (and into the state):
  const dispatch = useDispatch();
  const dateRange = (period) => {
    switch (period) {
      case 'new':
        // start of (next) week in long-hand format:
        const formattedNextStart = moment().day(8).format('LL');
        // end of (next) week in long-hand format:
        const formattedNextEnd = moment().day(14).format('LL');
        // send shorthand format string to redux to use as keys for individual dates in the schedule:
        for (let i = 8; i <= 14; i++) {
          // absurdly, we need to switch out the slashes for dashes (at least it rhymes) before dispatching those dates:
          const slashDate = moment().day(i).format('L');
          const dashDate = slashDate.split('/').join('-');
          dispatch(addDate(dashDate));
        }
        return `Week of: ${formattedNextStart} - ${formattedNextEnd}`;
      case 'current':
        const formattedCurrStart = moment().day('Monday').format('LL');
        const formattedCurrEnd = moment().day(7).format('LL');
        for (let i = 1; i <= 7; i++) {
          // absurdly, we need to switch out the slashes for dashes (at least it rhymes) before dispatching those dates:
          const slashDate = moment().day(i).format('L');
          const dashDate = slashDate.split('/').join('-');
          console.log(dashDate);
          dispatch(addDate(dashDate));
        }
        return `Week of: ${formattedCurrStart} - ${formattedCurrEnd}`;
      case 'previous':
        // dates for previous schedules will have to follow a different convention since we don't want them to enter
        // the 'draft' state, and also because we don't initially know how far back to go (although 1 week is a good default value):
        const formattedPrevStart = moment().day(-6).format('LL');
        const formattedPrevEnd = moment().day(0).format('LL');
        return `Week of: ${formattedPrevStart} - ${formattedPrevEnd}`;
      default:
        return '';
    }
  };
  return (
    <Wrapper>
      <h2 style={{ gridArea: 'title' }}>{dateRange(period)}</h2>
      <Body>
        <SchedBox></SchedBox>
      </Body>
      <ScheduleSidebar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'title title'
    'main side';
  grid-template-columns: 4fr 1fr;
  height: 95vh;
`;

const Body = styled.div`
  text-align: center;
  border: 1px solid black;
  height: auto;
  grid-area: main;
`;

export default Schedule;
