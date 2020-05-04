import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getPunchDataForToday } from '../../actions';

function PunchDisplayPanel() {
  const dispatch = useDispatch();
  // Fetch functions for punchclock data:
  function getTodaysPunches() {
    const today = moment().format('L').split('/').join('-');
    fetch(`/api/admin/punches/${today}`)
      .then((res) => {
        return res.json();
      })
      .then((reply) =>
        // separate data into date and punch data (data comes in a list of the object values from the dB):
        dispatch(getPunchDataForToday(reply.data[0], reply.data.slice(1)))
      );
  }
  return (
    <Wrapper>
      <button>Show All</button>
      <button type='button' onMouseUp={getTodaysPunches}>
        Today
      </button>
      <button>This Week</button>
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
