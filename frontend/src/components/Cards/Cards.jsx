import React from 'react';
import { Box, Badge, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import {TriangleDownIcon, ArrowRightIcon, CloseIcon, CheckIcon} from '@chakra-ui/icons'


const Cards = ({ jobsData }) => {
  const countJobsByStatus = (status) => {
    return jobsData.filter(job => job.status === status).length;
  };



  return (
    <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
      <Box
        bg={useColorModeValue('gray.100', 'gray.500')}
        p={4}
        ml={2}
        mr={2}
        borderRadius="xl"
        boxShadow='dark-lg'
        color="white"
      >
        <TriangleDownIcon ml={2} boxSize="4vh" color={useColorModeValue('gray.500', 'gray.700')}/>
        <Badge ml={10} mt={1} borderRadius="md" variant='outline' fontSize='3vh'>SAVED ({countJobsByStatus('Saved')})</Badge>

      </Box>
      <Box
        bg={useColorModeValue('gray.100', 'gray.500')}
        p={4}
        ml={2}
        mr={2}
        //align="center"
        //alignItems="center"
        borderRadius="xl"
        boxShadow='dark-lg'
        color="white"
      >
        <ArrowRightIcon ml={2} boxSize="3vh" color={useColorModeValue('blue.300', 'blue.600')}/>
        <Badge borderRadius="md" mt={1} ml={10} variant='outline' fontSize='3vh'>Send ({countJobsByStatus('Send')})</Badge>
        
      </Box>
      <Box
        bg={useColorModeValue('gray.100', 'gray.500')}
        p={4}
        ml={2}
        mr={2}
        borderRadius="xl"
        boxShadow='dark-lg'
        color="white"
      >
        <CheckIcon ml={2} boxSize="4vh" color={useColorModeValue('green.300', 'green.500')}/>
        <Badge borderRadius="md" ml={10} mt={1} variant='outline' fontSize='3vh'>Accepted ({countJobsByStatus('Accepted')})</Badge>
      </Box>
      <Box
        bg={useColorModeValue('gray.100', 'gray.500')}
        p={4}
        ml={2}
        mr={2}
        borderRadius="xl"
        boxShadow='dark-lg'
        color="white"
      >
        <CloseIcon ml={2} boxSize="3vh" color={useColorModeValue('red.300', 'red.500')}/>
        <Badge ml={10} mt={1} borderRadius='md' variant='outline' fontSize='3vh'>REJECTED ({countJobsByStatus('Rejected')})</Badge>
      </Box>
    </SimpleGrid>
  );
};

export default Cards;
