import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaRegSun } from "react-icons/fa";


export const ThemeToggler = ({ ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <IconButton
        id="theme-toggler"
        icon={colorMode === 'dark' ? <FaRegSun /> : <FaMoon />}
        size="sm"
        isRound
        colorScheme="teal"
        onClick={toggleColorMode}
        {...rest}
      />
    </div>
  );
};
