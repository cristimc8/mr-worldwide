import { actionTypes } from '../actionTypes';

export const loadRegions = (regions) => ({
  type: actionTypes.regions.loadRegions,
  payload: regions
})
