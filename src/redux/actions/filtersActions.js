import { actionTypes } from '../actionTypes';

export const setUserFilteredRegions = (regions) => ({
  type: actionTypes.filters.selectRegions,
  payload: regions
})

export const setUserFilteredLanguages = (languages) => ({
  type: actionTypes.filters.selectLanguages,
  payload: languages
})

export const setUserFilteredTimeZones = (timeZones) => ({
  type: actionTypes.filters.selectTimeZones,
  payload: timeZones
})

/**
 * For redux and for filter
 * @param currencies
 * @returns {{payload, type: string}}
 */
export const setUserFilteredCurrencies = (currencies) => ({
  type: actionTypes.filters.selectCurrencies,
  payload: currencies
})

export const setUserFilteredPopulationRange = (range) => ({
  type: actionTypes.filters.selectPopulationRange,
  payload: range
})
