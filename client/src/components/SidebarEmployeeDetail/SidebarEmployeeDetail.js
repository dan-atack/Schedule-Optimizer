import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function SidebarEmployeeDetail() {
  // get the info for a particular individual from redux state when their name is clicked in the list component:
  const details = useSelector((state) => state.employeeList.focusEmployee);
  // toggle button for showing and employee's details:
  const [vis, setVis] = React.useState('initial');
  const handleToggle = () => {
    vis === 'initial' ? setVis('none') : setVis('initial');
  };
  if (details) {
    return (
      <Wrapper toggled={vis}>
        <button
          onMouseUp={handleToggle}
          style={{ position: 'relative', marginLeft: '80%', width: 24 }}
        >
          X
        </button>
        <div style={{ display: vis }}>
          <h3>{details.userName}</h3>
          <p>{details.title}</p>
          <p>Hired: {details.hireDate}</p>
          <p>Wage: ${details.wage}/hour</p>
          <p>{details.isAdmin ? 'Admin Access' : 'Regular User'}</p>
        </div>
      </Wrapper>
    );
  } else {
    return <Wrapper style={{ height: '3%' }}>Employee Details</Wrapper>;
  }
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: ${(props) => (props.toggled === 'none' ? '10%' : '30%')};
  width: 90%;
  margin: 5%;
  padding: 2px;
  text-align: left;
  font-size: 16px;
`;

export default SidebarEmployeeDetail;
