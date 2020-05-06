import React from 'react';
import styled from 'styled-components';

// Label and function are customizable... Hurray.
function NavButton({ label }) {
  return <Button>{label}</Button>;
}

const Button = styled.button`
  height: 54px;
  width: 80px;
  padding: 2px;
  color: whitesmoke;
  font-size: 12px;
  background-color: rgb(58, 97, 206);
  border: 1px solid black;
  border-radius: 8px;
`;

export default NavButton;
