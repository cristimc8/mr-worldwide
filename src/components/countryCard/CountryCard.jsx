import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import './CountryCard.css';
import '../generics/generics.css'
import {FaCity} from "react-icons/fa"
import {IoPeople} from "react-icons/io5"
import {GoGlobe} from "react-icons/go"
import { CountryCardInfoRow } from './CountryCardInfoRow';

export const CountryCard = ({
                              flag, name,
                              capital, region,
                              population,
                            }) => {

  return (
    <Box
      width={300}
      height={320}
      borderRadius={3}
      backgroundColor={'#fafafa'}
      className={'countryCard zShadow'}
      cursor={'pointer'}
      overflow={'hidden'}
    >
      <Box
        className={'coverImg'}
        height={150}
        width={300}
      >
        {/*Flag*/}
        <Image src={flag} />
      </Box>

      {/*Country name*/}
      <Flex
        width={'100%'}
        justifyContent={'center'}
        align={'center'}
        height={50}
      >
        <Text
          fontSize={24}
          fontWeight={'extrabold'}
          color={'blackAlpha.800'}
        >{name}</Text>
      </Flex>

      {/*Capital, Region, Population*/}
      <Flex
        width={"100%"}
        paddingInline={15}
      >
        <Flex
          width={"100%"}
          flexDir={"column"}
          justifyContent={"flex-start"}
          align={"center"}
          gap={15}
        >
          <CountryCardInfoRow icon={FaCity} text={capital}/>
          <CountryCardInfoRow icon={IoPeople} text={population}/>
          <CountryCardInfoRow icon={GoGlobe} text={region}/>
        </Flex>
      </Flex>
    </Box>
  );
};
