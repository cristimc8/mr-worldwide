export const selectCurrencies = (state) =>
  state.currenciesReducer.currencies

export const selectCurrenciesSpread = (state) =>
  [...(new Set(state.currenciesReducer.currencies.map(currArray => currArray[0].toLowerCase())))]
