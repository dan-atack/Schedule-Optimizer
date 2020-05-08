import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { focusOnEmployee } from '../../actions';
import NewEmployeeForm from '../../components/NewEmployeeForm';

function EmployeesList() {
  // Like in the schedule page, we will use dispatch to focus on one particular employee:
  const dispatch = useDispatch();
  const toggleFocus = (employee) => {
    focusEmployee
      ? dispatch(focusOnEmployee(null))
      : dispatch(focusOnEmployee(employee));
  };
  // Since employees are in state as soon as the main page loads, just get them from state and map down below:
  const employees = useSelector((state) => state.employeeList.employees);
  const focusEmployee = useSelector(
    (state) => state.employeeList.focusEmployee
  );
  return (
    <Wrapper>
      <h1 style={{ gridArea: 'head', margin: 16 }}>
        Employees Are Our Greatest Asset
      </h1>
      <ul
        style={{
          gridArea: 'list',
          border: '1px solid black',
          borderRadius: '8px',
          padding: 8,
          margin: 16,
          textAlign: 'left',
        }}
      >
        {employees.map((employee) => {
          return (
            <Lister key={employee._id} onMouseUp={() => toggleFocus(employee)}>
              {employee.userName}
            </Lister>
          );
        })}
      </ul>
      <Focus>
        {focusEmployee ? (
          <>
            <h2 style={{ gridArea: 'name' }}>
              {`${focusEmployee.userName} : ${focusEmployee._id}`}
            </h2>
            <h3>{focusEmployee.title}</h3>
            <h4>Hired: {focusEmployee.hireDate}</h4>
            <h4>Hourly Wage: ${focusEmployee.wage.toFixed(2)}</h4>
            <h4>Email: {focusEmployee.email}</h4>
            <h4>
              Admin Status:{' '}
              {focusEmployee.isAdmin ? 'Full Admin Access' : 'Regular Access'}
            </h4>
          </>
        ) : (
          <></>
        )}
      </Focus>
      <NewEmployeeForm employeeList={employees} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  display: grid;
  grid-template-areas:
    'head head'
    'list focus'
    'list recruit';
  grid-template-rows: 1fr 3fr 4fr;
  grid-template-columns: 3fr 5fr;
`;

const Lister = styled.li`
  border-bottom: 1px solid black;
  padding: 4px;
  :hover {
    cursor: pointer;
  }
`;

const Focus = styled.div`
  margin: 16px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 8px;
  text-align: left;
  grid-area: focus;
  display: grid;
  grid-template-areas:
    'name'
    'title'
    'hired'
    'wage'
    'email'
    'admin';
  grid-template-rows: 2fr 1fr 1fr 1fr 1fr 1fr;
`;

export default EmployeesList;
