import React from 'react';
// import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../actions';

function Logout() {
  const dispatch = useDispatch();
  // We will use the history function to navigate back to the homepage when logout is pressed:
  const history = useHistory();

  const handleLogout = (ev) => {
    ev.preventDefault();
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <button type='button' onMouseUp={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
