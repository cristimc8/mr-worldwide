import { actionTypes } from '../actionTypes';

export const loadCountries = (countries) => ({
  type: actionTypes.countries.loadCountries,
  payload: countries
})

export const setCurrentFilteredCountries = (countries) => ({
  type: actionTypes.countries.loadCurrentFilteredCountries,
  payload: countries
})

export const setCurrentActiveCountriesSelection = (countries) => ({
  type: actionTypes.countries.loadActiveCountriesSelection,
  payload: countries
})
