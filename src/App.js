import React, { useState } from 'react';
import {
  Box,
  ChakraProvider, Flex, VStack,
} from '@chakra-ui/react';
import './App.css';
import { CountryCard } from './components/countryCard/CountryCard';
import { extendTheme } from '@chakra-ui/react';
import { CountriesContainer } from './components/containers/CountriesContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SearchBar } from './components/searchBar/SearchBar';
import { SearchBoxContainer } from './components/containers/SearchBoxContainer';
import { FiltersPopupContainer } from './components/containers/FiltersPopupContainer';


function App() {

  const [countriesLoading, setCountriesLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <Provider store={store}>
      <ChakraProvider theme={extendTheme({
        config: {
          useSystemColorMode: false,
          initialColorMode: 'light',
        },
      })}>
        <FiltersPopupContainer filtersVisible={filtersVisible} setFiltersVisibles={setFiltersVisible} />

        <VStack
          padding={8}
          spacing={5}
        >
          <SearchBoxContainer setLoading={setCountriesLoading} filtersVisible={filtersVisible}
                              setFiltersVisible={setFiltersVisible} />
          <CountriesContainer isLoading={countriesLoading} />
        </VStack>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
