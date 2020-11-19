import { PrismaClient } from '@prisma/client';
import { List, Heading, Select, Box } from '@chakra-ui/core';

import Song from '../components/Song';
import AddBtn from '../components/AddBtn';
import { useState } from 'react';

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany({
    include: { artist: true }
  });

  return {
    props: {
      songs
    }
  };
}
const ListSongs = ({ songs }) => (
  <List>
    {songs.map((song) => (
      <Song key={song.id} {...song} />
    ))}
  </List>
);
const Home = (props) => {
  const { songs } = props;
  const [category, setCategory] = useState('all');
  const handleFilterChange = (event) => {
    const { options } = event.target;
    const optionsLength = options.length;
    let value = [];

    for (let i = 0; i < optionsLength; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setCategory(value.toString());
  };

  const filterSongs = (songs) => {
    if (category === 'all') {
      return songs;
    }
    return songs.filter((song) => {
      return (
        song.artist.genre.toLowerCase() &&
        song.artist.genre.toLowerCase().includes(category)
      );
    });
  };

  return (
    <>
      <Heading mt={8} mb={4} fontWeight="800">
        All Songs
      </Heading>
      <AddBtn>
        <Box w="100%">
          <Select
            onChange={handleFilterChange}
            mx="2"
            my="4"
            variant="filled"
            placeholder="Filter By Category"
          >
            <option value="all">All</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="alternative">Alternative</option>
            <option value="r&b">R&B</option>
            <option value="edm">Electronic Dance Music</option>
            <option value="jazz">Jazz</option>
            <option value="country_music">Country Music</option>
            <option value="electro">Electro</option>
            <option value="punjabi">Punjabi</option>
          </Select>
        </Box>
      </AddBtn>

      <ListSongs songs={filterSongs(songs)} />
    </>
  );
};

export default Home;
