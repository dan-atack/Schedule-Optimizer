import produce from 'immer';

const initialState = {
  dates: {},
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE_TO_DATE': {
      return produce(state, (draftState) => {
        if (!draftState.dates[action.date]) draftState.dates[action.date] = {};
        draftState.dates[action.date][action.employee._id] = {
          role: action.role,
          start: action.start,
          finish: action.finish,
        };
      });
    }
    default: {
      return state;
    }
  }
}
