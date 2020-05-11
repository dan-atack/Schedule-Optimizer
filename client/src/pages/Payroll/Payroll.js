import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getValidPunches } from '../../actions';
import PayrollRow from '../../components/PayrollRow';
import PayrollTotals from '../../components/PayrollTotals';

function Payroll() {
  const dispatch = useDispatch();
  // use tiny local state to determine which date range to display (default will bring us last week):
  const [weekStart, setWeekStart] = React.useState(-6);
  const [dates, setDates] = React.useState([]);
  const [shortDates, setShortDates] = React.useState([]);
  // Display the server's reply message if payroll goes through:
  const [replyMessage, setReplyMessage] = React.useState('');
  function weekSelect() {
    let dates = [];
    let shortDates = [];
    // get formatted moment dates for each day last week:
    for (let i = weekStart; i <= weekStart + 6; i++) {
      const date = moment().day(i).format('L').split('/').join('-');
      const shortDate = moment().day(i).format('L');
      dates.push(`PUNCH-${date}`);
      shortDates.push(shortDate.slice(0, 5));
    }
    setShortDates(shortDates);
    setDates(dates);
  }
  // Run week select for the default week as the page opens; hitting prev or next refreshes it:
  React.useEffect(() => {
    setReplyMessage('');
    weekSelect();
  }, [weekStart]);

  // Get employee names so we can use them to map payroll rows:
  const employees = useSelector((state) => state.employeeList.employees);
  const payrollData = useSelector((state) => state.payroll.employees);

  // And last but not least, the function for fetching all our lovely payroll data:
  const fetchWeeklyPunches = (dates) => {
    fetch('/api/admin/payroll/valids_for_period', {
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
      .then((reply) => dispatch(getValidPunches(reply.data)));
  };

  // APPROVE PAYROLL: Sends all current payroll data to the DB's PAYROLL collection:
  const handleApprove = () => {
    fetch('/api/admin/submit_payroll', {
      method: 'POST',
      body: JSON.stringify(payrollData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((reply) => setReplyMessage(reply.data));
  };
  // Default fetch fires upon page load:
  if (dates.length > 0) fetchWeeklyPunches(dates);

  return (
    <Wrapper>
      {/* "Yeahhh, you're gonna need to talk to payroll about that..." */}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button type='button' onMouseUp={() => setWeekStart(weekStart - 7)}>
          Previous week
        </button>
        <h2>
          Payroll Data: Week of {moment().day(weekStart).format('LL')} -{' '}
          {moment()
            .day(weekStart + 6)
            .format('LL')}
        </h2>
        <button type='button' onMouseUp={() => setWeekStart(weekStart + 7)}>
          Next Week
        </button>
      </div>

      <PayGrid>
        <div
          style={{
            width: '100%',
            height: '48px',
            display: 'grid',
            gridTemplateColumns: '2fr 7fr 2fr',
          }}
        >
          <span style={{ border: '1px solid green', paddingTop: 6 }}>
            Employee Name
          </span>
          <span style={{ border: '1px solid green', paddingTop: 6 }}>
            Validated Hours per Date
          </span>
          <span style={{ border: '1px solid green', paddingTop: 6 }}>
            Total
          </span>
        </div>
        {employees.map((employee) => {
          return (
            <PayrollRow
              key={Math.random() * 1000000000}
              employee={employee}
              dates={dates}
              shortDates={shortDates}
            />
          );
        })}
        <PayrollTotals />
        <Approve type='button' onMouseUp={handleApprove}>
          Approve Payroll
        </Approve>
        <h3>{replyMessage}</h3>
      </PayGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;

const PayGrid = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid green;
`;

const Approve = styled.button`
  margin-top: 32px;
  border: 3px solid rgb(69, 71, 67);
  border-radius: 16px;
  height: 64px;
  width: 128px;
  background-color: limegreen;
  :hover {
    cursor: pointer;
  }
`;

export default Payroll;
