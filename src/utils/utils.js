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
      Object.keys(country.currencies).map(cur => country.currencies[cur].name) : "?",
    alpha2: country['cca2'] ?? country['cca3'] ?? "?",
    latLng: country['latlng'] ?? '?',
    area: country.area ?? '?',
    borders: country.borders ? country.borders : [],
    allLanguages: country.languages ? Object.keys(country.languages).map(l => country.languages[l]) : '?',
    emoji: country.flag ?? ' '
  };
});

const API_TIMEOUT = 4000;

export const fetchCountriesByApiCall = (location, comparerFn) => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve([])
    }, API_TIMEOUT)
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


export const calcTimeFromOffset = (offset) => {
  // create Date object for current location
  let d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different city
  // using supplied offset
  let nd = new Date(utc + (3600000*offset));

  // return time as a string
  return nd.toLocaleString();
}

export const prettyDate2 = (time) => {
  let date = new Date(parseInt(time));
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute:'2-digit'
  });
}
