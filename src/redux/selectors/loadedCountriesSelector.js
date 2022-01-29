export const selectLoadedCountries = (state) =>
  state.loadedCountriesReducer.loadedCountries

export const selectFilteredCountries = (state) =>
  state.loadedCountriesReducer.filteredCountries
