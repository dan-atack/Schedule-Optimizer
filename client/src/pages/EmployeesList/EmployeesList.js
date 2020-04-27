import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeList } from '../../actions';

// Note for a case of the Mondays: Seems to be the issue is with the fetch happening over and over again...
// Reread how to avoid this with the whole catalogue of reducer states for loading statuses...
// OR just do this fetch on another page (like the manager homepage) then simply use selector here??

function EmployeesList() {
  // use redux to hold employee names once they're fetched?? How about just showing them at first?
  const dispatch = useDispatch();
  fetch('/api/admin/employees')
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      dispatch(getEmployeeList(result.data));
      // set load status here to halt the process??
    });
  // const employees = useSelector((state) => state.employeeList.employees);
  // console.log(employees);
  return (
    <Wrapper>
      <h1>Employees List</h1>
      <ul></ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;

export default EmployeesList;
