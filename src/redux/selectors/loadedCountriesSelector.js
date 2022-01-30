export const selectLoadedCountries = (state) =>
  state.loadedCountriesReducer.loadedCountries

export const selectFilteredCountries = (state) =>
  state.loadedCountriesReducer.filteredCountries

export const selectActiveCountries = (state) =>
  state.loadedCountriesReducer.activeCountriesSelection
