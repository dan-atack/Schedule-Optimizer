import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { assignEmployeeToRole, addEmployeeToDate } from '../../actions';

function Role({ roleName, date, shiftNum }) {
  const dispatch = useDispatch();
  // Now all we need is a drop down menu to assign workers to a role and we'll be on a roll!!!
  const [dropped, setDropped] = React.useState('none');
  // Drop down toggle function:
  const handleDDToggle = () => {
    dropped === 'initial' ? setDropped('none') : setDropped('initial');
  };
  // Get employees list for drop down menu:
  const employees = useSelector((state) => state.employeeList.employees);
  // get the name of the person you assigned to persist when you hit the button:
  const employeeInRole = useSelector(
    (state) => state.draft.dates[date][shiftNum]['roles'][roleName]['employee']
  );
  // Prevent employees from showing up in the list if they're already working the shift:
  const [deployed, setDeployed] = React.useState([]);
  const rolesInShift = useSelector(
    (state) => state.draft.dates[date][shiftNum]['roles']
  );
  React.useEffect(() => {
    if (Object.values(rolesInShift)) {
      let inUse = [];
      Object.values(rolesInShift).forEach((role) => {
        if (role.employee !== '') inUse.push(role.employee._id);
      });
      setDeployed(inUse);
    }
  }, [employeeInRole]);

  // Get shift start times to add to state when the shift is ready:
  const [start, finish] = useSelector(
    (state) => state.schedule.shiftTimes[shiftNum]
  );
  // handler function to put the final pieces of the puzzle into state:
  const employeeSelectHandler = (employee) => {
    setDropped('none');
    // Mother of God, there it is: The Shift Data Bit at last!!!
    dispatch(
      assignEmployeeToRole(date, shiftNum, roleName, employee, start, finish)
    );
    // Here we are, adding the same data to the 'upload' version, which is a flatter arrangement of the same information:
    dispatch(addEmployeeToDate(date, employee, roleName, start, finish));
  };

  return (
    <Wrapper>
      <h4>{roleName.split('_').join(' ')}</h4>
      <button onMouseUp={handleDDToggle}>
        {employeeInRole
          ? // first name basis plus initial saves space on the display area:
            `${employeeInRole.userName.split(' ')[0]} ${
              employeeInRole.userName.split(' ')[1][0]
            }.`
          : dropped === 'none'
          ? 'Add Staff'
          : 'Hide Staff'}
      </button>
      <DDList show={dropped}>
        {employees.map((employee) => {
          // Prevent multiple assignments in the same shift:
          if (!deployed.includes(employee._id))
            return (
              <li style={{ zIndex: 3 }} key={Math.random() * 1000000}>
                <button
                  onMouseUp={() => {
                    employeeSelectHandler(employee);
                  }}
                >
                  {employee.userName}
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
