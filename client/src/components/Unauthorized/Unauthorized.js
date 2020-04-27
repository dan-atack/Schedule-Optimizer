import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Unauthorized({ message }) {
  return (
    <Wrapper>
      <Wrapper>
        <h1>401: Permission Denied</h1>
        <h2>{message}</h2>
        <Link to='/'>Click Here to Return to Sign-in page</Link>
      </Wrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;

export default Unauthorized;
