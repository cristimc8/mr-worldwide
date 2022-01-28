import React, { useEffect } from 'react';
import { api } from '../../origins/api';
import { loadCountries } from '../../redux/actions/loadedCountriesActions';
import { useDispatch } from 'react-redux';

export const SearchBar = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // load all countries for first time -- no filters
    fetch(api.countries.all)
      .then(res => res.json())
      .then(body => {
        const formattedCountries = body.map(country => {
          return {
            name: country.name.common,
            capital: country.capital ? country.capital[0] : "?",
            population: country.population,
            region: country.region,
            flag: country.flags["png"]
          };
        });
        //Save in redux
        dispatch(loadCountries(formattedCountries));
      });
  }, []);

  return (
    <></>
  );
};
