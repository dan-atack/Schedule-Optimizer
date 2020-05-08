// Define initial state for SCHEDULE DRAFTS:
// Last call for Immer!
import produce from 'immer';

// this is the initial state for building out the schedule template on the manager's side... the final version to be uploaded will
// start with the same structure but then be updated only once at the end of the schedule creation process when an employee is
// assigned to a role...
const initialState = {
  // this will be a list-like object containing seven date objects, each of which contains a number of shift objects...
  dates: {},
  shifts: 0,
};

export default function draftReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DATE': {
      return produce(state, (draftState) => {
        // no pun intended, although it is funny timing that immer was first introduced for the 'drafts' reducer... it was meant to be!
        // BTW all we're doing here is just adding some empty objects to correspond with the dates that will be in the schedule draft:
        // UPDATE: If a date already exists, don't wipe it clear!!!!!!!!
        if (!draftState.dates[action.date]) {
          draftState.dates[action.date] = {};
          for (let i = 1; i <= draftState.shifts; i++) {
            draftState.dates[action.date][`shift_${i}`] = { roles: {} };
          }
        }
      });
    }
    // a more gradual approach to making shifts: first divide each date in the draft into empty shift boxes:
    case 'DIVIDE_DATES_INTO_SHIFTS': {
      // divide every date into shifts by using the date names as keys:
      return produce(state, (draftState) => {
        // for the number of shifts, give each date one empty 'shift' object:
        if (Object.keys(draftState.dates).length > 0) {
          for (let i = draftState.shifts + 1; i <= action.numShifts; i++) {
            Object.keys(draftState.dates).forEach((date) => {
              draftState.dates[date][`shift_${i}`] = { roles: {} };
            });
          }
          draftState.shifts = action.numShifts;
        }
      });
    }
    case 'ADD_ROLE_TO_SHIFT': {
      console.log(action.shift);
      // now we get a bit more specific: assign a role (sans employee) to an individual shift:
      return produce(state, (draftState) => {
        // count how many versions of the role are already there (if any) and add one to the counter:
        draftState.dates[action.date][action.shift][`numberOf${action.role}s`]
          ? (draftState.dates[action.date][action.shift][
              `numberOf${action.role}s`
            ] += 1)
          : // if this is your first instance of a role, the count is just one... and also you have to fight:
            (draftState.dates[action.date][action.shift][
              `numberOf${action.role}s`
            ] = 1);
        // having each role get its own number (e.g. worker_1, worker_2, etc.)... the BRUTAL WAY:
        draftState.dates[action.date][action.shift]['roles'][
          `${action.role}_${
            draftState.dates[action.date][action.shift][
              `numberOf${action.role}s`
            ]
          }`
          // Each role will have space for an employee's id, and a start/end time:
        ] = { employee: '', start: null, finish: null };
      });
    }
    case 'ASSIGN_EMPLOYEE_TO_ROLE': {
      return produce(state, (draftState) => {
        draftState.dates[action.date][action.shift]['roles'][action.role] = {
          employee: action.employee,
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
