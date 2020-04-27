import React from 'react';
import styled from 'styled-components';

// Label and function are customizable... Hurray.
function UnstyledButton({ label }) {
  return <Button>{label}</Button>;
}

const Button = styled.button`
  height: 64px;
  width: 128px;
  border: 1px solid black;
  border-radius: 8px;
`;

export default UnstyledButton;
