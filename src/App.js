import React from 'react';
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


function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={extendTheme({
        config: {
          useSystemColorMode: false,
          initialColorMode: 'light',
        },
      })}>
        <SearchBar />
        <CountriesContainer />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
