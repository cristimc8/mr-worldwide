import React from 'react';
import { SearchBar } from '../searchBar/SearchBar';
import { Flex } from '@chakra-ui/react';

/**
 *
 * @param setLoading {(boolean) => void}
 * @returns {JSX.Element}
 * @constructor
 */
export const SearchBoxContainer = ({ setLoading }) => {

  return (
    <Flex
      justifyContent={'center'}
      width={'100%'}
      align={'center'}
      height={100}
    >
      <SearchBar setLoading={setLoading} />
    </Flex>
  );
};
