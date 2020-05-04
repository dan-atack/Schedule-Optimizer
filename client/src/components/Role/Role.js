import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { assignEmployeeToRole, addEmployeeToDate } from '../../actions';

function Role({ roleName, date, shiftNum }) {
  const dispatch = useDispatch();
  // Now all we need is a drop down menu to assign workers to a role and we'll be on a roll!!!
  const [dropped, setDropped] = React.useState('none');
  // Button Text and ultimately the name of the chosen one:
  // Works... but doesn't stick: try using try-catch when this becomes important enough to prioritize:
  const [name, setName] = React.useState('Employees');
  const handleDDToggle = () => {
    dropped === 'initial' ? setDropped('none') : setDropped('initial');
  };
  // Get employees list for drop down menu:
  const employees = useSelector((state) => state.employeeList.employees);
  // Get shift start times to add to state when the shift is ready:
  const [start, finish] = useSelector(
    (state) => state.schedule.shiftTimes[`shift_${shiftNum}`]
  );
  // handler function to put the final pieces of the puzzle into state:
  const employeeSelectHandler = (_id, userName) => {
    setName(userName);
    setDropped('none');
    console.log(
      `${name} assigned to ${roleName} created for shift ${shiftNum} on date: ${date}`
    );
    // Mother of God, there it is: The Shift Data Bit at last!!!
    dispatch(
      assignEmployeeToRole(date, shiftNum, roleName, _id, start, finish)
    );
    // Here we are, adding the same data to the 'upload' version, which is a flatter arrangement of the same information:
    dispatch(addEmployeeToDate(date, _id, roleName, start, finish));
  };

  return (
    <Wrapper>
      <h4>{roleName}</h4>
      <button onMouseUp={handleDDToggle}>
        {name === 'Employees' ? (dropped === 'none' ? 'Show ' : 'Hide ') : ''}{' '}
        {name}
      </button>
      <DDList show={dropped}>
        {employees.map((worker) => {
          return (
            <li style={{ zIndex: 3 }} key={Math.random() * 1000000}>
              <button
                onMouseUp={() => {
                  employeeSelectHandler(worker._id, worker.userName);
                }}
              >
                {worker.userName}
              </button>
            </li>
          );
        })}
      </DDList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: mintcream;
  border: 2px dashed green;
`;

const DDList = styled.ul`
  z-index: 2;
  display: ${(props) => props.show};
  &:hover {
    cursor: pointer;
  }
`;

export default Role;
