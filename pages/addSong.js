import React from 'react';
import { useRouter } from 'next/router';
import SongAddForm from '../components/SongAddForm';
import { Heading } from '@chakra-ui/core';
const addSong = () => {
  const router = useRouter();
  const handleCreateSong = (song) => {
    fetch('http://localhost:3000/api/v1/songs', {
      method: 'POST',
      body: JSON.stringify({ ...song })
    });
    router.push('/');
  };
  return (
    <>
      <Heading mt={8} mb={4} fontWeight="800">
        Add Song
      </Heading>
      <SongAddForm handleFormSubmit={handleCreateSong} />
    </>
  );
};

export default addSong;
