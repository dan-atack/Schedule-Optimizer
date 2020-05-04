import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function EmployeesList() {
  // Since employees are in state as soon as the main page loads, just get them from state and map down below:
  const employees = useSelector((state) => state.employeeList.employees);
  return (
    <Wrapper>
      <h1>Employees List</h1>
      <ul>
        {employees.map((employee) => {
          return <div key={employee._id}>{employee.userName}</div>;
        })}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;

export default EmployeesList;
