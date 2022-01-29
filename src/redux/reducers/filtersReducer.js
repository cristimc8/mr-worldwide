import { actionTypes } from '../actionTypes';

const initialState = {
  selectedRegions: [],
  selectedPopulationRange: [0, 1500000000],
  selectedLanguages: [],
  selectedCurrencies: [],
  selectedTimeZone: null
};

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.filters.selectRegions:
      return { ...state, selectedRegions: action.payload }
    case actionTypes.filters.selectLanguages:
      return {...state, selectedLanguages: action.payload}
    case actionTypes.filters.selectPopulationRange:
      return {...state, selectedPopulationRange: action.payload}
    case actionTypes.filters.selectCurrencies:
      return {...state, selectedCurrencies: action.payload}
    case actionTypes.filters.selectTimeZones:
      return {...state, selectedTimeZone: action.payload}
    default:
      return state;
  }
};
