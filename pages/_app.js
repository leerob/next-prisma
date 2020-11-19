import React from 'react';
import Head from 'next/head';
import { Global, css } from '@emotion/core';
import {
  ThemeProvider,
  CSSReset,
  useColorMode,
  ColorModeProvider,
  Flex,
  Box
} from '@chakra-ui/core';
import { IconButton, Spacer } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

// Dark mode
const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex>
      <Spacer />
      <Box>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Dark Mode"
          p={3}
          icon={
            colorMode === 'light' ? (
              <MoonIcon w={6} h={6} />
            ) : (
              <SunIcon w={6} h={6} />
            )
          }
        />
      </Box>
    </Flex>
  );
};
const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Head>
          <title>Songs | Youtube</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <DarkMode />
        <Component {...pageProps} />
        <CSSReset />
        <Global
          styles={css`
            body {
              background-image: url('./img/bg.svg');
              background-repeat: no-repeat;
              background-attachment: fixed;
              background-position: left;
            }
            option {
              background: #1a202c;
              color: #ccc;
            }
            .css-5qmkb2 {
              color: #333;
            }
            .css-osjlsk {
              color: #333;
            }

            #__next {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              max-width: 600px;
              margin: 0 auto;
              padding: 16px;
            }
          `}
        />
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default MyApp;
