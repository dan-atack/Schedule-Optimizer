import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../actions';

function LoginBox() {
  const dispatch = useDispatch();
  // We will use the history function to navigate to the appropriate page when a user signs in:
  const history = useHistory();
  // Server connection test function mkII: Send a packet of info with user id and pw to the server and await a (generic) reply:

  const submitLoginData = (data) => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((reply) => {
        // if login is successful then store the user's info in redux state:
        if (reply.status === 200) {
          dispatch(
            signInUser({
              _id: reply.userData._id,
              userName: reply.userData.userName,
              isAdmin: reply.userData.isAdmin,
            })
          );
          // then send the user to the appropriate 'main' page:
          reply.userData.isAdmin
            ? history.push(
                // eliminate awkward spaces - which become '%20' in the url address:
                `/admin/${reply.userData.userName.split(' ').join('')}`
              )
            : history.push(
                `/employee/${reply.userData.userName
                  .split(' ')
                  .join('')}/schedule`
              );
        } else {
          console.log(reply.message);
        }
      });
  };

  // Local state for 'controlled' input component for user ID and PW fields:
  const [idInput, setIdInput] = React.useState({ value: '' });
  const [pwInput, setPwInput] = React.useState({ value: '' });
  // ID value change handler:
  const handleIdChange = (ev) => {
    setIdInput({ value: ev.target.value });
  };
  // PW value change handler:
  const handlePwChange = (ev) => {
    setPwInput({ value: ev.target.value });
  };
  // Submit handler:
  const submitHandler = (ev) => {
    ev.preventDefault();
    submitLoginData({ userId: idInput.value, pw: pwInput.value });
  };

  return (
    <Box>
      <h2 style={{ gridArea: 'greet', margin: 4 }}>
        Sign in with Employee ID:
      </h2>
      <FormArea onSubmit={submitHandler}>
        <label style={{ gridArea: 'name', margin: 4 }}>Employee ID: </label>
        <input
          style={{ gridArea: 'nfield', margin: 4 }}
          type='text'
          value={idInput.value}
          onChange={handleIdChange}
          required
        />
        <label style={{ gridArea: 'pw', margin: 4 }}>Password: </label>
        <input
          style={{ gridArea: 'pwfield', margin: 4 }}
          type='password'
          value={pwInput.value}
          onChange={handlePwChange}
          required
        />
        <button
          style={{ gridArea: 'go', margin: 4 }}
          type='submit'
          value='Submit'
        >
          ENTER
        </button>
      </FormArea>
    </Box>
  );
}

const Box = styled.div`
  border: 1px solid whitesmoke;
  border-radius: 8px;
`;

const FormArea = styled.form`
  display: grid;
  grid-template-areas:
    'greet greet'
    'name nfield'
    'pw pwfield'
    'go go';
  padding: 4px;
`;

export default LoginBox;
