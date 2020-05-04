// Let's IMMERse ourselves in something new ... or not!
import produce from 'immer';

// Define initial state for users list:

const initialState = {
  timeDisplay: 'shift',
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
      // if we're adding shifts then make a new one, if we're removing them then simply hide the rest:
      return produce(state, (draftState) => {
        draftState.numShifts = action.numShifts;
        // if adding new shifts, give them the standard default start/finish times:
        draftState.shiftTimes[`shift_${action.numShifts}`] = [9, 17];
      });
      // times variable will ultimately become the new shiftTimes value after some, ah, 'tinkering':
      // let times = state.shiftTimes;
      // // Increasing the number of shifts adds more shifts without altering start/finish times of the existing ones...
      // // The logic: count how many shifts there are, then if the number coming in from the shift counter on the FE is greater than
      // // the amount we have now, add a new template shift; if not, remove the highest numbered shift from the list and return that:
      // let prevShiftNos = [];
      // Object.keys(times).forEach((key) => {
      //   let splits = key.split('_');
      //   prevShiftNos.push(Number(splits[1]));
      // });
      // // Using the spread operator in the most unlikely way - converting an array to a list of its members in order to find the max:
      // if (action.numShifts > Math.max(...prevShiftNos)) {
      //   // if the action value is higher than the current number of shifts, add a new one with default start/finish times:
      //   times[`shift_${action.numShifts}`] = [9, 17];
      // } else {
      //   // if it isn't, then remove the shift with the highest number (the most recently added one):
      //   delete times[`shift_${Math.max(...prevShiftNos)}`];
      // }
      // return {
      //   ...state,
      //   numShifts: action.numShifts,
      //   shiftTimes: times,
      // };
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
