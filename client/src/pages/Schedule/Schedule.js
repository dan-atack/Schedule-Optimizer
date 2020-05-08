import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import SchedBox from '../../components/SchedBox';
import ScheduleSidebar from '../../components/ScheduleSidebar';
import { useDispatch } from 'react-redux';
import { addDate } from '../../actions';

function Schedule({ period, display }) {
  // getting dates into our schedule (and into the state):
  const dispatch = useDispatch();
  //// Use local state for displaying dates:
  // Long format (string literal) for page header:
  const [weekDisplay, setWeekDisplay] = React.useState('');
  // list for passing to schedbox as props:
  const [dates, setDates] = React.useState([]);
  // integer for using moment to generate more dates for schedule creator's next button:
  const [weekStartInt, setWeekStartInt] = React.useState(8);
  // Function for displaying initial dates and adding dates to the draft-schedule's date range:
  const setInitialDateRange = (period) => {
    switch (period) {
      case 'new':
        // start of (next) week in long-hand format:
        const formattedNextStart = moment().day(8).format('LL');
        // end of (next) week in long-hand format:
        const formattedNextEnd = moment().day(14).format('LL');
        // send shorthand format string to redux to use as keys for individual dates in the schedule:
        let dateRange = [];
        for (let i = 8; i <= 14; i++) {
          // switch out the slashes for dashes (at least it rhymes) before dispatching those dates:
          const slashDate = moment().day(i).format('L');
          const dashDate = slashDate.split('/').join('-');
          dispatch(addDate(dashDate));
          dateRange.push(dashDate);
        }
        setWeekDisplay(`Week of: ${formattedNextStart} - ${formattedNextEnd}`);
        setDates(dateRange);
        setWeekStartInt(8);
        break;
      case 'current':
        const formattedCurrStart = moment().day('Monday').format('LL');
        const formattedCurrEnd = moment().day(7).format('LL');
        let currentDateRange = [];
        for (let i = 1; i <= 7; i++) {
          // absurdly, we need to switch out the slashes for dashes (at least it rhymes) before dispatching those dates:
          const slashDate = moment().day(i).format('L');
          const dashDate = slashDate.split('/').join('-');
          dispatch(addDate(dashDate));
          currentDateRange.push(dashDate);
        }
        setWeekDisplay(`Week of: ${formattedCurrStart} - ${formattedCurrEnd}`);
        setDates(currentDateRange);
        setWeekStartInt(1);
        break;
      default:
        return '';
    }
  };
  React.useEffect(() => {
    setInitialDateRange(period);
  }, []);
  // lets you navigate to new weeks if you're creating new schedule:
  const handleNextWeek = () => {
    if (display === 'edit' || weekStartInt < 1) {
      let range = [];
      for (let i = weekStartInt + 7; i <= weekStartInt + 13; i++) {
        dispatch(addDate(moment().day(i).format('L').split('/').join('-')));
        range.push(moment().day(i).format('L').split('/').join('-'));
      }
      setDates(range);
      setWeekStartInt(weekStartInt + 7);
      setWeekDisplay(
        `Week of: ${moment()
          .day(weekStartInt + 7)
          .format('LL')} - ${moment()
          .day(weekStartInt + 13)
          .format('LL')}`
      );
    } else {
      console.log('cannot view schedule beyond current week');
    }
  };
  const handlePrevWeek = () => {
    // you can't scroll back beyond the current week in editor mode:
    if (display === 'view' || weekStartInt > 8) {
      let range = [];
      for (let i = weekStartInt - 7; i <= weekStartInt - 1; i++) {
        dispatch(addDate(moment().day(i).format('L').split('/').join('-')));
        range.push(moment().day(i).format('L').split('/').join('-'));
      }
      setDates(range);
      setWeekStartInt(weekStartInt - 7);
      setWeekDisplay(
        `Week of: ${moment()
          .day(weekStartInt - 7)
          .format('LL')} - ${moment()
          .day(weekStartInt - 1)
          .format('LL')}`
      );
    } else {
      console.log('cannot view prior weeks in schedule creator mode.');
    }
  };

  return (
    <Wrapper>
      <button
        type='button'
        onMouseUp={handlePrevWeek}
        style={{
          gridArea: 'prev',
          borderRadius: '16px 6px 6px 16px',
          border: '2px solid blue',
        }}
      >
        PREVIOUS WEEK
      </button>
      <h2 style={{ gridArea: 'title' }}>{weekDisplay}</h2>
      <button
        type='button'
        onMouseUp={handleNextWeek}
        style={{
          gridArea: 'next',
          borderRadius: '6px 16px 16px 6px',
          border: '2px solid blue',
        }}
      >
        NEXT WEEK
      </button>
      <Body>
        <SchedBox dates={dates}></SchedBox>
      </Body>
      <ScheduleSidebar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'prev title next'
    'main main side';
  grid-template-columns: 1fr 3fr 1fr;
  height: 95vh;
`;

const Body = styled.div`
  text-align: center;
  border: 1px solid black;
  height: auto;
  grid-area: main;
`;

export default Schedule;
