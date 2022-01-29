import { actionTypes } from '../actionTypes';

export const loadLanguages = (languages) => ({
  type: actionTypes.languages.loadLanguages,
  payload: languages
})
