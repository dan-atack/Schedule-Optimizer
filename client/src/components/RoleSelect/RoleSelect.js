import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addRoleToShift } from '../../actions';

function RoleSelect({ date, shiftNum }) {
  // Now with the very specific task of adding an empty role slot to the target shift
  const dispatch = useDispatch();
  // dropdown menu to pick a role:
  const [dropped, setDropped] = React.useState('none');
  const handleDDToggle = () => {
    dropped === 'initial' ? setDropped('none') : setDropped('initial');
  };
  const [role, setRole] = React.useState('');
  const handleRoleSelect = (role) => {
    setDropped('none');
    setRole(role);
    dispatch(addRoleToShift(date, shiftNum, role));
  };
  return (
    <>
      <button onMouseUp={handleDDToggle}>
        {dropped === 'none' ? 'Add ' : 'Hide '} Roles
      </button>
      <Rolls show={dropped}>
        <Royce>
          <button onMouseUp={() => handleRoleSelect('super')}>
            Supervisor
          </button>
        </Royce>
        <Royce>
          <button onMouseUp={() => handleRoleSelect('worker')}>Worker</button>
        </Royce>
      </Rolls>
      <span>{role}</span>
    </>
  );
}

const Rolls = styled.ul`
  padding-left: 6px;
  display: ${(props) => props.show};
`;

const Royce = styled.li`
  border-bottom: 1px solid black;
`;

export default RoleSelect;
