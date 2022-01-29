import React, { useState } from 'react';
import { SearchBar } from '../searchBar/SearchBar';
import { Badge, Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { searchCategory } from '../searchBar/searchCategories';
import {VscSettings} from "react-icons/vsc"
import '../generics/generics.css'


/**
 *
 * @param setLoading {(boolean) => void}
 * @param filtersVisible
 * @param setFiltersVisible
 * @returns {JSX.Element}
 * @constructor
 */
export const SearchBoxContainer = ({ setLoading, filtersVisible, setFiltersVisible, needsUpdate, setNeedsUpdate }) => {
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
        <SearchBar needsUpdate={needsUpdate} setNeedsUpdate={setNeedsUpdate} setLoading={setLoading} selectedCategories={selectedCategories} />
        <IconButton
          as={VscSettings}
          aria-label={"Filters"}
          cursor={"pointer"}
          backgroundColor={"transparent"}
          onClick={() => {setFiltersVisible(!filtersVisible)}}
        />
      </Flex>
      <Box width={300}>
        <BadgeGroup selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      </Box>
    </Flex>
  );
};

const BadgeGroup = ({ selectedCategories, setSelectedCategories }) => {

  const categories = Object.keys(searchCategory);
  // array of selected keys

  const selectCategory = (cat) => {
    // if it's already in the array we remove it
    if (selectedCategories.includes(cat)) {
      let copyOfSelected = selectedCategories.filter(category => category !== cat);
      setSelectedCategories(copyOfSelected);
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const isSelected = (cat) => selectedCategories.includes(cat);

  return (
    <Flex
      width={'100%'}
      flexWrap={"wrap"}
      justifyContent={'flex-start'}
      align={'center'}
      gap={3}
    >
      {categories.map((cat, i) => {
        return (
          <Badge
            key={i}
            colorScheme={isSelected(cat) ? 'green' : 'blue'}
            paddingInline={3}
            paddingBlock={1}
            fontSize={12}
            cursor={'pointer'}
            borderRadius={'full'}
            userSelect={'none'}
            onClick={() => {
              selectCategory(cat);
            }}
          >
            {cat}
          </Badge>
        );
      })}
    </Flex>
  );
};
