import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function PayrollTotals() {
  const employees = useSelector((state) => state.payroll.employees);
  const [weeklyTotal, setWeeklyTotal] = React.useState(0);
  React.useEffect(() => {
    let total = 0;
    Object.values(employees).forEach((employee) => {
      total += employee.earnings;
      setWeeklyTotal(total);
    });
  }, [employees]);
  return (
    <Wrapper>
      <Datebox>Grand Total:</Datebox>
      <Datebox>-------</Datebox>
      <Datebox>-------</Datebox>
      <Datebox>-------</Datebox>
      <Datebox>-------</Datebox>
      <Datebox>-------</Datebox>
      <Datebox>-------</Datebox>
      <Datebox>-------</Datebox>
      <Datebox>${`${weeklyTotal.toFixed(2)}`}</Datebox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 2px solid rgb(118, 204, 60);
  display: grid;
  grid-template-areas: 'name mon tue wed thu fri sat sun grand';
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
  border-radius: 0px 0px 8px 8px;
`;

const Datebox = styled.div`
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

export default PayrollTotals;
