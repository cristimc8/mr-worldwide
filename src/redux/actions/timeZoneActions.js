import { actionTypes } from '../actionTypes';

/**
 * For first time load
 * @param timeZones
 * @returns {{payload, type: string}}
 */
export const loadTimeZones = (timeZones) => ({
  type: actionTypes.timeZones.loadTimeZones,
  payload: timeZones
})
