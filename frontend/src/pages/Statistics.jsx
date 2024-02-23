import React, { useState, useEffect } from 'react';
import { Box, useColorModeValue, Heading } from '@chakra-ui/react';
import Cards from '../components/Cards/Cards';
import axiosInstance from '../services/axios';

export const Statistics = () => {
  const [jobsData, setJobsData] = useState([]);

  const fetchJobsData = async () => {
    try {
      const response = await axiosInstance.get('data/');
      setJobsData(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  return (
    <Box ml={{ base: 0, md: '240px' }} 
      h="87vh" mr="30px" 
      boxShadow='dark-lg' 
      borderRadius="10px 10px 10px 10px" 
      bgColor={useColorModeValue("gray.50", "gray.600")}>
      <Box mt={5} p={5} colorcheme='white'>
        
        <Cards jobsData={jobsData} />
      </Box>
    </Box>
  );
};

export default Statistics;
