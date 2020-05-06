import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updatePunchValidation } from '../../actions';

function ValidatorButton({
  text,
  date,
  employee,
  timeObject,
  inOrOut,
  validity,
  punchListIndex,
}) {
  const dispatch = useDispatch();
  // Quite a lot of args needed to ensure the correct punch is validated; validity parameter = whether or not to validate (bool),
  // Punch List Index is used for updating the correct entry (rather than duplicating it) in redux when the return arrives:
  const validatePunch = (date, employee, inOrOut, validity, punchListIndex) => {
    fetch(`/api/admin/punches/validate/${date}`, {
      method: 'POST',
      body: JSON.stringify({
        employee: employee,
        timeObject: timeObject,
        inOrOut: inOrOut,
        validity: validity,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      // simply have the server return the updated value; no need to find again...
      .then((res) => {
        return res.json();
      })
      .then((reply) =>
        dispatch(updatePunchValidation(punchListIndex, reply.updatedData))
      );
  };
  return (
    <>
      <Button
        onMouseUp={() =>
          validatePunch(date, employee, inOrOut, validity, punchListIndex)
        }
      >
        {text}
      </Button>
    </>
  );
}

const Button = styled.button`
  border: 2px solid whitesmoke;
  border-radius: 8px;
`;

export default ValidatorButton;
