import { Flex, Button, Box, useColorModeValue, Stack } from '@chakra-ui/react';
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { FaSignOutAlt } from 'react-icons/fa'
export const Navbar = () => {
  const { logout } = useAuth();
  
  return (
    <Box ml={{ base: 0, md: '240px' }} borderRadius="10px 10px 10px 10px" mr="30px" boxShadow='dark-lg'>
      
      <Flex
        as="nav"
        h="6vh"
        align="center"
        justify="space-between"
        wrap="wrap"
        //padding="5"
        bg={useColorModeValue("gray.100", "gray.700")}
        rounded="10px"
        mt={5}
      >
        <Stack direction="row" align="center" spacing={4} justify="flex-end" flex="1" alignItems="center">
          <ThemeToggler />
          <Button
            onClick={logout}
            colorScheme="teal"
            variant="outline"
            fontSize={16}
            mb={0}
            mt={0}
            mr={8}
            icon={<FaSignOutAlt />}
          >
            Logout
          </Button>
        </Stack>
      </Flex>
      <Outlet />
    </Box>
  );
};
