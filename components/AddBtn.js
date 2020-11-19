import React from 'react';
import { Spacer } from '@chakra-ui/react';
import { Button, Flex, Box } from '@chakra-ui/core';
import NextLink from 'next/link';

const AddBtn = (props) => {
  return (
    <>
      <Flex>
        <Box>
          <NextLink href="/addSong">
            <Button leftIcon="add" my="4">
              Add New Song
            </Button>
          </NextLink>
        </Box>
        {/* <Spacer /> */}
        {props.children}
      </Flex>
    </>
  );
};

export default AddBtn;
