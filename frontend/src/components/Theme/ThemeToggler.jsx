import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const ThemeToggler = ({ ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <IconButton
        id="theme-toggler"
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        size="sm"
        isRound
        colorScheme="teal"
        onClick={toggleColorMode}
        {...rest}
      />
    </div>
  );
};
