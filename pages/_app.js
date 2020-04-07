import React from 'react';
import Head from 'next/head';
import { Global, css } from '@emotion/core';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Head>
        <title>Next.js 9.3 + Prisma</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <CSSReset />
      <Global
        styles={css`
          body {
            background-color: #f7fafc;
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
    </ThemeProvider>
  );
};

export default MyApp;
