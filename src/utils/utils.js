import { api } from '../origins/api';
import { loadCountries } from '../redux/actions/loadedCountriesActions';

export const formatCountriesData = (rawData) => rawData.map(country => {
  return {
    name: country.name.common,
    capital: country.capital ? country.capital[0] : '?',
    population: country.population,
    region: country.region,
    flag: country.flags['png'],
  };
});

export const fetchCountriesByApiCall = (location, comparerFn) => {
  return new Promise(resolve => {
    fetch(location)
      .then(res => res.json())
      .then(body => {
        const formattedCountries = formatCountriesData(body)
        resolve(comparerFn ? formattedCountries.sort((c1, c2) => comparerFn(c1, c2)) : formattedCountries)
      })
      .catch(err => {
        resolve([])
      });
  })

}
