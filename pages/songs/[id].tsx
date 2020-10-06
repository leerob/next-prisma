import { Box, Button, Heading, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import { PrismaClient } from '../../db';
import { InferGetStaticPropsType } from "next";

const prisma = new PrismaClient();

export async function getStaticProps({ params }) {
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

export default ({ song }: InferGetStaticPropsType<typeof getStaticProps>) => (
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
