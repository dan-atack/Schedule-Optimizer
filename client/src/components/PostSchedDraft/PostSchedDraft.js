import React from 'react';
// import styled from 'styled-components';
import { useSelector } from 'react-redux';

function PostSchedDraft() {
  const data = useSelector((state) => state.uploadVersion);
  const sendDatatoDB = (data) => {
    fetch('/api/admin/draft-schedule', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };
  return (
    <button onMouseUp={() => sendDatatoDB(data)}>Save Schedule Draft</button>
  );
}

export default PostSchedDraft;
