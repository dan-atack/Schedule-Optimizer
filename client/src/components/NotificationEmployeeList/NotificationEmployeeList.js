import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleRecipient, clearRecipients } from '../../actions';

function NotificationEmployeeList() {
  const dispatch = useDispatch();
  const handleCheckbox = (ev) => {
    dispatch(toggleRecipient(ev.target.name));
  };
  const employees = useSelector((state) => state.employeeList.employees);
  return (
    <Wrapper>
      <ul>
        {employees.map((employee) => {
          return (
            <Worker key={employee._id}>
              <input
                id={`${employee._id}`}
                name={`${employee._id}`}
                type='checkbox'
                onChange={handleCheckbox}
              ></input>
              <span style={{ marginLeft: 8 }}>{employee.userName}</span>
            </Worker>
          );
        })}
      </ul>
      {/* <p>Out of Order</p>
      <button type='button' onMouseUp={() => dispatch(clearRecipients())}>
        Clear Recipients
      </button> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  height: auto;
  width: 90%;
  margin: 5%;
  padding: 2px;
  text-align: left;
`;

const Worker = styled.li`
  padding-left: 4px;
  justify-content: space-around;
  border-bottom: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;

export default NotificationEmployeeList;
