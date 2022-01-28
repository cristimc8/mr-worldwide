import React, { useEffect, useState } from 'react';
import { api } from '../../origins/api';
import { loadCountries } from '../../redux/actions/loadedCountriesActions';
import { useDispatch } from 'react-redux';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { fetchCountriesByApiCall, formatCountriesData } from '../../utils/utils';
import { compareByName } from '../../utils/comparers';

/**
 *
 * @param setLoading {(boolean) => void}
 * @returns {JSX.Element}
 * @constructor
 */
export const SearchBar = ({ setLoading }) => {

  const dispatch = useDispatch();

  const debounceTime = 500;

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // load all countries for first time -- no filters
    fetchCountriesByApiCall(api.countries.all, compareByName)
      .then(countries => {
        dispatch(loadCountries(countries));
      })
  }, []);

  const searchByQuery = async (query) => {
    let apiLocation = `${api.countries.byName}/${query}`;
    if(query === "") apiLocation = api.countries.all;
    let countries = await fetchCountriesByApiCall(apiLocation, compareByName)
    dispatch(loadCountries(countries))
    setLoading(false);
  };

  const performSearch = (query) => {
    setLoading(true);
    // Using a simple debounce so we don't drown the server
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      searchByQuery(query)
    }, debounceTime))
  };

  return (
    <InputGroup
      maxW={300}
    >
      <InputLeftElement
        pointerEvents='none'
        children={<SearchIcon color='gray.300' />}
      />
      <Input
        type='text'
        placeholder='Search countries by name'
        boxShadow={'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}
        onChange={(e) => performSearch(e.currentTarget.value)}
      />
    </InputGroup>
  );
};
