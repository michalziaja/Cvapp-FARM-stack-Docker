import { useColorModeValue } from '@chakra-ui/react';

export const getColorSchemeForStatus = (status) => {
  switch (status) {
    case 'Send':
      return useColorModeValue('blue.300', 'blue.700');
    case 'Rejected':
      return useColorModeValue('red.300', 'red.700');
    case 'Accepted':
      return useColorModeValue('green.400', 'green.600');
    case 'Saved':
      return useColorModeValue('gray.50', 'gray.600');; // You may want to provide a default color or handle other cases
  }
};


export const getColorSchemeForModalStatus = (status) => {
  switch (status) {
    
    case 'Send':
      return 'blue';
    case 'Rejected':
      return 'red';
    case 'Accepted':
      return 'green';
    
  }
};  