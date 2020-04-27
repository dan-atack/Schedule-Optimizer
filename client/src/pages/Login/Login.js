import React from 'react';
import styled from 'styled-components';
import LoginBox from '../../components/LoginBox';

function Login() {
  return (
    <Wrapper>
      <Register>
        <button>Sign up with passkey!</button>
      </Register>
      <LoginBox style={{ gridArea: 'signin' }} />
      <Punch>
        <span>PUNCHCLOCK UI</span>
        <button>punch in</button>
        <button> punch out</button>
      </Punch>
      <Footer>
        <span>about </span>
        <span> contact </span>
        <span>copyright 2020</span>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'register'
    'signin'
    'punch'
    'foot';
  grid-template-rows: 0.5fr, 2fr, 4fr, 0.5fr;
`;

// some day soon these will mature into components of their own...

const Register = styled.div`
  grid-area: register;
  text-align: right;
`;

const Punch = styled.div`
  grid-area: punch;
`;

const Footer = styled.div`
  grid-area: foot;
`;

export default Login;
