import produce from 'immer';
import moment from 'moment';

const initialState = {
  datesOnDisplay: [],
  punchList: [],
  validatedPunches: [],
};

export default function punchDataReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PUNCH_DATA_FOR_ONE_DATE': {
      return produce(state, (draftState) => {
        // when the data comes back, the date goes to its own array, and the punches to the punchList:
        draftState.datesOnDisplay = [];
        draftState.datesOnDisplay.push(action.date);
        // to eliminate all issues, simply clear the array then repopulate it each time:
        draftState.punchList = [];
        action.punches.forEach((punch) => {
          draftState.punchList.push(punch);
        });
      });
    }
    case 'GET_PUNCH_DATA_FOR_RANGE_OF_DATES': {
      return produce(state, (draftState) => {
        draftState.datesOnDisplay = [];
        // add all the dates being shown to the dates on display list:
        action.dates.forEach((date) => draftState.datesOnDisplay.push(date));
        draftState.punchList = [];
        // add all of the punches to the punch list:
        action.punches.forEach((punch) => draftState.punchList.push(punch));
      });
    }
    case 'UPDATE_PUNCH_VALIDATION': {
      return produce(state, (draftState) => {
        draftState.punchList[action.punchIndex] = action.punchData;
      });
    }
    case 'GET_VALID_PUNCHES': {
      // gets just the valid punches for a particular period into state for payroll:
      return produce(state, (draftState) => {
        draftState.validatedPunches = [];
        action.punches.forEach((punch) =>
          draftState.validatedPunches.push(punch)
        );
      });
    }
    default:
      return state;
  }
}
