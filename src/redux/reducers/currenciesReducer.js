import { actionTypes } from '../actionTypes';

const initialState = {
  currencies: [],
};

export const currenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.currencies.loadCurrencies:
      return { ...state, currencies: action.payload };
    default:
      return state;
  }
};
