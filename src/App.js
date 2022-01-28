import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import './App.css'
import { CountryCard } from './components/countryCard/CountryCard';
import { extendTheme } from '@chakra-ui/react'
import { CountriesContainer } from './components/containers/CountriesContainer';


function App() {
  return (
    <ChakraProvider theme={extendTheme({ config: {
        useSystemColorMode: false,
        initialColorMode: "light"
      } })}>
      <CountriesContainer />
    </ChakraProvider>
  );
}

export default App;
