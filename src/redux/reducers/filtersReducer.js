import { actionTypes } from '../actionTypes';

const initialState = {
  selectedRegions: [],
};

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.filters.selectRegions:
      return { ...state, selectedRegions: action.payload };
    default:
      return state;
  }
};
