import { Badge, Flex } from '@chakra-ui/react';
import React from 'react';

export const BadgeGroup = ({ all, selected, setSelected, killOnSelect = false, oneSelection = false }) => {

  const categories = all;
  // array of selected keys

  const selectCategory = (cat) => {
    // if it's already in the array we remove it
    // but only if we allow more selections
    if (selected.includes(cat) && !oneSelection) {
      let copyOfSelected = selected.filter(category => category !== cat);
      setSelected(copyOfSelected);
    } else {
      if(oneSelection){
        return setSelected([cat])
      }
      setSelected([...selected, cat]);
    }
  };

  const isSelected = (cat) => selected.includes(cat);

  return (
    <Flex
      width={'100%'}
      flexWrap={'wrap'}
      justifyContent={'flex-start'}
      align={'center'}
      gap={3}
    >
      {categories.map((cat, i) => {
        return (
          <Badge
            display={killOnSelect && !isSelected(cat) ? 'none' : 'flex'}
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
