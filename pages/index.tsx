import { Heading, List } from '@chakra-ui/core';
import useSWR from 'swr';
import Song from '../components/Song';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default () => {
  const { data: songs } = useSWR('/api/songs', fetcher);
  return (
    <>
      <Heading mt={8} mb={4} fontWeight="800">
        My Songs
      </Heading>
      <List>
        {songs && songs.map((song) => (
          <Song key={song.id} {...song} />
        ))}
      </List>
    </>
  );
};
