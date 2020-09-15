import { List, Heading } from '@chakra-ui/core';

import Song from '../components/Song';
import { prisma } from '../db';

export async function getStaticProps() {
  const songs = await prisma.song.findMany({
    include: { artist: true }
  });

  return {
    props: {
      songs
    }
  };
}

export default ({ songs }) => (
  <>
    <Heading mt={8} mb={4} fontWeight="800">
      My Songs
    </Heading>
    <List>
      {songs.map((song) => (
        <Song key={song.id} {...song} />
      ))}
    </List>
  </>
);
