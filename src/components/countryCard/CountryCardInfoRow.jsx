import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';

export const CountryCardInfoRow = ({ icon, text, fontSize = 18 }) => {

  return (
    <Flex
      width={'100%'}
      justifyContent={'flex-start'}
      align={'center'}
      gap={'10px'}
    >
      <Icon as={icon} />
      <Text
        fontSize={fontSize}
        fontWeight={'semibold'}
        color={'gray.600'}
      >{text}</Text>
    </Flex>
  );
};
