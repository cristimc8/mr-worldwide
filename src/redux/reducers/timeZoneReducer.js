import { actionTypes } from '../actionTypes';

const initialState = {
  /**
   * Holding:
   * Flag, Name, Capital, Region, Population, Language
   * For any other info fetch by id/name
   */
  timeZones: []
}

export const timeZonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.timeZones.loadTimeZones:
      return {...state, timeZones: action.payload}
    default:
      return state
  }
}
