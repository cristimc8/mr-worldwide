import { actionTypes } from '../actionTypes';

export const selectRegions = (regions) => ({
  type: actionTypes.filters.selectRegions,
  payload: regions
})

export const setFilteredLanguages = (languages) => ({
  type: actionTypes.filters.selectLanguages,
  payload: languages
})

export const setFilteredTimeZones = (timeZones) => ({
  type: actionTypes.filters.selectTimeZones,
  payload: timeZones
})

/**
 * For redux and for filter
 * @param currencies
 * @returns {{payload, type: string}}
 */
export const setFilteredCurrencies = (currencies) => ({
  type: actionTypes.filters.selectCurrencies,
  payload: currencies
})
