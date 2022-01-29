import React, { useEffect, useState } from 'react';
import { api } from '../../origins/api';
import { loadCountries, setCurrentFilteredCountries } from '../../redux/actions/loadedCountriesActions';
import { useDispatch, useSelector } from 'react-redux';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { fetchCountriesByApiCall, formatCountriesData } from '../../utils/utils';
import { compareByName } from '../../utils/comparers';
import { loadRegions } from '../../redux/actions/regionsActions';
import { loadLanguages } from '../../redux/actions/languagesActions';
import { loadTimeZones } from '../../redux/actions/timeZoneActions';
import { loadCurrencies } from '../../redux/actions/currenciesActions';
import {
  selectUserFilteredCurrencies,
  selectUserFilteredLanguages,
  selectUserFilteredPopulationRange,
  selectUserFilteredRegions, selectUserFilteredState, selectUserFilteredTimeZone,
} from '../../redux/selectors/filtersSelectors';
import { selectFilteredCountries, selectLoadedCountries } from '../../redux/selectors/loadedCountriesSelector';

/**
 *
 * @param setLoading {(boolean) => void}
 * @returns {JSX.Element}
 * @constructor
 */
export const SearchBar = ({ setLoading, selectedCategories }) => {

  const dispatch = useDispatch();

  const debounceTime = 500;

  const [timer, setTimer] = useState(null);

  const filteredCountries = useSelector(selectLoadedCountries);
  const userFilteredState = useSelector(selectUserFilteredState);
  const selectedRegions = useSelector(selectUserFilteredRegions);
  const selectedPopulationRange = useSelector(selectUserFilteredPopulationRange);
  const selectedLanguages = useSelector(selectUserFilteredLanguages);
  const selectedCurrencies = useSelector(selectUserFilteredCurrencies);
  const selectedTimeZone = useSelector(selectUserFilteredTimeZone);

  useEffect(() => {
    if (selectedRegions.length !== 0 || selectedPopulationRange[0] !== 0 || selectedPopulationRange[1] !== 1500000000
      || selectedLanguages.length !== 0 || selectedCurrencies.length !== 0 || selectedTimeZone !== null) {
      setLoading(true);
      console.log(filteredCountries);
      let newFilteredCountries = filteredCountries.filter(cData => {
        let ok = true;
        if (userFilteredState.selectedRegions.length > 0) {
          ok = ok && userFilteredState.selectedRegions.includes(cData.region);
        }
        ok = ok && Number(userFilteredState.selectedPopulationRange[0]) <= Number(cData.population)
          && Number(userFilteredState.selectedPopulationRange[1]) >= Number(cData.population);

        if(userFilteredState.selectedLanguages.length > 0) {
          ok = ok && userFilteredState.selectedLanguages.includes(cData.language.toLowerCase())
        }
        if(userFilteredState.selectedCurrencies.length > 0) {
          let matched = false;
          if(cData.currencies === "?") return false;
          cData.currencies.forEach(currency => {
            if(userFilteredState.selectedCurrencies.includes(currency.toLowerCase())) matched = true;
          })
          ok = ok && matched;
        }
        if(userFilteredState.selectedTimeZone !== null) {
          ok = userFilteredState.selectedTimeZone === cData.timeZone;
        }
        return ok;
      });
      dispatch(setCurrentFilteredCountries(newFilteredCountries))
    }
    console.log(userFilteredState);
  }, [userFilteredState]);

  useEffect(() => {
    // load all countries for first time -- no filters
    fetchCountriesByApiCall(api.countries.all, compareByName)
      .then(countries => {
        dispatch(loadCountries(countries));
        dispatch(setCurrentFilteredCountries(countries));
        dispatch(loadRegions([...(new Set(countries.map(cData => cData.region)))]));
        dispatch(loadLanguages([...(new Set(countries.map(cData => cData.language.toLowerCase())))]));
        dispatch(loadTimeZones([...(new Set(countries.map(cData => cData.timeZone)))]));
        dispatch(loadCurrencies([...(new Set(countries.map(cData => [...cData.currencies])))]));
      });
  }, []);

  const searchByQuery = async (query) => {
    let apiLocation = `${api.countries.byName}/${query}`;
    if (query === '') apiLocation = api.countries.all;
    let countries = await fetchCountriesByApiCall(apiLocation, compareByName);
    dispatch(setCurrentFilteredCountries(countries));
    setLoading(false);
  };

  const performSearch = (query) => {
    setLoading(true);
    // Using a simple debounce so we don't drown the server
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      searchByQuery(query);
    }, debounceTime));
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
        placeholder='Search countries'
        boxShadow={'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}
        onChange={(e) => performSearch(e.currentTarget.value)}
      />
    </InputGroup>
  );
};
