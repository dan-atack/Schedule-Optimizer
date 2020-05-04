import React from 'react';
import styled from 'styled-components';
import RoleSelect from '../RoleSelect';
import Role from '../Role';
import { useSelector } from 'react-redux';

// relative size prop is the fraction of its parent's height it should occupy:
function ShiftBox({ relativeSize, shiftNum, date }) {
  // percent is how we explain that to the styled wrapper:
  const percent = `${(relativeSize * 100).toFixed(0)}%`;
  // TRY CATCH FOR THE MOTHAF**** WIN BABAY!!
  try {
    let roles = useSelector(
      (state) => state.draft.dates[date][`shift_${shiftNum}`]['roles']
    );
    return (
      <Wrapper percent={percent}>
        <h3>Shift {shiftNum}</h3>
        <div>
          {Object.keys(roles).map((role) => {
            return (
              <Role
                key={Math.random() * 10000000}
                roleName={role}
                shiftNum={shiftNum}
                date={date}
              ></Role>
            );
          })}
        </div>
        <RoleSelect date={date} shiftNum={shiftNum} />
      </Wrapper>
    );
  } catch {
    return (
      <Wrapper percent={percent}>
        <h3>Shift {shiftNum}</h3>
        <RoleSelect date={date} shiftNum={shiftNum} />
      </Wrapper>
    );
  }
}
// dynamic rendering at last!
const Wrapper = styled.div`
  border: 1px solid black;
  height: ${(props) => props.percent};
`;

export default ShiftBox;
