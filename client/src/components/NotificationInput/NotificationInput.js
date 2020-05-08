import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

function NotificationInput() {
  const dispatch = useDispatch();
  const sender = useSelector((state) => state.currentUser._id);
  const recipients = useSelector((state) => state.notification.recipients);
  // local controlled state for handling message content:
  const [message, setMessage] = React.useState({ value: '' });
  // content for the prompt area for if you forget to add recipients or text to your memo:
  const [prompt, setPrompt] = React.useState('');
  const updateMessage = (ev) => {
    setMessage({ value: ev.target.value });
  };
  // local controlled state for handling subject content:
  const [subject, setSubject] = React.useState({ value: '' });
  const updateSubject = (ev) => {
    setSubject({ value: ev.target.value });
  };
  // dispatch function: uploads memo to the server, and from there to the DB:
  const uploadMemo = (text, recipients, subject) => {
    // all memoes must have at least some body text, a subject, and at least one recipient:
    if (text.length > 0 && recipients.length > 0 && subject.length > 0) {
      const date = moment();
      let readList = [];
      // readlist: for each employee, log the time that he/she views the message (null is initial value until they read it)
      recipients.forEach((recipient) =>
        readList.push({ [`${recipient}`]: null })
      );
      const memoData = {
        _id: `MEMO-${date.format()}`,
        sent: date,
        subject: subject,
        content: text,
        readList: readList,
        sender: sender,
        recipients: recipients,
      };
      fetch('/api/admin/send_notification', {
        method: 'POST',
        body: JSON.stringify(memoData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((reply) => setPrompt(reply.message));
    } else if (text.length > 0 && subject.length > 0) {
      setPrompt('Please select at least one recipient.');
    } else if (text.length > 0) {
      setPrompt('Subject line empty. Please fill out subject line.');
    } else {
      setPrompt('Please fill in text field before sending memo.');
    }
  };
  return (
    <Wrapper>
      <label style={{ gridArea: 'labe' }}>Compose a memo:</label>
      <input
        style={{ gridArea: 'subj' }}
        type='text'
        value={subject.value}
        placeholder='subject line'
        onChange={updateSubject}
      ></input>
      <TextField
        type='text'
        value={message.value}
        onChange={updateMessage}
      ></TextField>
      <button
        type='button'
        style={{ gridArea: 'send', width: 96 }}
        onMouseUp={() => uploadMemo(message.value, recipients, subject.value)}
      >
        SEND
      </button>
      <p style={{ gridArea: 'prom' }}>{prompt}</p>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: grid;
  grid-template-areas:
    'labe subj'
    'inpu inpu'
    'send prom';
  grid-template-rows: 0.5fr 4fr 1fr;
  grid-area: boxy;
  border: 1px solid black;
`;

const TextField = styled.textarea`
  border: 2px solid green;
  grid-area: inpu;
`;

export default NotificationInput;
