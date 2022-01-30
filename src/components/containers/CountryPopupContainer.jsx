import React, { useEffect, useState } from 'react';
import {
  Box,
  Button, Flex, Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, SkeletonCircle, Text, VStack,
} from '@chakra-ui/react';
import '../countryCard/CountryCard.css';
import { CountryCardInfoRow } from '../countryCard/CountryCardInfoRow';
import { FaCity } from 'react-icons/fa';
import { IoPeople } from 'react-icons/io5';
import { GoGlobe } from 'react-icons/go';
import { AiFillCompass } from 'react-icons/ai';
import { BiLandscape } from 'react-icons/bi';
import { BiTimeFive } from 'react-icons/bi';
import { IoBarcodeOutline } from 'react-icons/io5';
import { FaFontAwesomeFlag } from 'react-icons/fa';
import { RiMoneyEuroCircleLine } from 'react-icons/ri';
import { api } from '../../origins/api';
import { calcTimeFromOffset, formatCountriesData, prettyDate2 } from '../../utils/utils';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export const CountryPopupContainer = ({ passedCountry, modalOpen, setModalOpen, setCurrentCountry }) => {

  const [neighbours, setNeighbours] = useState([]);
  const [foundNeighbours, setFoundNeighbours] = useState(false);

  const [value, setValue] = useState(new Date());
  const [countryTimeOffset, setCountryTimeOffset] = useState('+1.0')
  const [interv, setInterv] = useState(null)

  useEffect(() => {
    let codes = '';
    passedCountry.borders.forEach(border => {
      codes += border + ',';
    });
    fetch(`${api.countries.byCodes}${codes}`)
      .then(res => res.json())
      .then(body => {
        if (body.length > 0)
          setNeighbours(formatCountriesData(body));
        setFoundNeighbours(true);
      });

    setCountryTimeOffset(passedCountry.timeZone.split('UTC')[1].replace(/:/, '.'))
    console.log(passedCountry.allLanguages)
    console.log(passedCountry.allLanguages !== '?' ? '1' : '2')
  }, [passedCountry]);

  useEffect(() => {
    clearInterval(window.interval)
    window.interval = setInterval(
      () => setValue(new Date(calcTimeFromOffset(countryTimeOffset))),
      1000,
    )
  }, [countryTimeOffset])

  useEffect(() => {
    clearInterval(window.interval)
    window.interval = setInterval(
      () => setValue(new Date(calcTimeFromOffset(countryTimeOffset))),
      1000,
    )
    // Clearing, so we don't have memory leaks
    return () => {
      clearInterval(window.interval);
    };
  }, []);

  useEffect(() => {
    console.log(neighbours);
  }, [neighbours]);

  return (
    <Modal isOpen={modalOpen} size={'4xl'} onClose={() => {
      setModalOpen(false);
    }}
           style={{ margin: '0', padding: 0 }}
    >
      <ModalOverlay />
      <ModalContent style={{ padding: 0 }}>
        <ModalCloseButton color={'white'} zIndex={999} />
        <ModalBody style={{ margin: '0', padding: 0 }}>
          <Flex width={'100%'} height={300} justify={'center'} position={'relative'}>
            <Box className={'coverImg'} width={'100%'} position={'absolute'} height={350} filter={'blur(10px)'}>
              <Image src={passedCountry.flag} />
            </Box>
            <Image src={passedCountry.flag} mt={10} zIndex={999} className={'bigShadow'} />
          </Flex>

          {/*inject rest here*/}
          <Flex mt={20} flexDir={'column'} align={'flex-start'} paddingInline={10} width={'100%'}>
            {/*Name*/}
            <Flex width={'100%'} flexDir={'column'} align={'center'} justify={'center'}>
              <Text
                fontSize={30}
                fontWeight={'extrabold'}
                color={'gray.700'}>
                {passedCountry.name}
              </Text>

              <Flex gap={5}>
                <CountryCardInfoRow fontSize={24} icon={FaCity} text={passedCountry.capital} />
                <CountryCardInfoRow fontSize={24} icon={IoPeople} text={passedCountry.population} />
                <CountryCardInfoRow fontSize={24} icon={GoGlobe} text={passedCountry.region} />
              </Flex>

              {/*hackish but exam tmrw, no time 4 flexing*/}
              <Flex justify={'center'} align={'center'} flexDir={'column'} gap={3} width={'100%'} mt={5}>
                <Clock value={value} />
                <Text fontWeight={'bold'} color={'gray.700'}>{prettyDate2(value.getTime())}</Text>
              </Flex>

            </Flex>

            <Flex width={'100%'} flexDir={'row'} justifyContent={'space-between'} mt={5}>
              <VStack>
                <CountryCardInfoRow fontSize={24} icon={IoBarcodeOutline} text={'Alpha 2: ' + passedCountry.alpha2} />
                <CountryCardInfoRow fontSize={24} icon={AiFillCompass}
                                    text={'Lat, Lng: ' + passedCountry.latLng[0] + ', ' + passedCountry.latLng[1]} />
                <CountryCardInfoRow fontSize={24} icon={BiLandscape} text={`Area: ${passedCountry.area} km²`} />
                <CountryCardInfoRow fontSize={24} icon={BiTimeFive} text={'Timezone: ' + passedCountry.timeZone} />
                <CountryCardInfoRow fontSize={24} icon={FaFontAwesomeFlag}
                                    text={passedCountry.allLanguages !== '?' ? 'Speaking: ' + passedCountry.allLanguages
                                      .join(',').replace(/,/g, ', ') : 'Speaking: ?'} />
                <CountryCardInfoRow fontSize={24} icon={RiMoneyEuroCircleLine}
                                    text={'Paying with: ' + passedCountry.currencies} />
              </VStack>
              <VStack>
                <Text
                  fontSize={23}
                  fontWeight={'extrabold'}
                  color={'gray.600'}
                >Neighbouring countries</Text>
                {passedCountry.borders.map((border, i) => {
                  return (
                    <>
                      {!foundNeighbours && (
                        <SkeletonCircle key={i} />
                      )}
                      {foundNeighbours && (
                        <Text
                          align={'start'}
                          fontWeight={'bold'}
                          cursor={'pointer'}
                          color={'blue.500'}
                          key={i}
                          onClick={() => {
                            setFoundNeighbours(false);
                            setNeighbours([]);
                            setCurrentCountry(neighbours.at(i));
                          }}
                        >
                          {neighbours[i] && neighbours.at(i).emoji} {neighbours[i] && neighbours.at(i).name}
                        </Text>
                      )}
                    </>
                  );
                })}
              </VStack>
            </Flex>


          </Flex>


        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => {
            setModalOpen(false);
          }}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
