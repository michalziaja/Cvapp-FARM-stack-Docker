import React from 'react';
import { Box, useColorModeValue, Heading } from '@chakra-ui/react';
import Cards from '../components/Cards/Cards';



export const Profile = () => {


  
  return (
    <Box ml={{ base: 0, md: '240px' }} 
      h="87vh" mr="30px" 
      boxShadow='dark-lg' 
      borderRadius="10px 10px 10px 10px" 
      bgColor={useColorModeValue("gray.50", "gray.600")}>
      <Box mt={5} p={5} colorcheme='white'>
        <Heading mb={4} mt={10}>Profile</Heading>
      
      </Box>
    </Box>
  );
};

export default Profile