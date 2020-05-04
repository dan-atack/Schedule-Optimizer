import produce from 'immer';

const initialState = {
  dates: {},
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DATE': {
      console.log(state);
      return produce(state, (draftState) => {
        draftState.dates[action.date] = {};
      });
    }
    case 'ADD_EMPLOYEE_TO_DATE': {
      return produce(state, (draftState) => {
        draftState.dates[action.date][action._id] = {
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
