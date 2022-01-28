import React from "react"
import { Flex, Icon, Text } from '@chakra-ui/react';

export const CountryCardInfoRow = ({icon, text}) => {

  return (
    <Flex
      width={"100%"}
      justifyContent={"flex-start"}
      align={"center"}
      gap={"10px"}
    >
      <Icon as={icon}/>
      <Text
        fontSize={18}
        fontWeight={"semibold"}
        color={'gray.600'}
      >{text}</Text>
    </Flex>
  )
}
