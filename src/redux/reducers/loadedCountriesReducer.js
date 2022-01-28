import { actionTypes } from '../actionTypes';

const initialState = {
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
