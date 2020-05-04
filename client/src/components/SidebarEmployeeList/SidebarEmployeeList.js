import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { focusOnEmployee } from '../../actions';

function SidebarEmployeeList() {
  // use dispatch to bring one employee's info into the detail box:
  const dispatch = useDispatch();

  const handleDetail = (employee) => {
    dispatch(focusOnEmployee(employee));
  };

  const employees = useSelector((state) => state.employeeList.employees);
  return (
    <Wrapper>
      <ul>
        {employees.map((employee) => {
          return (
            <Worker
              key={employee._id}
              style={{}}
              onMouseUp={() => handleDetail(employee)}
            >
              {employee.userName}
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
  border-bottom: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;

export default SidebarEmployeeList;
