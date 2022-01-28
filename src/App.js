import React, { useState } from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import './App.css';
import { CountryCard } from './components/countryCard/CountryCard';
import { extendTheme } from '@chakra-ui/react';
import { CountriesContainer } from './components/containers/CountriesContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SearchBar } from './components/searchBar/SearchBar';
import { SearchBoxContainer } from './components/containers/SearchBoxContainer';


function App() {

  const [countriesLoading, setCountriesLoading] = useState(false);

  return (
    <Provider store={store}>
      <ChakraProvider theme={extendTheme({
        config: {
          useSystemColorMode: false,
          initialColorMode: 'light',
        },
      })}>
        <SearchBoxContainer setLoading={setCountriesLoading}/>
        <CountriesContainer isLoading={countriesLoading}/>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
