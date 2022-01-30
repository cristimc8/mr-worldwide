import React, { useEffect, useState } from 'react';
import { api } from '../../origins/api';
import {
  loadCountries,
  setCurrentActiveCountriesSelection,
  setCurrentFilteredCountries,
} from '../../redux/actions/loadedCountriesActions';
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
import {
  selectActiveCountries,
  selectFilteredCountries,
  selectLoadedCountries,
} from '../../redux/selectors/loadedCountriesSelector';
import { searchCategory } from './searchCategories';

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

  const filteredCountries = useSelector(selectUserFilteredState);
  const allCountries = useSelector(selectLoadedCountries);
  const activeCountriesSelection = useSelector(selectActiveCountries);

  const userFilteredState = useSelector(selectUserFilteredState);
  const selectedRegions = useSelector(selectUserFilteredRegions);
  const selectedPopulationRange = useSelector(selectUserFilteredPopulationRange);
  const selectedLanguages = useSelector(selectUserFilteredLanguages);
  const selectedCurrencies = useSelector(selectUserFilteredCurrencies);
  const selectedTimeZone = useSelector(selectUserFilteredTimeZone);

  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    applyFilters();
  }, [userFilteredState]);

  useEffect(() => {
    // load all countries for first time -- no filters
    fetchCountriesByApiCall(api.countries.all, compareByName)
      .then(countries => {
        dispatch(loadCountries(countries));
        dispatch(setCurrentActiveCountriesSelection(countries));
        dispatch(setCurrentFilteredCountries(countries));
        dispatch(loadRegions([...(new Set(countries.map(cData => cData.region)))]));
        dispatch(loadLanguages([...(new Set(countries.map(cData => cData.language.toLowerCase())))]));
        dispatch(loadTimeZones([...(new Set(countries.map(cData => cData.timeZone)))]));
        dispatch(loadCurrencies([...(new Set(countries.map(cData => [...cData.currencies])))]));
      });
  }, []);


  const applyFilters = (countries = null) => {
    if (selectedRegions.length !== 0 || selectedPopulationRange[0] !== 0 || selectedPopulationRange[1] !== 1500000000
      || selectedLanguages.length !== 0 || selectedCurrencies.length !== 0 || selectedTimeZone !== null || countries !== null) {
      setLoading(true);
      // If we receive a parameter for filtering we use that one
      // otherwise we use the values from the redux store holding the active selection
      let arrayToFilter = countries !== null ? countries : activeCountriesSelection
        // activeCountriesSelection.length > 0 ? activeCountriesSelection : allCountries;
      // Sometimes a batch will come empty, but we still need to display that
      if (arrayToFilter.length === 0) {
        return dispatch(setCurrentFilteredCountries({x: 'empty'}));
      }
      let newFilteredCountries = arrayToFilter.filter(cData => {
        let ok = true;
        if (userFilteredState.selectedRegions.length > 0) {
          ok = ok && userFilteredState.selectedRegions.includes(cData.region);
        }
        ok = ok && Number(userFilteredState.selectedPopulationRange[0]) <= Number(cData.population)
          && Number(userFilteredState.selectedPopulationRange[1]) >= Number(cData.population);

        if (userFilteredState.selectedLanguages.length > 0) {
          ok = ok && userFilteredState.selectedLanguages.includes(cData.language.toLowerCase());
        }
        if (userFilteredState.selectedCurrencies.length > 0) {
          let matched = false;
          if (cData.currencies === '?') return false;
          cData.currencies.forEach(currency => {
            if (userFilteredState.selectedCurrencies.includes(currency.toLowerCase())) matched = true;
          });
          ok = ok && matched;
        }
        if (userFilteredState.selectedTimeZone !== null) {
          ok = userFilteredState.selectedTimeZone === cData.timeZone;
        }
        return ok;
      });
      dispatch(setCurrentFilteredCountries(newFilteredCountries));
    }
  };

  useEffect(() => {
    searchByQueryWithFilters(currentQuery);
  }, [currentQuery]);

  const searchByQueryWithFilters = async (query) => {
    let apiX;
    switch (searchCategory[selectedCategories.at(0)]) {
      case searchCategory.name:
        apiX = api.countries.byName;
        break;
      case searchCategory.capital:
        apiX = api.countries.byCapital;
        break;
      case searchCategory.code:
        apiX = api.countries.byCode;
        break;
      default:
        apiX = api.countries.byName;
        break;
    }
    let apiLocation = `${apiX}/${query}`;
    let countriesBatch = allCountries;
    if (query !== '')
      countriesBatch = await fetchCountriesByApiCall(apiLocation, compareByName);
    dispatch(setCurrentActiveCountriesSelection(countriesBatch));
    // After we perform a search, we don't forget that we need to consider the filters
    // but now we are filtering a smaller batch of countries
    applyFilters(countriesBatch);
    setLoading(false);
  };

  const performSearch = (query) => {
    setLoading(true);
    // Using a simple debounce so we don't drown the server
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      setCurrentQuery(query);
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
