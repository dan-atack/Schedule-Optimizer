import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function NotificationEmployeeList() {
  const employees = useSelector((state) => state.employeeList.employees);
  return (
    <Wrapper>
      <ul>
        {employees.map((employee) => {
          return (
            <Worker key={employee._id}>
              <button type='button'>Add</button>
              <span style={{ marginLeft: 8 }}>{employee.userName}</span>
            </Worker>
          );
        })}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  height: 35%;
  width: 90%;
  margin: 5%;
  padding: 2px;
  text-align: left;
`;

const Worker = styled.div`
  padding-left: 4px;
  justify-content: space-around;
  border-bottom: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;

export default NotificationEmployeeList;
