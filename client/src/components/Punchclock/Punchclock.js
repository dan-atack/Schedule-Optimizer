import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector } from 'react-redux';

function Punchclock() {
  const scheduledIds = useSelector((state) => state.employeeList.employeeIds);
  // Status message for punch activity:
  const [message, setMessage] = React.useState('');
  // Local controlled state for employee ID value:
  const [value, setValue] = React.useState({ value: '' });
  React.useEffect(() => {
    setValue({ value: '' });
  }, [message]);
  function handleValueChange(ev) {
    setValue({ value: ev.target.value });
  }
  // Punch button handler:
  function punch(inOrOut) {
    // only allow valid ID numbers to punch in or out:
    if (scheduledIds.includes(value.value)) {
      // if the punch is good, clear the message and value fields (looks neater):
      setMessage('');
      // create 2 moments: a strng (for the punch's _id in the DB):
      const dateForId = moment().format('L').split('/').join('-');
      // and the time object itself for performing operations:
      const time = moment();
      // pack this, and the user's ID, into the data for the req. body:
      const punchData = {
        employee_id: value.value,
        date_id: dateForId,
        timeObject: time,
        punchType: inOrOut,
        validated: false,
      };
      fetch('/api/punch', {
        method: 'POST',
        body: JSON.stringify(punchData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((reply) => setMessage(reply.message));
    } else {
      setMessage('Please enter a valid 4-digit employee ID number.');
    }
  }

  return (
    <Wrapper>
      <h2>PunchClock</h2>
      <Interface>
        <label>Please enter your 4-digit employee ID:</label>
        <input
          onChange={handleValueChange}
          value={value.value}
          type='text'
          placeholder='4-digit ID'
          style={{ width: '50%' }}
          required
        ></input>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <PunchIn type='button' onMouseUp={() => punch('IN')}>
            IN
          </PunchIn>
          <PunchOut type='button' onMouseUp={() => punch('OUT')}>
            OUT
          </PunchOut>
        </div>
        <p>{message}</p>
      </Interface>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: whitesmoke;
  background-color: rgb(80, 75, 75);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 1px solid whitesmoke;
  border-radius: 6px;
`;

const Interface = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PunchIn = styled.button`
  margin-top: 16px;
  border: 2px solid whitesmoke;
  border-radius: 8px;
  background-color: limegreen;
  width: 96px;
  height: 72px;
`;
const PunchOut = styled.button`
  margin-top: 16px;
  border: 2px solid whitesmoke;
  border-radius: 8px;
  background-color: rgb(236, 63, 63);
  width: 96px;
  height: 72px;
`;

export default Punchclock;
