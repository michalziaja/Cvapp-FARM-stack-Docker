import React from 'react';
import { Box, Stack, useColorModeValue, Button, Image, Divider } from '@chakra-ui/react';
import { ThemeToggler } from '../Theme/ThemeToggler';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/logo8.png';
import { FaList, FaChartBar, FaUserTie } from "react-icons/fa";


const SidebarButton = ({ to, children, colorScheme, icon }) => { 
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Box>
      <Button
        as="a"
        href={to}
        textAlign="left"
        variant="ghost"
        mt={8}
        ml={2}
        fontSize={20}
        colorScheme="teal"
        w="150px"
        //boxShadow='xl'
        boxShadow={isActive ? 'xl' : 'dark-lg'} // Dodane dostosowanie cienia
        bg={useColorModeValue('gray.100', 'gray.700')}
        borderRadius="5px"
        _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
        leftIcon={icon} // Dodanie ikony do guzika
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
      <Box p={0} mb={5} mt={2} borderRadius="sm" bg={useColorModeValue('gray.100', 'gray.700')}>
        <Image src={logo} alt="Logo" mx="auto" boxSize='150px' />
      </Box>
      {/* <Divider
        w="195px"
        borderColor="teal"
        borderWidth="2px" // Adjust thickness as needed
      /> */}
      <Stack align="start" spacing={6} p={4} mt={3}>
        <SidebarButton to="/resumes" colorScheme={buttonColor} icon={<FaList />}> {/* Dodanie ikony do guzika */}
          Offers
        </SidebarButton>
        <SidebarButton to="/statistics" colorScheme={buttonColor} icon={<FaChartBar />}> {/* Dodanie ikony do guzika */}
          Statistics
        </SidebarButton>
        <SidebarButton to="/profile" colorScheme={buttonColor} icon={<FaUserTie />}> {/* Dodanie ikony do guzika */}
          Profile
        </SidebarButton>
      </Stack>
    </Box>
  );
};

