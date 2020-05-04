import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getScheduledEmployeeIds } from '../../actions';
import LoginBox from '../../components/LoginBox';
import Punchclock from '../../components/Punchclock';

function Login() {
  // get the id's of (scheduled) employees to assist punchclock:
  const dispatch = useDispatch();
  fetch('/api/schedule_ids')
    .then((res) => {
      return res.json();
    })
    .then((reply) => dispatch(getScheduledEmployeeIds(reply.data)));
  // send the current date to the DB to prepare it to accept punchclock activity:
  fetch('/api/setup_date', {
    method: 'POST',
    body: JSON.stringify({ date: moment().format('L').split('/').join('-') }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((reply) => console.log(reply.message));
  return (
    <Wrapper>
      <Register>
        <button>Sign up with passkey!</button>
      </Register>
      <LoginBox style={{ gridArea: 'signin', height: 180 }} />
      <Punchclock></Punchclock>
      <Footer>
        <span>about </span>
        <span> contact </span>
        <span>copyright 2020</span>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: rgb(80, 75, 75);
  color: whitesmoke;
  text-align: center;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'register'
    'signin'
    'punch'
    'foot';
  grid-template-rows: 0.5fr 1fr 2fr 0.5fr;
`;

const Register = styled.div`
  grid-area: register;
  text-align: right;
`;

const Footer = styled.div`
  grid-area: foot;
`;

export default Login;
