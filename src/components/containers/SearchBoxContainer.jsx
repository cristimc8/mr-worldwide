import React, { useState } from 'react';
import { SearchBar } from '../searchBar/SearchBar';
import { Badge, Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { searchCategory } from '../searchBar/searchCategories';
import {VscSettings} from "react-icons/vsc"
import '../generics/generics.css'
import { BadgeGroup } from '../generics/BadgeGroup';


/**
 *
 * @param setLoading {(boolean) => void}
 * @param filtersVisible
 * @param setFiltersVisible
 * @returns {JSX.Element}
 * @constructor
 */
export const SearchBoxContainer = ({ setLoading, filtersVisible, setFiltersVisible }) => {
  const [selectedCategories, setSelectedCategories] = useState([...Object.keys(searchCategory).filter(k => searchCategory[k] === searchCategory.name)]);

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDir={'column'}
      width={'100%'}
      align={'center'}
      gap={3}
    >
      <Flex gap={4}>
        <SearchBar setLoading={setLoading} selectedCategories={selectedCategories} />
        <IconButton
          as={VscSettings}
          aria-label={"Filters"}
          cursor={"pointer"}
          backgroundColor={"transparent"}
          onClick={() => {setFiltersVisible(!filtersVisible)}}
        />
      </Flex>
      <Box width={300}>
        <BadgeGroup all={Object.keys(searchCategory)} selected={selectedCategories} setSelected={setSelectedCategories}
          oneSelection={true}/>
        {/*<BadgeGroup selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />*/}
      </Box>
    </Flex>
  );
};
