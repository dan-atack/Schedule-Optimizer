import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeePaystubs } from '../../actions';

function EmployeePaystubs({ employee }) {
  const dispatch = useDispatch();
  const stubs = useSelector((state) => state.payroll.paystubs);
  // fetch the employee's paystubs:
  React.useEffect(() => {
    fetch(`/api/get_paystubs/${employee._id}`)
      .then((res) => {
        return res.json();
      })
      .then((reply) => dispatch(getEmployeePaystubs(reply.data)));
  }, []);

  return (
    <Wrapper>
      <h3>{employee.userName}'s Pay Stubs</h3>
      {stubs.length > 0 ? (
        stubs.map((stub) => {
          return (
            <Stub>
              <h4>
                Pay Period:{' '}
                {stub.weekOf.slice(6).split('--PUNCH-').join(' to ')}
              </h4>
              <p>Hours Worked: {stub.hours}</p>
              <p>Hourly Wage: ${stub.wage.toFixed(2)}</p>
              <p>Total Earnings: ${stub.earnings.toFixed(2)}</p>
              <p>Tax Rate: 30%</p>
              <p>Net Earnings: ${stub.netRevenue.toFixed(2)}</p>
              <p>~~~~~~~</p>
              <p>
                Please keep this statement for your annual tax revenue
                declarations. The government thanks you for that.
              </p>
            </Stub>
          );
        })
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Stub = styled.div`
  margin: 8px;
  border: 2px solid green;
  border-radius: 8px;
  padding: 8px;
  text-align: left;
`;

export default EmployeePaystubs;
