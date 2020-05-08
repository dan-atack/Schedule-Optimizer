import { produce } from 'immer';

const initialState = {
  employees: {},
  // we'll apply taxes in one shot when the data is uploaded (0.3 = 30% flat rate):
  taxRate: 0.3,
  paystubs: [],
};

export default function payrollReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_SCHEDULED_EMPLOYEE_IDS': {
      return produce(state, (draftState) => {
        action.employees.forEach((employee) => {
          draftState.employees[employee] = {
            weekOf: null,
            wage: 0,
            hours: 0,
            earnings: 0,
            netRevenue: 0,
          };
        });
      });
    }
    case 'UPDATE_EMPLOYEE_PAY': {
      return produce(state, (draftState) => {
        draftState.employees[action.employee]['weekOf'] = action.weekOf;
        draftState.employees[action.employee]['hours'] = action.hours;
        draftState.employees[action.employee]['wage'] = action.wage;
        draftState.employees[action.employee]['earnings'] =
          action.hours * action.wage;
        draftState.employees[action.employee]['netRevenue'] =
          action.hours * action.wage * (1 - draftState.taxRate);
      });
    }
    case 'GET_EMPLOYEE_PAYSTUBS': {
      return {
        ...state,
        paystubs: action.paystubs,
      };
    }
    case 'LOGOUT_USER': {
      return initialState;
    }
    default:
      return state;
  }
}
