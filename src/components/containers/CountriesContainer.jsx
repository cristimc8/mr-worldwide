import React, { useEffect, useState } from 'react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { CountryCard } from '../countryCard/CountryCard';
import { useSelector } from 'react-redux';
import { selectFilteredCountries, selectLoadedCountries } from '../../redux/selectors/loadedCountriesSelector';
import { CountryPopupContainer } from './CountryPopupContainer';

/**
 * Gets an array of country components and renders them
 * @param isLoading {boolean}
 * @returns {JSX.Element}
 * @constructor
 */
export const CountriesContainer = ({ isLoading, setLoading }) => {
  const countriesData = useSelector(selectFilteredCountries);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);

  useEffect(() => {
    setLoading(false);
    console.log(countriesData);
  }, [countriesData]);

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignContent={'start'}
        flexWrap={'wrap'}
        rowGap={10}
        columnGap={10}
        filter={isLoading ? 'blur(10px)' : 0}
      >
        {countriesData && countriesData.map((cData, i) => {
          return (
            <Box onClick={() => {
              setModalOpen(true);
              setCurrentCountry(cData);
            }}>
              <CountryCard
                name={cData.name}
                capital={cData.capital}
                region={cData.region}
                population={cData.population}
                flag={cData.flag}
                key={i} />
            </Box>

          );
        })}
      </Box>
      {currentCountry !== null && (
        <CountryPopupContainer passedCountry={currentCountry} modalOpen={modalOpen} setModalOpen={setModalOpen} setCurrentCountry={setCurrentCountry} />
      )}
      {
        isLoading && (
          <Box
            position={'fixed'}
            top={'50%'}
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
          >
            <Spinner size={'xl'} />
          </Box>
        )
      }
    </>
  );
};
