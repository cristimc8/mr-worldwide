export const formatCountriesData = (rawData) => rawData.map(country => {
  return {
    name: country.name.common,
    capital: country.capital ? country.capital[0] : '?',
    population: country.population,
    region: country.region,
    flag: country.flags['png'],
    language: country.languages ? country.languages[Object.keys(country.languages)[0]] : '?',
    timeZone: country['timezones'][0],
    currencies: country.currencies ?
      Object.keys(country.currencies).map(cur => country.currencies[cur].name) : "?"
  };
});

export const fetchCountriesByApiCall = (location, comparerFn) => {
  return new Promise(resolve => {
    fetch(location)
      .then(res => res.json())
      .then(body => {
        const formattedCountries = formatCountriesData(body);
        resolve(comparerFn ? formattedCountries.sort((c1, c2) => comparerFn(c1, c2)) : formattedCountries);
      })
      .catch(err => {
        resolve([]);
      });
  });
};
