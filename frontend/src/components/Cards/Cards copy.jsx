import React from 'react';
import { Card, Badge, SimpleGrid, useColorModeValue, Flex } from '@chakra-ui/react';
import { TriangleDownIcon, ArrowRightIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';

const Cards = ({ jobsData }) => {
  const countJobsByStatus = (status) => {
    return jobsData.filter(job => job.status === status).length;
  };

  return (
    <SimpleGrid
      columns={[4, 4, 4, 4, 4]}
      spacing={12}
      ml={16}
      mr={16}
    >
      <Card
        bg={useColorModeValue('gray.100', 'gray.500')}
        p={3}
        align="center"
        alignItems="center"
        borderRadius="xl"
        boxShadow='dark-lg'
        color="white"
      >
        <Flex alignItems="center">
          <TriangleDownIcon boxSize={['1vh', '1.8vh', '1.8vh', '3vh', '4vh']} color={useColorModeValue('gray.500', 'gray.700')} mr={1}/>
          <Badge ml={2} mt={1} borderRadius="md" variant='outline' fontSize={['1vh', '1.2vh', '1.3vh', '1.5vh', '2.3vh']}>{`SAVED (${countJobsByStatus('Saved')})`}</Badge>
        </Flex>
      </Card>

      <Card
        bg={useColorModeValue('gray.100', 'gray.500')}
        p={3}
        align="center"
        alignItems="center"
        borderRadius="xl"
        boxShadow='dark-lg'
        color="white"
      >
        <Flex alignItems="center">
          <ArrowRightIcon boxSize={['1vh', '1.8vh', '1.8vh', '3vh', '3.5vh']} color={useColorModeValue('blue.300', 'blue.600')} mr={1}/>
          <Badge ml={2} mt={1} borderRadius="md" variant='outline' fontSize={['1vh', '1.2vh', '1.3vh', '1.5vh', '2.3vh']}>{`Send (${countJobsByStatus('Send')})`}</Badge>
        </Flex>
      </Card>

      <Card
        bg={useColorModeValue('gray.100', 'gray.500')}
        p={3}
        align="center"
        alignItems="center"
        borderRadius="xl"
        boxShadow='dark-lg'
        color="white"
      >
        <Flex alignItems="center">
          <CheckIcon boxSize={['1vh', '1.8vh', '1.8vh', '3vh', '4vh']} color={useColorModeValue('green.300', 'green.500')} mr={1}/>
          <Badge ml={2} mt={1} borderRadius="md" variant='outline' fontSize={['1vh', '1.2vh', '1.3vh', '1.5vh', '2.3vh']}>{`Accepted (${countJobsByStatus('Accepted')})`}</Badge>
        </Flex>
      </Card>

      <Card
        bg={useColorModeValue('gray.100', 'gray.500')}
        p={3}
        align="center"
        alignItems="center"
        borderRadius="xl"
        boxShadow='dark-lg'
        color="white"
      >
        <Flex alignItems="center">
          <CloseIcon boxSize={['1vh', '1.8vh', '1.8vh', '3vh', '3.3vh']} color={useColorModeValue('red.300', 'red.500')} mr={1}/>
          <Badge ml={2} mt={1} borderRadius="md" variant='outline' fontSize={['1vh', '1.2vh', '1.3vh', '1.5vh', '2.3vh']}>{`REJECTED (${countJobsByStatus('Rejected')})`}</Badge>
        </Flex>
      </Card>
    </SimpleGrid>
  );
};

export default Cards;
