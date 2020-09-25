import { Box, Button, Heading, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import { PrismaClient } from '@prisma/client';
import React from 'react';
import Auth from '../../components/Auth';
export const getServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();
  const song = await prisma.song.findOne({
    include: { artist: true },
    where: {
      id: Number(params.id)
    }
  });

  return {
    props: {
      song
    }
  };
};

const SongPage= ({ song }) => (
  <Box mt={8}>
    <Auth/>
    <Heading fontWeight="800">{song.name}</Heading>
    <Text color="grey.700" mb={4}>
      {song.artist.name}
    </Text>
    <Text color="grey.700" mb={4} style={{ wordWrap: 'break-word' }}>
      {JSON.stringify(song)}
    </Text>
    <iframe
      width="100%"
      height="315"
      src={`https://www.youtube.com/embed/${song.youtubeId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <NextLink href="/" passHref>
      <Button as="a" mt={4} leftIcon="arrow-back">
        Back
      </Button>
    </NextLink>
  </Box>
);
export default SongPage;
