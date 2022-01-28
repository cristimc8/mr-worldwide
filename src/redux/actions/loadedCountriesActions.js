import { actionTypes } from '../actionTypes';

export const loadCountries = (countries) => ({
  type: actionTypes.countries.loadCountries,
  payload: countries
})
