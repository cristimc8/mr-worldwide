import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack, Input, InputGroup, InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack, Select,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from '@chakra-ui/react';
import '../generics/generics.css';
import { selectRegions } from '../../redux/selectors/regionsSelector';
import { useDispatch, useSelector } from 'react-redux';
import { BadgeGroup } from '../generics/BadgeGroup';
import { loadRegions } from '../../redux/actions/regionsActions';
import { SearchIcon } from '@chakra-ui/icons';
import { selectLanguages } from '../../redux/selectors/languagesSelectors';
import { selectTimeZones } from '../../redux/selectors/timeZoneSelectors';
import { selectCurrencies, selectCurrenciesSpread } from '../../redux/selectors/currenciesSelector';
import {
  setFilteredLanguages,
  setFilteredRegions, setUserFilteredCurrencies,
  setUserFilteredLanguages, setUserFilteredPopulationRange,
  setUserFilteredRegions, setUserFilteredTimeZones,
} from '../../redux/actions/filtersActions';

export const FiltersPopupContainer = ({ filtersVisible, setFiltersVisibles, setNeedsUpdate }) => {

  const dispatch = useDispatch();

  const allLanguages = useSelector(selectLanguages);
  const regions = useSelector(selectRegions);
  const timeZones = useSelector(selectTimeZones);
  const currencies = useSelector(selectCurrenciesSpread);

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [filteredLanguages, setFilteredLanguages] = useState([]);

  const [filteredCurrencies, setFilteredCurrencies] = useState([]);

  const [selectedTimezone, setSelectedTimezone] = useState(null);
  /**
   *
   */
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  /**
   *
   */
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  /**
   * The range object is a 2 values array
   */
  const [range, setRange] = useState([0, 1500000000]);

  const selectLanguage = (lang) => {
    if (selectedLanguages.includes(lang)) {
      let copyOfSelected = selectedLanguages.filter(language => language !== lang);
      setSelectedLanguages(copyOfSelected);
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const selectCurrency = (curr) => {
    if (selectedCurrencies.includes(curr)) {
      let copyOfSelected = selectedCurrencies.filter(currency => currency !== curr);
      setSelectedCurrencies(copyOfSelected);
    } else {
      setSelectedCurrencies([...selectedCurrencies, curr]);
    }
  };


  // If we don't have the regions cached, we fetch them now
  useEffect(() => {
    if (filtersVisible && regions.length === 0) {

      // If the data were truly dynamic
      // Now we can easily use cached values
      /*fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(body => {
          const regions = [...(new Set(body.map(cData => cData.region)))];
          dispatch(loadRegions(regions));
        });*/
    }
  }, [regions, filtersVisible]);

  return (
    <>
      {
        filtersVisible && (
          <Flex
            position={'fixed'}
            width={'100%'}
            height={'100vh'}
            justify={'center'}
            align={'center'}
          >
            <Modal size={'2xl'} isOpen={filtersVisible} onClose={() => {
              setFiltersVisibles(false);
            }}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Available filters</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {/*Regions*/}
                  <Section>
                    <SectionHeader text={'By region'} />
                    <Flex>
                      <HStack display={regions.length === 0 ? 'flex' : 'none'}>
                        <SkeletonCircle isLoaded={regions.length !== 0} />
                        <SkeletonCircle isLoaded={regions.length !== 0} />
                        <SkeletonCircle isLoaded={regions.length !== 0} />
                        <SkeletonCircle isLoaded={regions.length !== 0} />
                      </HStack>
                      <Box width={300}>
                        {
                          regions.length > 0 && (
                            <BadgeGroup all={regions} selected={selectedRegions} setSelected={setSelectedRegions} />
                          )
                        }
                      </Box>
                    </Flex>
                  </Section>
                  <Section>
                    <SectionHeader text={'By population range'} />
                    <RangeSlider
                      min={0}
                      max={1500000000}
                      aria-label={['min', 'max']}
                      defaultValue={[0, 1500000000]}
                      onChangeEnd={(val) => setRange(val)}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                    <Text
                      color={'gray.600'}
                    >From: {range[0] ?? 0} to: {range[1] ?? 1500000000}</Text>
                  </Section>
                  <Section>
                    <SectionHeader text={'By language'} />
                    <InputGroup
                      maxW={300}
                    >
                      <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                      />
                      <Input
                        type='text'
                        placeholder='Language'
                        className={'zShadow'}
                        onChange={(e) => {
                          if (e.currentTarget.value === '') setFilteredLanguages([]);
                          else
                            setFilteredLanguages(allLanguages.filter(l => l.includes(e.currentTarget.value)));
                        }}
                      />
                    </InputGroup>
                    <VStack>
                      {
                        filteredLanguages.slice(0, 3).map((fl, i) => {
                          return (
                            <Suggestion text={fl} key={i} selector={selectLanguage} />
                          );
                        })
                      }
                    </VStack>
                    <BadgeGroup all={selectedLanguages} setSelected={setSelectedLanguages} selected={selectedLanguages}
                                killOnSelect={true} />
                  </Section>

                  <Section>
                    <SectionHeader text={'By currency'} />
                    <InputGroup
                      maxW={300}
                    >
                      <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                      />
                      <Input
                        type='text'
                        placeholder='Currency'
                        className={'zShadow'}
                        onChange={(e) => {
                          if (e.currentTarget.value === '') setFilteredCurrencies([]);
                          else
                            setFilteredCurrencies(currencies.filter(l => l.includes(e.currentTarget.value)));
                        }}
                      />
                    </InputGroup>
                    <VStack>
                      {
                        filteredCurrencies.slice(0, 3).map((fl, i) => {
                          return (
                            <Suggestion text={fl} key={i} selector={selectCurrency} />
                          );
                        })
                      }
                    </VStack>
                    <BadgeGroup all={selectedCurrencies} setSelected={setSelectedCurrencies} selected={selectedCurrencies}
                                killOnSelect={true} />
                  </Section>

                  <Section>
                    <SectionHeader text={'By time zone'} />
                    <Select placeholder='Select time zone'
                            onChange={(e) => {setSelectedTimezone(e.currentTarget.value)}}>
                      {
                        timeZones.map((tz, i) => {
                          return (
                            <option value={tz} key={i}>{tz}</option>
                          );
                        })
                      }
                    </Select>
                  </Section>

                </ModalBody>

                <ModalFooter>
                  <Button variant='ghost'>Cancel</Button>
                  <Button colorScheme='blue' mr={3} onClick={() => {
                    setFiltersVisibles(false);
                    dispatch(setUserFilteredRegions(selectedRegions))
                    dispatch(setUserFilteredCurrencies(selectedCurrencies))
                    dispatch(setUserFilteredLanguages(selectedLanguages))
                    dispatch(setUserFilteredTimeZones(selectedTimezone))
                    dispatch(setUserFilteredPopulationRange(range))
                    setNeedsUpdate(true)
                  }}>
                    Apply
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        )
      }
    </>
  );
};

const Suggestion = ({ text, selector }) => {

  return (
    <Flex
      width={300}
      height={'30px'}
      justify={'center'}
      align={'center'}
      className={'zShadow'}
      borderRadius={2}
      padding={5}
      cursor={'pointer'}
      onClick={() => {
        selector(text);
      }}
    >
      <Text fontWeight={'semibold'} color={'gray.700'}>{text}</Text>
    </Flex>
  );
};

const Section = ({ children }) => (
  <VStack align={'flex-start'} mt={5}>
    {children}
  </VStack>
);

const SectionHeader = ({ text }) => (
  <Text
    fontSize={25}
    fontWeight={'extrabold'}
    color={'gray.700'}>
    {text}
  </Text>
);
