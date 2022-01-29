import {combineReducers} from 'redux';
import {loadedCountriesReducer} from './loadedCountriesReducer';
import { regionsReducer } from './regionsReducer';
import { filtersReducer } from './filtersReducer';
import { languagesReducer } from './languagesReducer';
import { timeZonesReducer } from './timeZoneReducer';
import { currenciesReducer } from './currenciesReducer';

export default combineReducers({
  loadedCountriesReducer,
  regionsReducer,
  filtersReducer,
  languagesReducer,
  timeZonesReducer,
  currenciesReducer
})
