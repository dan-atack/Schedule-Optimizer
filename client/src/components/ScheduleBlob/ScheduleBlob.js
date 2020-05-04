import React from 'react';
import styled from 'styled-components';

function ScheduleBlob({ start, finish, position }) {
  return (
    <BlobShape start={start} finish={finish}>
      {position}
    </BlobShape>
  );
}

// Next-level conditional rendering, take one!
const BlobShape = styled.div`
  position: relative;
  border: 1px solid green;
  background-color: limegreen;
  top: ${(props) => `${(props.start - 6) * 20 - 1}px`};
  height: ${(props) => `${(props.finish - props.start + 1) * 20}px`};
`;

export default ScheduleBlob;
