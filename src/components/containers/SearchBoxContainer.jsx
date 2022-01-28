import React, { useState } from 'react';
import { SearchBar } from '../searchBar/SearchBar';
import { Badge, Box, Flex } from '@chakra-ui/react';
import { searchCategory } from '../searchBar/searchCategories';

/**
 *
 * @param setLoading {(boolean) => void}
 * @returns {JSX.Element}
 * @constructor
 */
export const SearchBoxContainer = ({ setLoading }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDir={'column'}
      width={'100%'}
      align={'center'}
      gap={3}
    >
      <SearchBar setLoading={setLoading} selectedCategories={selectedCategories} />
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
            colorScheme={isSelected(cat) ? 'blue' : 'cyan'}
            paddingInline={3}
            paddingBlock={1}
            fontSize={12}
            cursor={'pointer'}
            borderRadius={'full'}
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
