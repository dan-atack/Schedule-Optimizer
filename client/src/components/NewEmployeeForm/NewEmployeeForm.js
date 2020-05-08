import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

function NewEmployeeForm({ employeeList }) {
  // Use employee List for ID generation:
  const proposedNewId = `EMP-${2000 + employeeList.length}`;
  // lots of controlled components for this form:
  const [userName, setUserName] = React.useState({ value: '' });
  const handleUserNameChange = (ev) => {
    setUserName({ value: ev.target.value });
  };
  const [_id, set_id] = React.useState({ value: proposedNewId });
  const handle_idChange = (ev) => {
    set_id({ value: ev.target.value });
  };
  const [title, setTitle] = React.useState({ value: '' });
  const handleTitleChange = (ev) => {
    setTitle({ value: ev.target.value });
  };
  const [wage, setWage] = React.useState({ value: 15.0 });
  const handleWageChange = (ev) => {
    setWage({ value: ev.target.value });
  };
  const [email, setEmail] = React.useState({ value: '' });
  const handleEmailChange = (ev) => {
    setEmail({ value: ev.target.value });
  };
  const [adminStatus, setAdminStatus] = React.useState({ value: false });
  const handleAdminStatusChange = (ev) => {
    setAdminStatus({ value: ev.target.value });
  };
  // and lastly, for the reply message:
  const [reply, setReply] = React.useState('');
  // Enter employee to database:
  const handleSubmit = () => {
    fetch('/api/admin/add_new_employee', {
      method: 'POST',
      body: JSON.stringify({
        _id: _id.value,
        password: 'welcome123',
        userName: userName.value,
        isAdmin: adminStatus.value,
        hireDate: moment().format('LL'),
        email: email.value,
        wage: Number(wage.value),
        title: title.value,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((reply) => setReply(reply.message));
  };

  return (
    <Wrapper>
      <BigForm>
        <h3 style={{ gridArea: 'head' }}>Enter New Employee Details</h3>
        <label
          style={{
            marginRight: 8,
            gridArea: 'namelab',
            borderBottom: '1px solid black',
            paddingTop: 4,
          }}
        >
          Employee Name:
        </label>
        <input
          style={{ gridArea: 'name' }}
          type='text'
          value={userName.value}
          onChange={handleUserNameChange}
          required
        ></input>
        <label
          style={{
            marginRight: 8,
            gridArea: 'idenlab',
            borderBottom: '1px solid black',
            paddingTop: 4,
          }}
        >
          Proposed UserID:
        </label>
        <input
          style={{ gridArea: 'iden' }}
          type='text'
          value={_id.value}
          onChange={handle_idChange}
          required
        ></input>
        <label
          style={{
            marginRight: 8,
            gridArea: 'titlab',
            borderBottom: '1px solid black',
            paddingTop: 4,
          }}
        >
          Title:
        </label>
        <input
          style={{ gridArea: 'title' }}
          type='text'
          value={title.value}
          onChange={handleTitleChange}
          required
        ></input>
        <label
          style={{
            marginRight: 8,
            gridArea: 'wagelab',
            borderBottom: '1px solid black',
            paddingTop: 4,
          }}
        >
          Hourly Wage:
        </label>
        <input
          style={{ gridArea: 'wage' }}
          type='number'
          value={wage.value}
          onChange={handleWageChange}
          required
        ></input>
        <label
          style={{
            marginRight: 8,
            gridArea: 'emaillab',
            borderBottom: '1px solid black',
            paddingTop: 4,
          }}
        >
          Email Address:
        </label>
        <input
          style={{ gridArea: 'email' }}
          type='email'
          value={email.value}
          onChange={handleEmailChange}
          required
        ></input>
        <label
          style={{
            marginRight: 8,
            gridArea: 'adminlab',
            borderBottom: '1px solid black',
            paddingTop: 4,
          }}
        >
          Admin Status:
        </label>
        <input
          style={{ gridArea: 'admin', marginTop: 8, width: 24, height: 24 }}
          type='checkbox'
          value={adminStatus.value}
          onChange={handleAdminStatusChange}
          required
        ></input>
      </BigForm>
      <button
        type='button'
        onMouseUp={handleSubmit}
        style={{
          gridArea: 'send',
          height: 64,
          width: 96,
          borderRadius: 16,
          backgroundColor: 'limegreen',
          border: '2px solid rgb(69, 71, 67)',
          position: 'relative',
          top: 64,
          right: 24,
        }}
      >
        Join the Team!
      </button>
      <h4 style={{ gridArea: 'reply' }}>{reply}</h4>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 584px;
  max-height: 256px;
  margin: 16px;
  border: 1px solid black;
  border-radius: 8px;
  grid-area: recruit;
  display: grid;
  grid-template-areas:
    'form send'
    'form reply';
  grid-template-columns: 6fr 1fr;
  grid-template-rows: 6fr 1fr;
`;

const BigForm = styled.form`
  align-content: left;
  justify-content: left;
  padding: 8px;
  margin: 16px;
  grid-area: form;
  display: grid;
  grid-template-areas:
    'head head'
    'namelab name'
    'idenlab iden'
    'titlab title'
    'wagelab wage'
    'emaillab email'
    'adminlab admin';
`;

export default NewEmployeeForm;
