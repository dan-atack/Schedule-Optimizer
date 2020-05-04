import React from 'react';
import styled from 'styled-components';

function ValidatorButton({
  text,
  date,
  employee,
  timeObject,
  inOrOut,
  validity,
}) {
  // Quite a lot of args needed to ensure the correct punch is validated; validity parameter = whether or not to validate (bool):
  const validatePunch = (date, employee, inOrOut, validity) => {
    console.log(date, employee, inOrOut, validity);
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
    });
  };
  return (
    <>
      <Button
        onMouseUp={() => validatePunch(date, employee, inOrOut, validity)}
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
