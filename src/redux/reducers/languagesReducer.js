import { actionTypes } from '../actionTypes';

const initialState = {
  languages: [],
};

export const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.languages.loadLanguages:
      console.log(action.payload)
      return { ...state, languages: action.payload };
    default:
      return state;
  }
};
