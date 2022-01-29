import { actionTypes } from '../actionTypes';

const initialState = {
  /**
   * Holding:
   * Flag, Name, Capital, Region, Population, Language, timeZone, currencies array
   * For any other info fetch by id/name
   */
  loadedCountries: [],
  filteredCountries: [],
};

export const loadedCountriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.countries.loadCountries:
      return { ...state, loadedCountries: action.payload }
    case actionTypes.countries.loadCurrentFilteredCountries:
      return {...state, filteredCountries: action.payload}
    default:
      return state;
  }
};
