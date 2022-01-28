import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { CountryCard } from '../countryCard/CountryCard';
import { api } from '../../origins/api';
import { useSelector } from 'react-redux';
import { selectLoadedCountries } from '../../redux/selectors/loadedCountriesSelector';

/**
 * Gets an array of country components and renders them
 * @returns {JSX.Element}
 * @constructor
 */
export const CountriesContainer = () => {
  const countriesData = useSelector(selectLoadedCountries);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-around'}
      alignContent={'start'}
      flexWrap={"wrap"}
      rowGap={10}
    >
      {countriesData && countriesData.map((cData, i) => {
        return (
          <CountryCard
            name={cData.name}
            capital={cData.capital}
            region={cData.region}
            population={cData.population}
            flag={cData.flag}
            key={i} />
        );
      })}
    </Box>
  );
};
