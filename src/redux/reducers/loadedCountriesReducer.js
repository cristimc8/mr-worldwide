import { actionTypes } from '../actionTypes';

const initialState = {
  /**
   * Holding:
   * Flag, Name, Capital, Region, Population, Language, timeZone, currencies array, alpha2/3 code
   * For any other info fetch by id/name
   */
  loadedCountries: [],
  filteredCountries: [],
  activeCountriesSelection: []
};

// loadedCountries is all
// filtered countries is what we display to the User
// active countries selection is on what we apply filters on / search ; memory helper

export const loadedCountriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.countries.loadCountries:
      return { ...state, loadedCountries: action.payload }
    case actionTypes.countries.loadCurrentFilteredCountries:
      return {...state, filteredCountries: action.payload}
    case actionTypes.countries.loadActiveCountriesSelection:
      return {...state, activeCountriesSelection: action.payload}
    default:
      return state;
  }
};
