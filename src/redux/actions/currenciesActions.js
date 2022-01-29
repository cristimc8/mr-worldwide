import { actionTypes } from '../actionTypes';

export const loadCurrencies = (currencies) => ({
  type: actionTypes.currencies.loadCurrencies,
  payload: currencies
})
