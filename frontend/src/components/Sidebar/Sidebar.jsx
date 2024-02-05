import React from 'react';
import { Box, Stack, useColorModeValue, Button, Image, Divider } from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';
import logo from '../../assets/logo8.png';

const SidebarButton = ({ to, children, colorScheme }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Box>
      <Button
        as="a"
        href={to}
        textAlign="left"
        variant="ghost"
        mt={5}
        ml={2}
        fontSize={20}
        colorScheme="teal"
        w="150px"
        //boxShadow='xl'
        boxShadow={isActive ? 'xl' : 'dark-lg'} 
        bg={useColorModeValue('gray.100', 'gray.700')}
        borderRadius="5px"
        _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
      >
        {children}
      </Button>
    </Box>
  );
};

export const Sidebar = () => {
  const buttonColor = 'rgb(35, 11, 33)';

  return (
    <Box
      boxShadow='dark-lg'
      as="nav"
      pos="fixed"
      left={0}
      top={0}
      h="95vh"
      ml={5}
      w="200px"
      bg={useColorModeValue('gray.100', 'gray.700')}
      borderRadius="10px 10px 10px 10px"
      
      mt={5}
    >
      <Box p={0} mb={5} mt={3} borderRadius="sm" bg={useColorModeValue('gray.100', 'gray.700')}>
        <Image src={logo} alt="Logo" mx="auto" boxSize='150px' />
      </Box>
      {/* <Divider
        w="195px"
        borderColor="teal"
        borderWidth="2px" // Adjust thickness as needed
      /> */}
      <Stack align="start" spacing={6} p={4} mt={2}>
        <SidebarButton to="/resumes" colorScheme={buttonColor}>
          Offers
        </SidebarButton>
        <SidebarButton to="/statistics" colorScheme={buttonColor}>
          Statistics
        </SidebarButton>
        <SidebarButton to="/profile" colorScheme={buttonColor}>
          Profile
        </SidebarButton>
      </Stack>
    </Box>
  );
};
