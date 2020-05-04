import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PunchDisplayPanel from '../../components/PunchDisplayPanel';
import ValidatorButton from '../../components/ValidatorButton';
import { useSelector } from 'react-redux';

function PunchRecords() {
  const punchData = useSelector((state) => state.punchData.punchList);
  return (
    <Wrapper>
      <h1>PUNCHCLOCK ACTIVITY</h1>
      <PunchDisplayPanel></PunchDisplayPanel>
      <div
        style={{
          width: '100%',
          justifyContent: 'space-around',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 0.5fr',
        }}
      >
        <div style={{ border: '1px solid black' }}>Date</div>
        <div style={{ border: '1px solid black' }}>Employee</div>
        <div style={{ border: '1px solid black' }}>Time</div>
        <div style={{ border: '1px solid black' }}>In/Out</div>
        <div style={{ border: '1px solid black' }}>Validation</div>
        <div style={{ border: '1px solid black' }}>VB</div>
      </div>
      <Chart>
        {punchData.length > 0 ? (
          // use the index for alternate colour-coding to make the list easier on the eyes:
          punchData.map((punch, idx) => {
            return (
              <Entry index={idx} key={Math.random() * 10000000}>
                <span>{moment(punch.timeObject).format('L')}</span>
                <span>{punch.employee_id}</span>
                <span>{moment(punch.timeObject).format('LT')}</span>
                <span>{punch.punchType}</span>
                <span
                  style={{
                    backgroundColor: punch.validated ? 'limegreen' : 'tomato',
                  }}
                >
                  {punch.validated ? 'Validated' : 'Not Validated'}
                </span>
                <ValidatorButton
                  text={punch.validated ? 'Revise' : 'Approve'}
                  date={moment(punch.timeObject)
                    .format('L')
                    .split('/')
                    .join('-')}
                  employee={punch.employee_id}
                  timeObject={punch.timeObject}
                  inOrOut={punch.punchType}
                  validity={
                    punch.validated
                      ? false
                      : true /* this will make it like a toggle switch */
                  }
                />
              </Entry>
            );
          })
        ) : (
          <></>
        )}
      </Chart>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0px 8px;
`;

const Chart = styled.ul`
  width: 100%;
`;

const Entry = styled.li`
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.5fr;
  background-color: ${(props) =>
    props.index % 2 === 0 ? 'white' : 'rgb(221, 245, 199)'};
`;

export default PunchRecords;
