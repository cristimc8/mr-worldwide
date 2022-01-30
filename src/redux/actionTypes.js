export const actionTypes = {
  countries: {
    loadCountries: 'LOAD_COUNTRIES',
    loadCurrentFilteredCountries: 'LOAD_FILTERED_COUNTRIES',
    loadActiveCountriesSelection: 'LOAD_SELECTION_COUNTRIES'
  },
  regions: {
    loadRegions: 'LOAD_REGIONS',
  },
  languages: {
    loadLanguages: 'LOAD_LANGUAGES',
  },
  timeZones: {
    loadTimeZones: 'LOAD_TIMEZONES',
  },
  currencies: {
    loadCurrencies: 'LOAD_CURRENCIES',
  },
  filters: {
    selectRegions: 'SELECT_REGIONS',
    selectCurrencies: 'SELECT_CURRENCIES',
    selectTimeZones: 'SELECT_TIMEZONES',
    selectLanguages: 'SELECT_LANGUAGES',
    selectPopulationRange: 'SELECT_POPULATION_RANGE',
  },
};
