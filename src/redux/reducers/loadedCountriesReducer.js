import { actionTypes } from '../actionTypes';

const initialState = {
  /**
   * Holding:
   * Flag, Name, Capital, Region, Population
   * For any other info fetch by id/name
   */
  loadedCountries: []
}

export const loadedCountriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.countries.loadCountries:
      return {...state, loadedCountries: action.payload}
    default:
      return state
  }
}
