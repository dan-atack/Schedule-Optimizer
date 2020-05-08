// Let's IMMERse ourselves in something new!
import produce from 'immer';

// Define initial state for users list:

const initialState = {
  numShifts: 2,
  shiftTimes: {
    shift_1: [9, 17],
    shift_2: [9, 17],
  },
};
// statuses: idle, sendingData, receivingData, loggedIn?

export default function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SHIFT_NUMBER': {
      return produce(state, (draftState) => {
        // if adding new shifts, give them the standard default start/finish times; otherwise don't alter them:
        if (draftState.numShifts < action.numShifts) {
          draftState.shiftTimes[`shift_${action.numShifts}`] = [9, 17];
        }
        draftState.numShifts = action.numShifts;
      });
    }
    case 'SET_SHIFT_START_TIME': {
      // Immer: "I was always better."
      return produce(state, (draftState) => {
        draftState.shiftTimes[`shift_${action.shiftNum}`][0] = action.start;
      });
    }
    case 'SET_SHIFT_FINISH_TIME': {
      return produce(state, (draftState) => {
        draftState.shiftTimes[`shift_${action.shiftNum}`][1] = action.finish;
      });
    }
    default: {
      return state;
    }
  }
}
