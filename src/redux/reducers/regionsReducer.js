import { actionTypes } from '../actionTypes';

const initialState = {
  regions: [],
};

export const regionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.regions.loadRegions:
      console.log(action.payload)
      return { ...state, regions: action.payload };
    default:
      return state;
  }
};
