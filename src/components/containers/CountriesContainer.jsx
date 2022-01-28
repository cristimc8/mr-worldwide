import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

/**
 * Gets an array of country components and renders them
 * @returns {JSX.Element}
 * @constructor
 */
export const CountriesContainer = () => {

  const [countries, setCountries] = useState([])

  useEffect(() => {

  })

  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      alignContent={"start"}
    >
      {countries && countries.map(c => {
        return (
          c
        )
      })}
    </Box>
  )
}
