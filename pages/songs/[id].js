import { PrismaClient } from '@prisma/client';
import { Box, Heading, Text, Button } from '@chakra-ui/core';
import NextLink from 'next/link';

export async function getStaticProps({ params }) {
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
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany();

  return {
    paths: songs.map((song) => ({
      params: {
        id: song.id.toString()
      }
    })),
    fallback: false
  };
}

export default ({ song }) => (
  <Box mt={8}>
    <Heading fontWeight="800">{song.name}</Heading>
    <Text color="grey.700" mb={4}>
      {song.artist.name}
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
