import produce from 'immer';

const initialState = {
  datesOnDisplay: [],
  punchList: [],
};

export default function punchDataReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PUNCH_DATA_FOR_TODAY': {
      return produce(state, (draftState) => {
        // when the data comes back, the date and punches are all in an array, with the date separated by the reducer function:
        draftState.datesOnDisplay = action.date;
        // for the individual punches, we'll add them to the punch list array one at a time:
        action.punches.forEach((punch) => draftState.punchList.push(punch));
      });
    }
    default:
      return state;
  }
}
